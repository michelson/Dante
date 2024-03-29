import { _ as _taggedTemplateLiteral, c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorBlock } from 'draft-js';
import ReactMediaRecorder from './MediaRecorder.js';
import styled from '@emotion/styled';
import { videoRecorderIcon } from '../../icons.js';
import { updateDataOfBlock } from '../../../model/index.js';
import axios from 'axios';
import 'prop-types';
import 'immutable';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var VideoContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: ", ";\n  padding: 0px;\n  margin-bottom: 10px;\n  //border: 1px solid ", ";\n  box-shadow: 0 1px 4px ", ";\n  border-radius: 10px;\n  position:relative;\n"])), function (props) {
  return props.theme.inversed_color;
}, function (props) {
  return props.theme.dante_control_color;
}, function (props) {
  return props.theme.dante_control_color;
});
var VideoBody = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding-bottom: 20px;\n"])));
var green = '#00ab6b';
var red = '#e61742';
var gray = '#bbbbbb';
styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background: ", ";\n  position: absolute;\n  height: 13px;\n  width: 13px;\n  border-radius: 50%;\n  display: inline-block;\n  position: absolute;\n  top: 58px;\n  right: 25px;\n  box-shadow: inset -1px -2px 14px 0px #841744;\n\n"])), function (props) {
  return props.active ? red : green;
});
var EditorControls = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    position: absolute;\n    width: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    -ms-flex-pack: center;\n    margin-top: 25px;\n    margin-left: 17px;\n    height: 50px;\n    z-index: 100;\n"])));
var StatusBar = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  z-index: 10;\n  position:absolute;\n  height: 100%;\n  width: 100%;\n  background: ", ";\n  display: ", ";\n  align-items:center;\n\n  opacity: ", ";\n"])), function (props) {
  return props.loading ? "white" : "transparent";
}, function (props) {
  return props.loading ? "flex" : "none";
}, function (props) {
  return props.loading ? "0.9" : "1";
});
var VideoPlayer = styled.video(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 100%;\n  background: black;\n"])));
var SecondsLeft = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    //position: absolute;\n    font-size: 1rem;\n    right: 39px;\n    top: 19px;\n    font-size: 2em;\n    color: white;\n\n"])));
var RecButton = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n\n  display: inline-block;\n  cursor: pointer;\n  -webkit-transition: all 0.25s ease;\n  transition: all 0.25s ease;\n  margin: 1px 7px;\n  text-indent: 36px;\n\n  text-indent: 36px;\n  color: #d9ece5;\n  text-shadow: 0px 1px 0px #101010;\n\n  &:hover{\n    //color: ", "\n    color: #d9ece5;\n  }\n\n\n  &:before{\n    position: absolute;\n    width: 31px;\n    height: 30px;\n    top: 2px;\n    content: '';\n    border-radius: 50px;\n    background: #e80415;\n    cursor: pointer;\n    left: 2px;\n  }\n\n  &.recording{\n    &:before{\n\n    position: absolute;\n    width: 20px;\n    height: 20px;\n    top: 6px;\n    content: '';\n    border-radius: 2px;\n    background: #e80415;\n    cursor: pointer;\n    left: 7px;\n    }\n  }\n\n\n  &:after{\n    position: absolute;\n    width: 38px;\n    height: 38px;\n    top: 4px;\n    content: '';\n    -webkit-transform: translate(-6px,-6px);\n    -ms-transform: translate(-6px,-6px);\n    -webkit-transform: translate(-6px,-6px);\n    -ms-transform: translate(-6px,-6px);\n    -webkit-transform: translate(-6px,-6px);\n    -ms-transform: translate(-6px,-6px);\n    transform: translate(-6px,-6px);\n    border-radius: 50%;\n    border: 2px solid #fff;\n    cursor: pointer;\n    left: 4px;\n  }\n\n"])), green);
var Button = styled.button(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n\n    outline: none;\n    height: 37px;\n    /* margin-right: 10px; */\n    /* text-align: center; */\n    border-radius: 40px;\n    background: ", ";\n    border: 2px solid ", ";\n    color: #ffffff;\n    -webkit-letter-spacing: 1px;\n    -moz-letter-spacing: 1px;\n    -ms-letter-spacing: 1px;\n    letter-spacing: 1px;\n    text-shadow: 0;\n    cursor: pointer;\n    -webkit-transition: all 0.25s ease;\n    transition: all 0.25s ease;\n\n\n    font-size:12px;\n    font-weight:bold;\n \n  cursor: pointer;\n  transition: all 0.25s ease;\n  &:hover {\n    color:white;\n    background: ", ";\n  }\n  &:active {\n    //letter-spacing: 2px;\n    letter-spacing: 2px ;\n  }\n  //&:after {\n  //  content:\"SUBMIT\";\n  //}\n\n  &.onclic {\n    width: 24px !important;\n    border-color:", ";\n    border-width:3px;\n    font-size:0;\n    border-left-color:", ";\n    animation: rotating 2s 0.25s linear infinite;\n\n    &:after {\n      content:\"\";\n    }\n    &:hover {\n      color:$green;\n      background: white;\n    }\n  }\n\n  &.right{\n    float: right;\n    margin-right: 26px;\n  }\n\n  @keyframes rotating {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n\n\n"])), green, green, green, gray, green);
var VideoRecorderBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(VideoRecorderBlock, _React$Component);
  var _super = _createSuper(VideoRecorderBlock);
  function VideoRecorderBlock(props) {
    var _this;
    _classCallCheck(this, VideoRecorderBlock);
    _this = _super.call(this, props);
    // will update block state
    _defineProperty(_assertThisInitialized(_this), "updateData", function (options) {
      var _this$props = _this.props,
        blockProps = _this$props.blockProps,
        block = _this$props.block;
      var getEditorState = blockProps.getEditorState;
      var setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state).merge(options);
      return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
    });
    _defineProperty(_assertThisInitialized(_this), "confirm", function () {
      _this.downloadVideo(_this.file);
    });
    _defineProperty(_assertThisInitialized(_this), "recordMode", function () {
      _this.video.loop = false;
      _this.video.controls = false;
      _this.video.muted = true;
    });
    _defineProperty(_assertThisInitialized(_this), "playMode", function () {
      _this.video.loop = false;
      _this.video.controls = true;
      _this.video.muted = true;
    });
    _defineProperty(_assertThisInitialized(_this), "setUrlToVideo", function (url) {
      _this.playMode();
      _this.video.src = url;
    });
    /* DANTE UPLOAD FUNCTIONS */
    _defineProperty(_assertThisInitialized(_this), "formatData", function () {
      var formData = new FormData();
      if (_this.file) {
        var formName = _this.config.upload_formName || 'file';
        formData.append(formName, _this.file);
        return formData;
      } else {
        //formData.append('url', this.props.blockProps.data.get("url"))
        formData.append('url', _this.state.url);
        return formData;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getUploadUrl", function () {
      var url = _this.config.upload_url;
      if (typeof url === "function") {
        return url();
      } else {
        return url;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "stopLoader", function () {
      return _this.setState({
        loading: false,
        fileReady: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "uploadFile", function (blob) {
      _this.file = blob;

      // custom upload handler
      if (_this.config.upload_handler) {
        return _this.config.upload_handler(_this.state.url, _assertThisInitialized(_this));
      }
      if (!_this.config.upload_url) {
        _this.stopLoader();
        return;
      }
      _this.setState({
        loading: true
      });
      axios({
        method: 'post',
        url: _this.getUploadUrl(),
        headers: _this.getUploadHeaders(),
        data: _this.formatData(),
        onUploadProgress: function onUploadProgress(e) {
          return _this.updateProgressBar(e);
        }
      }).then(function (result) {
        _this.uploadCompleted(result.data.url);
        if (_this.config.upload_callback) {
          return _this.config.upload_callback(result, _assertThisInitialized(_this));
        }
      })["catch"](function (error) {
        _this.uploadFailed();
        console.log("ERROR: got error uploading file ".concat(error));
        if (_this.config.upload_error_callback) {
          return _this.config.upload_error_callback(error, _assertThisInitialized(_this));
        }
      });
      return function (json_response) {
        return _this.uploadCompleted(json_response.url);
      };
    });
    _defineProperty(_assertThisInitialized(_this), "uploadFailed", function () {
      _this.props.blockProps.removeLock();
      _this.stopLoader();
    });
    _defineProperty(_assertThisInitialized(_this), "isReadOnly", function () {
      return _this.props.blockProps.getEditor().props.read_only;
    });
    _defineProperty(_assertThisInitialized(_this), "placeHolderEnabled", function () {
      return _this.state.enabled || _this.props.block.getText();
    });
    _defineProperty(_assertThisInitialized(_this), "placeholderText", function () {
      return _this.config.image_caption_placeholder || 'caption here (optional)';
    });
    _defineProperty(_assertThisInitialized(_this), "defaultPlaceholder", function () {
      return _this.props.blockProps.config.image_caption_placeholder;
    });
    _this.file = _this.props.blockProps.data.get('file');
    _this.config = _this.props.blockProps.config;
    var existing_data = _this.props.block.getData().toJS();
    _this.state = {
      caption: _this.defaultPlaceholder(),
      direction: existing_data.direction || "center",
      granted: false,
      rejectedReason: '',
      recording: false,
      paused: false,
      fileReady: false,
      secondsLeft: 0,
      loading: false,
      url: _this.props.block.data.get('url')
    };
    _this.video = null;
    _this.stopTimeout = null;
    _this.secondInterval = null;
    _this.handleGranted = _this.handleGranted.bind(_assertThisInitialized(_this));
    _this.handleDenied = _this.handleDenied.bind(_assertThisInitialized(_this));
    _this.handleStart = _this.handleStart.bind(_assertThisInitialized(_this));
    _this.handleStop = _this.handleStop.bind(_assertThisInitialized(_this));
    _this.handlePause = _this.handlePause.bind(_assertThisInitialized(_this));
    _this.handleResume = _this.handleResume.bind(_assertThisInitialized(_this));
    _this.setStreamToVideo = _this.setStreamToVideo.bind(_assertThisInitialized(_this));
    _this.releaseStreamFromVideo = _this.releaseStreamFromVideo.bind(_assertThisInitialized(_this));
    _this.downloadVideo = _this.downloadVideo.bind(_assertThisInitialized(_this));
    _this.mediaType = _this.config.mediaType;
    _this.app = /*#__PURE__*/React.createRef();
    _this.mediaRecorder = /*#__PURE__*/React.createRef();
    return _this;
  }
  _createClass(VideoRecorderBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.video = this.app.current.querySelector('video');
      if (this.state.url) {
        this.setUrlToVideo(this.state.url);
        this.playMode();
      }
    }
  }, {
    key: "handleGranted",
    value: function handleGranted() {
      this.setState({
        granted: true
      });
      console.log('Permission Granted!');
    }
  }, {
    key: "handleDenied",
    value: function handleDenied(err) {
      this.setState({
        rejectedReason: err.name
      });
      console.log('Permission Denied!', err);
    }
  }, {
    key: "handleStart",
    value: function handleStart(stream, context) {
      var _this2 = this;
      this.setState({
        recording: true,
        fileReady: false
      });
      this.setStreamToVideo(stream);
      console.log('Recording Started.');

      // max seconds to record video 
      if (!context.config.seconds_to_record) return;
      var count = context.config.seconds_to_record / 1000;
      this.setState({
        secondsLeft: count
      });
      if (this.secondInterval) clearTimeout(this.secondInterval);
      this.secondInterval = setInterval(function () {
        _this2.setState({
          secondsLeft: _this2.state.secondsLeft - 1
        });
      }, 1000);
      this.stopTimeout = setTimeout(function () {
        context.mediaRecorder.current.stop();
      }, context.config.seconds_to_record);
    }
  }, {
    key: "handleStop",
    value: function handleStop(blob) {
      if (this.stopTimeout) {
        clearTimeout(this.secondInterval);
        this.setState({
          secondsLeft: 0
        });
        clearTimeout(this.stopTimeout);
      }
      this.setState({
        recording: false,
        fileReady: true
      });
      this.releaseStreamFromVideo();
      console.log('Recording Stopped.');
      this.file = blob;
      this.setStreamToVideo(this.file);
      this.playMode();
    }
  }, {
    key: "handlePause",
    value: function handlePause() {
      this.releaseStreamFromVideo();
      this.setState({
        paused: true
      });
    }
  }, {
    key: "handleResume",
    value: function handleResume(stream) {
      this.setStreamToVideo(stream);
      this.setState({
        paused: false
      });
    }
  }, {
    key: "handleError",
    value: function handleError(err) {
      console.log(err);
    }
  }, {
    key: "setStreamToVideo",
    value: function setStreamToVideo(stream) {
      var video = this.app.current.querySelector('video');
      this.recordMode(video);

      // is a mediastream
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }
    }
  }, {
    key: "releaseStreamFromVideo",
    value: function releaseStreamFromVideo() {
      this.video.src = '';
      this.video.srcObject = null;
    }
  }, {
    key: "downloadVideo",
    value: function downloadVideo(blob) {
      //video.loop = true
      this.setStreamToVideo(blob);
      this.playMode();
      this.uploadFile(blob);
    }
  }, {
    key: "getUploadHeaders",
    value: function getUploadHeaders() {
      return this.config.upload_headers || {};
    }
  }, {
    key: "uploadCompleted",
    value: function uploadCompleted(url) {
      this.setState({
        url: url
      }, this.updateData);
      this.props.blockProps.removeLock();
      this.stopLoader();
      this.file = null;
      this.setUrlToVideo(url);
    }
  }, {
    key: "updateProgressBar",
    value: function updateProgressBar(e) {
      var complete = this.state.loading_progress;
      if (e.lengthComputable) {
        complete = e.loaded / e.total * 100;
        complete = complete != null ? complete : {
          complete: 0
        };
        this.setState({
          loading_progress: complete
        });
        return console.log("complete: ".concat(complete));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      this.state.granted;
      this.state.rejectedReason;
      this.state.recording;
      this.state.paused;
      return /*#__PURE__*/React.createElement("div", {
        ref: this.app
      }, /*#__PURE__*/React.createElement(VideoContainer, null, /*#__PURE__*/React.createElement(ReactMediaRecorder, {
        ref: this.mediaRecorder,
        constraints: {
          audio: {
            "sampleSize": 16,
            "channelCount": 2,
            "echoCancellation": true,
            "noiseSuppression": false
          },
          video: true
        },
        timeSlice: 10,
        onGranted: this.handleGranted,
        onDenied: this.handleDenied,
        onStart: function onStart(stream) {
          return _this3.handleStart(stream, _this3);
        },
        onStop: this.handleStop,
        onPause: this.handlePause,
        onResume: this.handleResume,
        onError: this.handleError,
        mediaType: this.mediaType,
        render: function render(_ref) {
          var start = _ref.start,
            stop = _ref.stop;
            _ref.pause;
            _ref.resume;
          return /*#__PURE__*/React.createElement("div", null, !_this3.isReadOnly() ? /*#__PURE__*/React.createElement(StatusBar, {
            contentEditable: false,
            loading: _this3.state.loading
          }, _this3.state.loading ? /*#__PURE__*/React.createElement(Loader, {
            toggle: _this3.state.loading,
            progress: _this3.state.loading_progress
          }) : null) : null, /*#__PURE__*/React.createElement(VideoBody, null, !_this3.isReadOnly() ? /*#__PURE__*/React.createElement(EditorControls, {
            contentEditable: false
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              position: 'relative',
              display: 'flex'
            }
          }, !_this3.state.loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RecButton, {
            onClick: function onClick(e) {
              e.preventDefault();
              _this3.state.recording ? stop() : start();
            },
            disabled: _this3.state.recording,
            className: _this3.state.recording ? 'recording' : ''
          }, _this3.state.recording ? "recording. (".concat(_this3.state.secondsLeft, " seconds left)") : "press button to start recording"), /*#__PURE__*/React.createElement(SecondsLeft, null)) : null), _this3.state.fileReady && !_this3.state.loading ? /*#__PURE__*/React.createElement(Button, {
            onClick: function onClick(e) {
              e.preventDefault();
              _this3.confirm();
            }
          }, "confirm recording upload ?") : null) : null, /*#__PURE__*/React.createElement(VideoPlayer, {
            autoPlay: true,
            muted: true
          }), /*#__PURE__*/React.createElement("figcaption", {
            className: "imageCaption",
            onMouseDown: _this3.handleFocus
          }, _this3.props.block.getText().length === 0 ? /*#__PURE__*/React.createElement("span", {
            className: "danteDefaultPlaceholder"
          }, _this3.placeholderText()) : undefined, /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, _this3.props, {
            "editable": true,
            "className": "imageCaption"
          })))));
        }
      })));
    }
  }]);
  return VideoRecorderBlock;
}(React.Component);
var Loader = /*#__PURE__*/function (_React$Component2) {
  _inherits(Loader, _React$Component2);
  var _super2 = _createSuper(Loader);
  function Loader() {
    var _this4;
    _classCallCheck(this, Loader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this4 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this4), "render", function () {
      return /*#__PURE__*/React.createElement(React.Fragment, null, _this4.props.toggle ? /*#__PURE__*/React.createElement("div", {
        className: "image-upoader-loader",
        style: {
          width: '100%',
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("p", null, _this4.props.progress === 100 ? "processing video..." : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "uploading video ", " "), Math.round(_this4.props.progress), "%"))) : null);
    });
    return _this4;
  }
  return _createClass(Loader);
}(React.Component);
var VideoRecorderBlockConfig = function VideoRecorderBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'record a video',
    type: 'recorded-video',
    icon: videoRecorderIcon,
    block: VideoRecorderBlock,
    editable: true,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--video",
    selected_class: "is-selected",
    mediaType: options.mediaType || "video/webm",
    selectedFn: function selectedFn(block) {},
    /*handleEnterWithoutText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },
    handleEnterWithText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(RichUtils.insertSoftNewline(editorState))
      //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },*/
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image"
    },
    options: {
      seconds_to_record: 10000
    }
  };
  return Object.assign(config, options);
};

export { VideoRecorderBlockConfig, VideoRecorderBlock as default };
