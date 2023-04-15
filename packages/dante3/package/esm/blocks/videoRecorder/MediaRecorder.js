import { d as __extends } from '../../tslib.es6-0837746f.js';
import React, { Component } from 'react';

var ReactMediaRecorder = /** @class */ (function (_super) {
    __extends(ReactMediaRecorder, _super);
    function ReactMediaRecorder(props) {
        var _this = _super.call(this, props) || this;
        _this.stopStream = function () {
            _this.mediaRecorder = null;
            _this.mediaChunk = [];
            if (_this.stream) {
                _this.stream.stop();
                _this.stream = null;
            }
        };
        _this.state = {
            asked: false,
            permission: false,
            available: false,
            recording: false,
            paused: false,
        };
        _this.stream = null;
        _this.mediaRecorder = null;
        _this.mediaChunk = [];
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.pause = _this.pause.bind(_this);
        _this.resume = _this.resume.bind(_this);
        _this.initMediaRecorder = _this.initMediaRecorder.bind(_this);
        return _this;
    }
    ReactMediaRecorder.prototype.init = function () {
        if (typeof window === "undefined")
            return;
        if (window.location.protocol !== "https:" &&
            window.location.hostname !== "localhost") {
            console.warn("getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https.");
        }
        if (!navigator.mediaDevices && !navigator.getUserMedia) {
            console.warn("Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.");
        }
        navigator.getUserMedia =
            navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
        // stop hack
        // from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
        var MediaStream = window.MediaStream || window.webkitMediaStream;
        if (typeof MediaStream !== "undefined" &&
            !("stop" in MediaStream.prototype)) {
            MediaStream.prototype.stop = function () {
                this.getAudioTracks().forEach(function (track) {
                    track.stop();
                });
                this.getVideoTracks().forEach(function (track) {
                    track.stop();
                });
            };
        }
    };
    ReactMediaRecorder.prototype.componentDidMount = function () {
        var _this = this;
        this.init();
        this.props.width;
        this.props.height;
        var constraints = this.props.constraints;
        var handleSuccess = function (stream, cb) {
            _this.stream = stream;
            _this.mediaChunk = [];
            _this.setState({
                permission: true,
                asked: true,
                recording: false,
            });
            _this.props.onGranted();
            _this.initMediaRecorder();
            cb();
        };
        var handleFailed = function (err) {
            _this.setState({ asked: false });
            _this.props.onDenied(err);
        };
        this.askPermission = function (cb) {
            if (navigator.mediaDevices) {
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(function (stream) { return handleSuccess(stream, cb); })
                    .catch(handleFailed);
            }
            else if (navigator.getUserMedia) {
                navigator.getUserMedia(constraints, handleSuccess, handleFailed);
            }
            else {
                var errMessage = "Browser doesn't support UserMedia API. Please try with another browser.";
                console.warn(errMessage);
                _this.props.onError(new Error(errMessage));
            }
        };
    };
    ReactMediaRecorder.prototype.componentWillUnmount = function () {
        this.stopStream();
    };
    ReactMediaRecorder.prototype.initMediaRecorder = function () {
        var _this = this;
        try {
            var options = {};
            var types = ["video/webm;codecs=vp8", "video/webm", ""];
            if (this.props.mimeType)
                types.unshift(this.props.mimeType);
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
                    _this.mediaChunk.push(ev.data);
                }
            };
            this.mediaRecorder = mediaRecorder;
            this.setState({
                available: true,
            });
        }
        catch (err) {
            //console.log(err);
            console.error("Failed to initialize MediaRecorder.", err);
            this.setState({
                available: false,
            });
        }
    };
    ReactMediaRecorder.prototype.start = function () {
        var _this = this;
        this.askPermission(function () {
            if (!_this.state.available)
                return;
            _this.mediaChunk = [];
            _this.mediaRecorder.start(_this.props.timeSlice);
            _this.setState({
                recording: true,
            });
            _this.props.onStart(_this.stream);
        });
    };
    ReactMediaRecorder.prototype.pause = function () {
        if (!this.state.recording)
            return;
        if (this.mediaRecorder.state === "inactive")
            return;
        this.mediaRecorder.stop();
        this.setState({ paused: true });
        this.props.onPause();
    };
    ReactMediaRecorder.prototype.resume = function () {
        if (!this.state.recording)
            return;
        this.initMediaRecorder();
        this.mediaRecorder.start(this.props.timeSlice);
        this.setState({ paused: false });
        this.props.onResume(this.stream);
    };
    ReactMediaRecorder.prototype.stop = function () {
        if (!this.state.available)
            return;
        if (this.mediaRecorder.state === "inactive")
            return;
        this.mediaRecorder.stop();
        this.setState({
            recording: false,
        });
        var blob = new Blob(this.mediaChunk, { type: "video/webm" });
        this.props.onStop(blob);
        this.stopStream();
    };
    ReactMediaRecorder.prototype.render = function () {
        this.state.asked;
        this.state.permission;
        this.state.recording;
        this.state.available;
        return (React.createElement("div", { className: this.props.className }, this.props.render({
            start: this.start,
            stop: this.stop,
            pause: this.pause,
            resume: this.resume,
        })));
    };
    return ReactMediaRecorder;
}(Component));

export { ReactMediaRecorder as default };
