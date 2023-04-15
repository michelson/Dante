import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { useCountdownTimer } from 'use-countdown-timer';
import { x as videoRecorderIcon } from './icons-a41ff4e6.js';
import { VideoContainer, StatusBar, VideoBody, EditorControls, RecButton, SecondsLeft, Button, VideoPlayer } from './blocks/videoRecorder/styled.js';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var ReactMediaRecorder = /*#__PURE__*/function (_Component) {
  _inherits(ReactMediaRecorder, _Component);
  var _super = _createSuper(ReactMediaRecorder);
  function ReactMediaRecorder(props) {
    var _this;
    _classCallCheck(this, ReactMediaRecorder);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "stopStream", function () {
      _this.mediaRecorder = null;
      _this.mediaChunk = [];
      if (_this.stream) {
        _this.stream.stop();
        _this.stream = null;
      }
    });
    _this.state = {
      asked: false,
      permission: false,
      available: false,
      recording: false,
      paused: false
    };
    _this.stream = null;
    _this.mediaRecorder = null;
    _this.mediaChunk = [];
    _this.start = _this.start.bind(_assertThisInitialized(_this));
    _this.stop = _this.stop.bind(_assertThisInitialized(_this));
    _this.pause = _this.pause.bind(_assertThisInitialized(_this));
    _this.resume = _this.resume.bind(_assertThisInitialized(_this));
    _this.initMediaRecorder = _this.initMediaRecorder.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ReactMediaRecorder, [{
    key: "init",
    value: function init() {
      if (typeof window === "undefined") return;
      if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
        console.warn("getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https.");
      }
      if (!navigator.mediaDevices && !navigator.getUserMedia) {
        console.warn("Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.");
      }
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      // stop hack
      // from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
      var MediaStream = window.MediaStream || window.webkitMediaStream;
      if (typeof MediaStream !== "undefined" && !("stop" in MediaStream.prototype)) {
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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.init();
      this.props.width;
      this.props.height;
      var constraints = this.props.constraints;
      var handleSuccess = function handleSuccess(stream, cb) {
        _this2.stream = stream;
        _this2.mediaChunk = [];
        _this2.setState({
          permission: true,
          asked: true,
          recording: false
        });
        _this2.props.onGranted();
        _this2.initMediaRecorder();
        cb();
      };
      var handleFailed = function handleFailed(err) {
        _this2.setState({
          asked: false
        });
        _this2.props.onDenied(err);
      };
      this.askPermission = function (cb) {
        if (navigator.mediaDevices) {
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            return handleSuccess(stream, cb);
          })["catch"](handleFailed);
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, handleSuccess, handleFailed);
        } else {
          var errMessage = "Browser doesn't support UserMedia API. Please try with another browser.";
          console.warn(errMessage);
          _this2.props.onError(new Error(errMessage));
        }
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopStream();
    }
  }, {
    key: "initMediaRecorder",
    value: function initMediaRecorder() {
      var _this3 = this;
      try {
        var options = {};
        var types = ["video/webm;codecs=vp8", "video/webm", ""];
        if (this.props.mimeType) types.unshift(this.props.mimeType);
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          if (MediaRecorder.isTypeSupported(type)) {
            options.mimeType = type;
            break;
          }
          console.warn("".concat(type, " is not supported on your browser."));
        }
        var mediaRecorder = new MediaRecorder(this.stream, options);
        mediaRecorder.ondataavailable = function (ev) {
          if (ev.data && ev.data.size > 0) {
            _this3.mediaChunk.push(ev.data);
          }
        };
        this.mediaRecorder = mediaRecorder;
        this.setState({
          available: true
        });
      } catch (err) {
        //console.log(err);
        console.error("Failed to initialize MediaRecorder.", err);
        this.setState({
          available: false
        });
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;
      this.askPermission(function () {
        if (!_this4.state.available) return;
        _this4.mediaChunk = [];
        _this4.mediaRecorder.start(_this4.props.timeSlice);
        _this4.setState({
          recording: true
        });
        _this4.props.onStart(_this4.stream);
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.state.recording) return;
      if (this.mediaRecorder.state === "inactive") return;
      this.mediaRecorder.stop();
      this.setState({
        paused: true
      });
      this.props.onPause();
    }
  }, {
    key: "resume",
    value: function resume() {
      if (!this.state.recording) return;
      this.initMediaRecorder();
      this.mediaRecorder.start(this.props.timeSlice);
      this.setState({
        paused: false
      });
      this.props.onResume(this.stream);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.state.available) return;
      if (this.mediaRecorder.state === "inactive") return;
      this.mediaRecorder.stop();
      this.setState({
        recording: false
      });
      var blob = new Blob(this.mediaChunk, {
        type: "video/webm"
      });
      this.props.onStop(blob);
      this.stopStream();
    }
  }, {
    key: "render",
    value: function render() {
      this.state.asked;
      this.state.permission;
      this.state.recording;
      this.state.available;
      return /*#__PURE__*/React.createElement("div", {
        className: this.props.className
      }, this.props.render({
        start: this.start,
        stop: this.stop,
        pause: this.pause,
        resume: this.resume
      }));
    }
  }]);
  return ReactMediaRecorder;
}(Component);
ReactMediaRecorder.propTypes = {
  constraints: PropTypes.object,
  className: PropTypes.string,
  timeSlice: PropTypes.number,
  mimeType: PropTypes.string,
  render: PropTypes.func,
  onGranted: PropTypes.func,
  onDenied: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onError: PropTypes.func
};
ReactMediaRecorder.defaultProps = {
  constraints: {
    audio: true,
    video: true
  },
  className: "",
  timeSlice: 0,
  mimeType: "",
  render: function render() {},
  onGranted: function onGranted() {},
  onDenied: function onDenied() {},
  onStart: function onStart() {},
  onStop: function onStop() {},
  onPause: function onPause() {},
  onResume: function onResume() {},
  onError: function onError() {}
};

