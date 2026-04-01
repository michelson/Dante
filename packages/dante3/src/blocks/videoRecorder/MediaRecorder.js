import React, { Component } from "react";

class ReactMediaRecorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asked: false,
      permission: false,
      available: false,
      recording: false,
      paused: false,
    };

    this.stream = null;
    this.mediaRecorder = null;
    this.mediaChunk = [];

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.initMediaRecorder = this.initMediaRecorder.bind(this);
  }

  init() {
    if (typeof window === "undefined") return;

    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      console.warn(
        "getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https."
      );
    }
    if (!navigator.mediaDevices && !navigator.getUserMedia) {
      console.warn(
        `Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.`
      );
    }

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    // stop hack
    // from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
    var MediaStream = window.MediaStream || window.webkitMediaStream;
    if (
      typeof MediaStream !== "undefined" &&
      !("stop" in MediaStream.prototype)
    ) {
      MediaStream.prototype.stop = function () {
        this.getAudioTracks().forEach(function (track) {
          track.stop();
        });

        this.getVideoTracks().forEach(function (track) {
          track.stop();
        });
      };
    }
  }

  componentDidMount() {
    this.init();

    let width = this.props.width;
    let height = this.props.height;
    let constraints = this.props.constraints;

    const handleSuccess = (stream, cb) => {
      this.stream = stream;
      this.mediaChunk = [];

      this.setState({
        permission: true,
        asked: true,
        recording: false,
      });
      this.props.onGranted();
      this.initMediaRecorder();

      cb();
    };

    const handleFailed = (err) => {
      this.setState({ asked: false });
      this.props.onDenied(err);
    };

    this.askPermission = (cb) => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => handleSuccess(stream, cb))
          .catch(handleFailed);
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(
          constraints,
          (stream) => handleSuccess(stream, cb),
          handleFailed
        );
      } else {
        let errMessage = `Browser doesn't support UserMedia API. Please try with another browser.`;
        console.warn(errMessage);
        this.props.onError(new Error(errMessage));
      }
    };
  }

  componentWillUnmount() {
    this.stopStream();
  }

  stopStream = () => {
    this.mediaRecorder = null;
    this.mediaChunk = [];

    if (this.stream) {
      this.stream.stop();
      this.stream = null;
    }
  };

  initMediaRecorder() {
    try {
      let options = {};
      let types = ["video/webm;codecs=vp8", "video/webm", ""];

      if (this.props.mimeType) types.unshift(this.props.mimeType);

      for (let i = 0; i < types.length; i++) {
        let type = types[i];

        if (MediaRecorder.isTypeSupported(type)) {
          options.mimeType = type;
          break;
        }

        console.warn(`${type} is not supported on your browser.`);
      }

      let mediaRecorder = new MediaRecorder(this.stream, options);

      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) {
          this.mediaChunk.push(ev.data);
        }
      };

      this.mediaRecorder = mediaRecorder;

      this.setState({
        available: true,
      });
    } catch (err) {
      //console.log(err);
      console.error("Failed to initialize MediaRecorder.", err);

      this.setState({
        available: false,
      });
    }
  }

  beginRecording = () => {
    if (!this.mediaRecorder) {
      this.initMediaRecorder();
    }

    if (!this.mediaRecorder) return;
    if (this.mediaRecorder.state !== "inactive") return;

    this.mediaChunk = [];
    this.mediaRecorder.start(this.props.timeSlice);

    this.setState({
      available: true,
      recording: true,
      paused: false,
    });

    this.props.onStart(this.stream);
  };

  start() {
    if (this.stream && this.mediaRecorder) {
      this.beginRecording();
      return;
    }

    this.askPermission(this.beginRecording);
  }

  pause() {
    if (!this.state.recording) return;
    if (this.mediaRecorder.state === "inactive") return;
    this.mediaRecorder.stop();

    this.setState({ paused: true });

    this.props.onPause();
  }

  resume() {
    if (!this.state.recording) return;
    this.initMediaRecorder();
    this.mediaRecorder.start(this.props.timeSlice);

    this.setState({ paused: false });

    this.props.onResume(this.stream);
  }

  stop() {
    if (!this.mediaRecorder) return;
    if (this.mediaRecorder.state === "inactive") return;

    this.mediaRecorder.stop();

    this.setState({
      recording: false,
    });

    let blob = new Blob(this.mediaChunk, { type: "video/webm" });
    this.props.onStop(blob);

    this.stopStream();
  }

  render() {
    const asked = this.state.asked;
    const permission = this.state.permission;
    const recording = this.state.recording;
    const available = this.state.available;

    return (
      <div className={this.props.className}>
        {this.props.render({
          start: this.start,
          stop: this.stop,
          pause: this.pause,
          resume: this.resume,
        })}
      </div>
    );
  }
}
ReactMediaRecorder.defaultProps = {
  constraints: {
    audio: true,
    video: true,
  },
  className: "",
  timeSlice: 0,
  mimeType: "",
  render: function () {},
  onGranted: function () {},
  onDenied: function () {},
  onStart: function () {},
  onStop: function () {},
  onPause: function () {},
  onResume: function () {},
  onError: function () {},
};

export default ReactMediaRecorder;
