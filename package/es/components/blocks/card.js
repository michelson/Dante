function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { EditorBlock } from 'draft-js';
import axios from "axios";
import { updateDataOfBlock } from '../../model/index.js';

var CardBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardBlock, _React$Component);

  function CardBlock(props) {
    var _this;

    _classCallCheck(this, CardBlock);

    _this = _possibleConstructorReturn(this, (CardBlock.__proto__ || Object.getPrototypeOf(CardBlock)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "setImage", function (image) {
      _this.setState({
        image: image
      }, _this.updateData);
    });

    _defineProperty(_assertThisInitialized(_this), "updateData", function () {
      var blockProps = _this.props.blockProps;
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
        return React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, React.createElement("div", {
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
      return React.createElement("div", {
        style: {
          width: '100%',
          height: '100px',
          margin: '18px 0px 47px'
        }
      }, React.createElement("div", {
        className: "signature"
      }, React.createElement(CardImage, Object.assign({
        image: this.state.image,
        setImage: this.setImage,
        config: this.config
      }, this.props)), React.createElement("div", {
        className: "text",
        style: {
          "color": 'rgb(153, 153, 153)',
          "fontSize": '12px',
          "fontWeight": 'bold'
        }
      }, this.placeholderRender(), React.createElement(EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })))), React.createElement("div", {
        className: "dante-clearfix"
      }));
    }
  }]);

  return CardBlock;
}(React.Component);

export { CardBlock as default };

var CardImage =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(CardImage, _React$Component2);

  function CardImage(props) {
    var _this2;

    _classCallCheck(this, CardImage);

    _this2 = _possibleConstructorReturn(this, (CardImage.__proto__ || Object.getPrototypeOf(CardImage)).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "clickOnFileUpload", function (ev) {
      ev.preventDefault();

      _this2.refs.fileInput.click(); //ev.preventDefault()

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

      _this2.handleUpload(); //return this.props.onChange(addNewBlock(this.props.editorState, 'image', opts))

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

      _this2.props.blockProps.addLock(); //this.updateData()


      return _this2.uploadFile();
    });

    _defineProperty(_assertThisInitialized(_this2), "uploadFailed", function () {
      _this2.props.blockProps.removeLock();

      _this2.stopLoader();
    });

    _defineProperty(_assertThisInitialized(_this2), "uploadCompleted", function (url) {
      _this2.props.setImage(url); //this.setState({ url }, this.updateData)


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
      var handleUp; // custom upload handler

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
      }).catch(function (error) {
        _this2.uploadFailed();

        console.log("ERROR: got error uploading file ".concat(error));

        if (_this2.props.config.upload_error_callback) {
          return _this2.props.config.upload_error_callback(error, _assertThisInitialized(_this2));
        }
      });
      return handleUp = function handleUp(json_response) {
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
    return _this2;
  }

  _createClass(CardImage, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("a", {
        href: "#",
        contentEditable: "false",
        onClick: this.clickOnFileUpload
      }, React.createElement("img", {
        src: this.props.image
      }), React.createElement(Loader, {
        toggle: this.state.loading,
        progress: this.state.loading_progress
      })), React.createElement("input", {
        type: "file",
        style: {
          display: 'none'
        },
        ref: "fileInput",
        onChange: this.handleFileInput
      }));
    }
  }]);

  return CardImage;
}(React.Component);

var Loader =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Loader, _React$Component3);

  function Loader() {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
  }

  _createClass(Loader, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.toggle ? React.createElement("div", {
        className: "image-upoader-loader"
      }, React.createElement("p", null, this.props.progress === 100 ? "processing image..." : React.createElement("span", null, React.createElement("span", null, "loading"), " ", Math.round(this.props.progress)))) : undefined);
    }
  }]);

  return Loader;
}(React.Component);