function VideoRecorderBlock(props) {
    //let file = null;
    var app = React.useRef();
    var mediaRecorder = React.useRef();
    var video = React.useRef();
    var _a = React.useState(false); _a[0]; var setGranted = _a[1];
    var _b = React.useState(""), rejectedReason = _b[0], setRejectedReason = _b[1];
    var _c = React.useState(false), fileReady = _c[0], setFileReady = _c[1];
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = React.useState(null), loadingProgress = _e[0], setLoadingProgress = _e[1];
    var _f = React.useState(null), file = _f[0], setFile = _f[1];
    var _g = useCountdownTimer({
        timer: props.extension.options.seconds_to_record,
        onExpire: function () {
            mediaRecorder.current && mediaRecorder.current.stop();
        },
    }), countdown = _g.countdown, start = _g.start, reset = _g.reset, pause = _g.pause, isRunning = _g.isRunning;
    React.useEffect(function () {
        //video = app.current.querySelector('video');
        if (props.node.attrs.url) {
            setUrlToVideo(props.node.attrs.url);
            playMode();
        }
    }, []);
    React.useEffect(function () {
        if (!props.node.attrs.url || props.node.attrs.url === "")
            return;
        video.current.src = props.node.attrs.url;
    }, [props.node.attrs.url]);
    function handleGranted() {
        setGranted(true);
        console.log("Permission Granted!");
    }
    function handleDenied(err) {
        setRejectedReason(err.name);
        console.log("Permission Denied!", err);
    }
    /*React.useEffect(()=>{
      if(recording && secondsLeft === props.extension.seconds_to_record){
      }
    }, [recording, secondsLeft])*/
    function handleStart(stream) {
        setFileReady(false);
        setStreamToVideo(stream);
        console.log("Recording Started.");
        // max seconds to record video
        if (!props.extension.options.seconds_to_record)
            return;
        start();
    }
    function handleStop(blob) {
        reset();
        setFileReady(true);
        releaseStreamFromVideo();
        console.log("Recording Stopped.");
        setFile(blob);
        setStreamToVideo(blob);
        playMode();
    }
    function confirm() {
        downloadVideo(file);
    }
    function handlePause() {
        releaseStreamFromVideo();
        pause();
    }
    function handleResume(stream) {
        setStreamToVideo(stream);
        pause();
    }
    function handleError(err) {
        console.log(err);
    }
    function recordMode() {
        video.current.loop = false;
        video.current.controls = false;
        video.current.muted = true;
    }
    function playMode() {
        video.current.loop = false;
        video.current.controls = true;
        video.current.muted = true;
    }
    function setStreamToVideo(stream) {
        //let video = app.current.querySelector('video');
        recordMode();
        // is a mediastream
        try {
            video.current.srcObject = stream;
        }
        catch (error) {
            video.current.src = URL.createObjectURL(stream);
        }
    }
    function setUrlToVideo(url) {
        playMode();
        video.current.src = url;
    }
    function releaseStreamFromVideo() {
        video.current.src = "";
        video.current.srcObject = null;
    }
    function downloadVideo(blob) {
        //video.current.loop = true
        setStreamToVideo(blob);
        playMode();
        uploadFile(blob);
    }
    function formatData() {
        var formData = new FormData();
        //if (props.node.attrs.file) {
        if (file) {
            var formName = props.extension.options.upload_formName || 'file';
            formData.append(formName, file); //props.node.attrs.file);
            return formData;
        }
        else {
            // TODO: check this
            formData.append("url", props.node.attrs.src);
            return formData;
        }
    }
    function getUploadUrl() {
        var url = props.extension.options.upload_url;
        if (typeof url === "function") {
            return url();
        }
        else {
            return url;
        }
    }
    function getUploadHeaders() {
        return props.extension.options.upload_headers || {};
    }
    function stopLoader() {
        setLoading(false);
        setFileReady(false);
    }
    function uploadFile(blob) {
        var _this = this;
        // file = blob;
        setFile(blob);
        // custom upload handler
        if (props.extension.options.upload_handler) {
            return props.extension.options.upload_handler(formatData().get("file"), props, { uploadCompleted: uploadCompleted, updateProgressBar: updateProgressBar, uploadFailed: uploadFailed });
        }
        if (!props.extension.options.upload_url) {
            stopLoader();
            return;
        }
        setLoading(true);
        axios({
            method: "post",
            url: getUploadUrl(),
            headers: getUploadHeaders(),
            data: formatData(),
            onUploadProgress: function (e) {
                return updateProgressBar(e);
            },
        })
            .then(function (result) {
            uploadCompleted(result.data.url);
            if (props.extension.options.upload_callback) {
                return props.extension.options.upload_callback(result, _this);
            }
        })
            .catch(function (error) {
            uploadFailed();
            console.log("ERROR: got error uploading file ".concat(error));
            if (props.extension.options.upload_error_callback) {
                return props.extension.options.upload_error_callback(error, _this);
            }
        });
        return function (json_response) {
            return uploadCompleted(json_response.url);
        };
    }
    function uploadFailed() {
        //this.props.blockProps.removeLock()
        stopLoader();
    }
    function uploadCompleted(url) {
        props.updateAttributes({
            url: url,
        });
        //this.setState({ url }, this.updateData)
        //this.props.blockProps.removeLock()
        stopLoader();
        setFile(null);
        setUrlToVideo(url);
    }
    function updateProgressBar(e) {
        var complete = loadingProgress;
        if (e.lengthComputable) {
            complete = (e.loaded / e.total) * 100;
            complete = complete != null ? complete : { complete: 0 };
            setLoadingProgress(complete);
            return console.log("complete: ".concat(complete));
        }
    }
    function isReadOnly() {
        return !props.editor.isEditable;
    }
    return (React.createElement(NodeViewWrapper, null,
        React.createElement(VideoContainer, { ref: app, "data-drag-handle": "true" },
            React.createElement(ReactMediaRecorder, { ref: mediaRecorder, constraints: {
                    audio: {
                        sampleSize: 16,
                        channelCount: 2,
                        echoCancellation: true,
                        noiseSuppression: false,
                    },
                    video: true,
                }, timeSlice: 10, onGranted: handleGranted, onDenied: handleDenied, onStart: function (stream) { return handleStart(stream); }, onStop: handleStop, onPause: handlePause, onResume: handleResume, onError: handleError, render: function (_a) {
                    var start = _a.start, stop = _a.stop; _a.pause; _a.resume;
                    return (React.createElement("div", null,
                        !isReadOnly() && (React.createElement(StatusBar, { contentEditable: false, loading: loading }, loading && (React.createElement(Loader, { toggle: loading, progress: loadingProgress })))),
                        React.createElement(VideoBody, null,
                            !isReadOnly() && (React.createElement(EditorControls, { contentEditable: false },
                                React.createElement("div", { className: "controls-recording" }, !loading && (React.createElement(React.Fragment, null,
                                    React.createElement(RecButton, { onClick: function (e) {
                                            e.preventDefault();
                                            isRunning ? stop() : start();
                                        }, disabled: isRunning, className: isRunning ? "recording" : "" },
                                        isRunning
                                            ? "recording. (".concat(countdown / 1000, " seconds left)")
                                            : "press button to start recording",
                                        rejectedReason && React.createElement("span", null, rejectedReason)),
                                    React.createElement(SecondsLeft, null)))),
                                fileReady && !loading && (React.createElement(Button, { onClick: function (e) {
                                        e.preventDefault();
                                        confirm();
                                    } }, "confirm recording upload ?")))),
                            React.createElement(VideoPlayer, { autoPlay: true, muted: true, ref: video }),
                            React.createElement(NodeViewContent, { as: "figcaption", className: "imageCaption" }, props.node.content.size === 0 && (React.createElement("span", { className: "danteDefaultPlaceholder" }, "type a caption (optional)"))))));
                } }))));
}
function Loader(_a) {
    var toggle = _a.toggle, progress = _a.progress;
    return (React.createElement(React.Fragment, null, toggle && (React.createElement("div", { className: "image-upoader-loader", style: { width: "100%", textAlign: "center" } },
        React.createElement("p", null, progress === 100 ? ("processing video...") : (React.createElement("span", null,
            React.createElement("span", null, "uploading video "),
            Math.round(progress),
            "%")))))));
}
var VideoRecorderBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "VideoRecorderBlock",
        icon: videoRecorderIcon,
        tag: "recorded-video",
        component: VideoRecorderBlock,
        atom: false,
        attributes: {
            url: { default: null },
            src: { default: null },
            width: { default: "" },
            height: { default: "" },
            loading: { default: false },
            loading_progress: { default: 0 },
            caption: { default: "caption!" },
            direction: { default: "center" },
            file: { default: null },
        },
        wrapper_class: "graf graf--video",
        selected_class: "is-selected",
        selectedFn: function (_block) { },
        /* handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      },
      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(RichUtils.insertSoftNewline(editorState))
        //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      }, */
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "image",
        },
        options: {
            upload_formName: "file",
            upload_handler: function (file, ctx) {
                console.log("UPLOADED FILE", file, ctx);
            },
            /*upload_handler: (file, props, { uploadCompleted }) => {
              console.log("UPLOADED video");
              const url =
                "https://video.twimg.com/ext_tw_video/1388976569348235264/pu/vid/960x720/mCVk3dF_nGTgIZLX.mp4?tag=12";
              uploadCompleted(url);
            },*/
            seconds_to_record: 10000,
        },
    };
    return Object.assign(config, options);
};

export { VideoRecorderBlockConfig as V, _defineProperty as _, _slicedToArray as a, VideoRecorderBlock as b };
