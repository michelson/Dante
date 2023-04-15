import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorState, EditorBlock } from 'draft-js';
import axios from 'axios';
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js';
import { file } from '../icons.js';
import 'immutable';

var FileBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(FileBlock, _React$Component);
  var _super = _createSuper(FileBlock);
  function FileBlock(props) {
    var _this;
    _classCallCheck(this, FileBlock);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "blockPropsSrc", function () {
      return _this.props.blockProps.data.src;
    });
    _defineProperty(_assertThisInitialized(_this), "defaultUrl", function (data) {
      if (data.url) {
        return data.url;
      }
      if (data.url) {
        if (data.file) {
          return URL.createObjectURL(data.file);
        } else {
          return data.url;
        }
      } else {
        return _this.props.blockProps.data.src;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "replaceFile", function () {
      // exit only when not blob and not forceUload
      if (!_this.state.url.includes('blob:') && !_this.props.block.data.get('forceUpload')) {
        return;
      }
      _this.handleUpload();
    });
    _defineProperty(_assertThisInitialized(_this), "defaultPlaceholder", function () {
      return _this.props.blockProps.config.image_caption_placeholder;
    });
    _defineProperty(_assertThisInitialized(_this), "defaultAspectRatio", function (data) {
      if (data.aspect_ratio) {
        return {
          width: data.aspect_ratio.width,
          height: data.aspect_ratio.height,
          ratio: data.aspect_ratio.ratio
        };
      } else {
        return {
          width: 0,
          height: 0,
          ratio: 100
        };
      }
    });
    // will update block state
    _defineProperty(_assertThisInitialized(_this), "updateData", function () {
      var _this$props = _this.props,
        blockProps = _this$props.blockProps,
        block = _this$props.block;
      var getEditorState = blockProps.getEditorState;
      var setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state).merge({
        forceUpload: false
      });
      return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
    });
    _defineProperty(_assertThisInitialized(_this), "startLoader", function () {
      return _this.setState({
        loading: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "stopLoader", function () {
      return _this.setState({
        loading: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleUpload", function () {
      _this.startLoader();
      _this.updateData();
      return _this.uploadFile();
    });
    _defineProperty(_assertThisInitialized(_this), "updateDataSelection", function () {
      var _this$props$blockProp = _this.props.blockProps,
        getEditorState = _this$props$blockProp.getEditorState,
        setEditorState = _this$props$blockProp.setEditorState;
      var newselection = getEditorState().getSelection().merge({
        anchorKey: _this.props.block.getKey(),
        focusKey: _this.props.block.getKey()
      });
      return setEditorState(EditorState.forceSelection(getEditorState(), newselection));
    });
    _defineProperty(_assertThisInitialized(_this), "formatData", function () {
      var formData = new FormData();
      if (_this.file) {
        var formName = _this.config.upload_formName || 'file';
        formData.append(formName, _this.file);
        return formData;
      } else {
        formData.append('url', _this.props.blockProps.data.get('url'));
        return formData;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getUploadUrl", function () {
      var url = _this.config.upload_url;
      if (typeof url === 'function') {
        return url();
      } else {
        return url;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "uploadFile", function () {
      // custom upload handler
      if (_this.config.upload_handler) {
        return _this.config.upload_handler(_this.formatData().get('file'), _assertThisInitialized(_this));
      }
      if (!_this.config.upload_url) {
        _this.stopLoader();
        return;
      }
      _this.props.blockProps.addLock();
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
    _defineProperty(_assertThisInitialized(_this), "placeHolderEnabled", function () {
      return _this.state.enabled || _this.props.block.getText();
    });
    _defineProperty(_assertThisInitialized(_this), "placeholderText", function () {
      return _this.config.image_caption_placeholder || 'caption here (optional)';
    });
    _defineProperty(_assertThisInitialized(_this), "imageUrl", function () {
      if (_this.state.url.includes('://')) return _this.state.url;
      return "".concat(_this.config.domain ? _this.config.domain : '').concat(_this.state.url);
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var fileName = _this.file ? _this.file.name : _this.state.url.split('/').pop();
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        contentEditable: "false",
        suppressContentEditableWarning: true
      }, !_this.state.loading && /*#__PURE__*/React.createElement("a", {
        href: _this.state.url,
        target: "blank",
        className: "flex items-center border rounded text-sm text-gray-100 bg-gray-500 border-gray-600 p-2 py-2"
      }, /*#__PURE__*/React.createElement(file, null), fileName), _this.state.loading && /*#__PURE__*/React.createElement(Loader, {
        toggle: _this.state.loading,
        progress: _this.state.loading_progress
      })), /*#__PURE__*/React.createElement("figcaption", {
        className: "imageCaption",
        onMouseDown: _this.handleFocus
      }, _this.props.block.getText().length === 0 ? /*#__PURE__*/React.createElement("span", {
        className: "danteDefaultPlaceholder"
      }, _this.placeholderText()) : undefined, /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, _this.props, {
        editable: true,
        className: 'imageCaption'
      }))));
    });
    var existing_data = _this.props.block.getData().toJS();
    _this.config = _this.props.blockProps.config;
    _this.file = _this.props.blockProps.data.get('file');
    _this.state = {
      loading: false,
      selected: false,
      loading_progress: 0,
      caption: _this.defaultPlaceholder(),
      direction: existing_data.direction || 'center',
      width: 0,
      height: 0,
      enabled: false,
      // file: null,
      url: _this.blockPropsSrc() || _this.defaultUrl(existing_data),
      aspect_ratio: _this.defaultAspectRatio(existing_data)
    };
    return _this;
  }
  _createClass(FileBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      return this.replaceFile();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
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
    key: "handleFocus",
    value: function handleFocus(_e) {}
  }]);
  return FileBlock;
}(React.Component);
var Loader = /*#__PURE__*/function (_React$Component2) {
  _inherits(Loader, _React$Component2);
  var _super2 = _createSuper(Loader);
  function Loader() {
    var _this2;
    _classCallCheck(this, Loader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "render", function () {
      return /*#__PURE__*/React.createElement("div", null, _this2.props.toggle ? /*#__PURE__*/React.createElement("div", {
        className: "image-upoader-loader"
      }, /*#__PURE__*/React.createElement("p", null, _this2.props.progress === 100 ? "processing image..." : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "loading"), " ", Math.round(_this2.props.progress)))) : undefined);
    });
    return _this2;
  }
  return _createClass(Loader);
}(React.Component);
var FileBlockConfig = function FileBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'add a file',
    type: 'file',
    icon: file,
    block: FileBlock,
    editable: true,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: 'graf graf--figure',
    selected_class: 'is-selected is-mediaFocused',
    selectedFn: function selectedFn(block) {
      var _block$getData$toJS = block.getData().toJS(),
        direction = _block$getData$toJS.direction;
      switch (direction) {
        case 'left':
          return 'graf--layoutOutsetLeft';
        case 'center':
          return '';
        case 'wide':
          return 'sectionLayout--fullWidth';
        case 'fill':
          return 'graf--layoutFillWidth';
        default:
          return '';
      }
    },
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
    },
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: 'upload',
      insert_block: 'file',
      file_types: '*'
    },
    options: {
      upload_url: '',
      upload_headers: null,
      upload_formName: 'file',
      upload_callback: null,
      upload_error_callback: null,
      delete_block_callback: null,
      image_caption_placeholder: 'type a caption (optional)'
    }
  };
  return Object.assign(config, options);
};

export { FileBlockConfig, FileBlock as default };
