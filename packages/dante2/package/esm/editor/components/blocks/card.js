import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized, g as _extends } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorBlock } from 'draft-js';
import axios from 'axios';
import { updateDataOfBlock } from '../../model/index.js';
import 'immutable';

var CardBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(CardBlock, _React$Component);
  var _super = _createSuper(CardBlock);
  function CardBlock(props) {
    var _this;
    _classCallCheck(this, CardBlock);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "setImage", function (image) {
      _this.setState({
        image: image
      }, _this.updateData);
    });
    // will update block state
    _defineProperty(_assertThisInitialized(_this), "updateData", function () {
      _this.props.blockProps;
      var block = _this.props.block;
      var getEditorState = _this.props.blockProps.getEditorState;
      var setEditorState = _this.props.blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state).merge({
        forceUpload: false
      });
      return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
    });
    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, "write something"));
      }
    });
    _this.state = {
      image: "http://via.placeholder.com/100x100"
    };
    _this.config = _this.props.blockProps.config;
    return _this;
  }
  _createClass(CardBlock, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%',
          height: '100px',
          margin: '18px 0px 47px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "signature"
      }, /*#__PURE__*/React.createElement(CardImage, _extends({
        image: this.state.image,
        setImage: this.setImage,
        config: this.config
      }, this.props)), /*#__PURE__*/React.createElement("div", {
        className: "text",
        style: {
          "color": 'rgb(153, 153, 153)',
          "fontSize": '12px',
          "fontWeight": 'bold'
        }
      }, this.placeholderRender(), /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })))), /*#__PURE__*/React.createElement("div", {
        className: "dante-clearfix"
      }));
    }
  }]);
  return CardBlock;
}(React.Component);
var CardImage = /*#__PURE__*/function (_React$Component2) {
  _inherits(CardImage, _React$Component2);
  var _super2 = _createSuper(CardImage);
  function CardImage(props) {
    var _this2;
    _classCallCheck(this, CardImage);
    _this2 = _super2.call(this, props);
    _defineProperty(_assertThisInitialized(_this2), "clickOnFileUpload", function (ev) {
      ev.preventDefault();
      _this2.fileInput.current.click();
      //ev.preventDefault()
    });
    _defineProperty(_assertThisInitialized(_this2), "handleFileInput", function (e) {
      var fileList = e.target.files;
      return _this2.insertImage(fileList[0]);
    });
    _defineProperty(_assertThisInitialized(_this2), "insertImage", function (file) {
      var opts = {
        url: URL.createObjectURL(file),
        file: file
      };
      _this2.file = file;
      _this2.props.setImage(opts.url);
      _this2.handleUpload();
      //return this.props.onChange(addNewBlock(this.props.editorState, 'image', opts))
    });
    _defineProperty(_assertThisInitialized(_this2), "getUploadHeaders", function () {
      return _this2.props.config.upload_headers || {};
    });
    _defineProperty(_assertThisInitialized(_this2), "getUploadUrl", function () {
      var url = _this2.props.config.upload_url;
      if (typeof url === "function") {
        return url();
      } else {
        return url;
      }
    });
    _defineProperty(_assertThisInitialized(_this2), "handleUpload", function () {
      _this2.startLoader();
      _this2.props.blockProps.addLock();
      //this.updateData()
      return _this2.uploadFile();
    });
    _defineProperty(_assertThisInitialized(_this2), "uploadFailed", function () {
      _this2.props.blockProps.removeLock();
      _this2.stopLoader();
    });
    _defineProperty(_assertThisInitialized(_this2), "uploadCompleted", function (url) {
      _this2.props.setImage(url);
      //this.setState({ url }, this.updateData)
      _this2.props.blockProps.removeLock();
      _this2.stopLoader();
      _this2.file = null;
    });
    _defineProperty(_assertThisInitialized(_this2), "updateProgressBar", function (e) {
      var complete = _this2.state.loading_progress;
      if (e.lengthComputable) {
        complete = e.loaded / e.total * 100;
        complete = complete != null ? complete : {
          complete: 0
        };
        _this2.setState({
          loading_progress: complete
        });
        return console.log("complete: ".concat(complete));
      }
    });
    _defineProperty(_assertThisInitialized(_this2), "uploadFile", function () {
      // custom upload handler
      if (_this2.props.config.upload_handler) {
        return _this2.props.config.upload_handler(_this2.formatData().get('file'), _assertThisInitialized(_this2));
      }
      axios({
        method: 'post',
        url: _this2.getUploadUrl(),
        headers: _this2.getUploadHeaders(),
        data: _this2.formatData(),
        onUploadProgress: function onUploadProgress(e) {
          return _this2.updateProgressBar(e);
        }
      }).then(function (result) {
        _this2.uploadCompleted(result.data.url);
        if (_this2.props.config.upload_callback) {
          return _this2.props.config.upload_callback(result, _assertThisInitialized(_this2));
        }
      })["catch"](function (error) {
        _this2.uploadFailed();
        console.log("ERROR: got error uploading file ".concat(error));
        if (_this2.props.config.upload_error_callback) {
          return _this2.props.config.upload_error_callback(error, _assertThisInitialized(_this2));
        }
      });
      return function handleUp(json_response) {
        return _this2.uploadCompleted(json_response.url);
      };
    });
    _defineProperty(_assertThisInitialized(_this2), "formatData", function () {
      var formData = new FormData();
      if (_this2.file) {
        var formName = _this2.props.config.upload_formName || 'file';
        formData.append(formName, _this2.file);
        return formData;
      } else {
        // TODO: check this 
        formData.append('url', _this2.props.blockProps.data.get("url"));
        return formData;
      }
    });
    _defineProperty(_assertThisInitialized(_this2), "startLoader", function () {
      return _this2.setState({
        loading: true
      });
    });
    _defineProperty(_assertThisInitialized(_this2), "stopLoader", function () {
      return _this2.setState({
        loading: false
      });
    });
    _this2.file = null;
    _this2.state = {
      loading: false,
      selected: false,
      loading_progress: 0,
      file: null
    };
    _this2.fileInput = /*#__PURE__*/React.createRef();
    return _this2;
  }
  _createClass(CardImage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
        href: "#",
        contentEditable: "false",
        onClick: this.clickOnFileUpload
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.image
      }), /*#__PURE__*/React.createElement(Loader, {
        toggle: this.state.loading,
        progress: this.state.loading_progress
      })), /*#__PURE__*/React.createElement("input", {
        type: "file",
        style: {
          display: 'none'
        },
        ref: this.fileInput,
        onChange: this.handleFileInput
      }));
    }
  }]);
  return CardImage;
}(React.Component);
var Loader = /*#__PURE__*/function (_React$Component3) {
  _inherits(Loader, _React$Component3);
  var _super3 = _createSuper(Loader);
  function Loader() {
    _classCallCheck(this, Loader);
    return _super3.apply(this, arguments);
  }
  _createClass(Loader, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.props.toggle ? /*#__PURE__*/React.createElement("div", {
        className: "image-upoader-loader"
      }, /*#__PURE__*/React.createElement("p", null, this.props.progress === 100 ? "processing image..." : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "loading"), " ", Math.round(this.props.progress)))) : undefined);
    }
  }]);
  return Loader;
}(React.Component);

export { CardBlock as default };
