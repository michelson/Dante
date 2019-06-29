"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmbedBlockConfig = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../../model/index.js");

var _draftJs = require("draft-js");

var _icons = require("../icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EmbedBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EmbedBlock, _React$Component);

  function EmbedBlock(props) {
    var _this;

    _classCallCheck(this, EmbedBlock);

    _this = _possibleConstructorReturn(this, (EmbedBlock.__proto__ || Object.getPrototypeOf(EmbedBlock)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "defaultData", function () {
      var existing_data = _this.props.block.getData().toJS();

      return existing_data.embed_data || {};
    });

    _defineProperty(_assertThisInitialized(_this), "updateData", function () {
      var _this$props = _this.props,
          block = _this$props.block,
          blockProps = _this$props.blockProps;
      var getEditorState = blockProps.getEditorState,
          setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state);
      return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
    });

    _defineProperty(_assertThisInitialized(_this), "deleteSelf", function (e) {
      e.preventDefault();
      var _this$props2 = _this.props,
          block = _this$props2.block,
          blockProps = _this$props2.blockProps;
      var getEditorState = blockProps.getEditorState,
          setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state);
      return setEditorState((0, _index.resetBlockWithType)(getEditorState(), 'unstyled', {}));
    });

    _defineProperty(_assertThisInitialized(_this), "dataForUpdate", function () {
      return _this.props.blockProps.data.toJS();
    });

    _defineProperty(_assertThisInitialized(_this), "classForImage", function () {
      if (_this.picture()) {
        return "";
      } else {
        return "mixtapeImage--empty u-ignoreBlock";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "picture", function () {
      if (_this.state.embed_data.images && _this.state.embed_data.images.length > 0) {
        return _this.state.embed_data.images[0].url;
      } else if (_this.state.embed_data.thumbnail_url) {
        return _this.state.embed_data.thumbnail_url;
      } else if (_this.state.embed_data.image) {
        return _this.state.embed_data.image;
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      if (!_this.props.blockProps.getEditor().props.read_only) {
        e.preventDefault();
      }
    });

    _this.state = {
      embed_data: _this.defaultData(),
      error: ""
    };
    return _this;
  }

  _createClass(EmbedBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.blockProps.data) {
        return;
      } // ensure data isnt already loaded
      // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text


      if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
        //debugger
        return;
      }

      return (0, _axios.default)({
        method: 'get',
        url: "".concat(this.dataForUpdate().endpoint).concat(this.dataForUpdate().provisory_text, "&scheme=https")
      }).then(function (result) {
        return _this2.setState({
          embed_data: result.data //JSON.parse(data.responseText)

        }, _this2.updateData);
      }).catch(function (error) {
        _this2.setState({
          error: error.response.data.error_message
        });

        return console.log("TODO: error");
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("span", null, this.picture() ? _react.default.createElement("a", {
        target: "_blank",
        className: "js-mixtapeImage mixtapeImage ".concat(this.classForImage()),
        href: this.state.embed_data.url,
        style: {
          backgroundImage: "url('".concat(this.picture(), "')")
        }
      }) : undefined, this.state.error ? _react.default.createElement("h2", null, this.state.error) : undefined, !this.props.blockProps.getEditor().props.read_only ? _react.default.createElement("a", {
        href: "#",
        className: "graf--media-embed-close",
        onClick: this.deleteSelf
      }, "x") : null, _react.default.createElement("a", {
        className: "markup--anchor markup--mixtapeEmbed-anchor",
        target: "_blank",
        href: this.state.embed_data.url,
        onClick: this.handleClick,
        contentEditable: false
      }, _react.default.createElement("strong", {
        className: "markup--strong markup--mixtapeEmbed-strong"
      }, this.state.embed_data.title), _react.default.createElement("em", {
        className: "markup--em markup--mixtapeEmbed-em"
      }, this.state.embed_data.description)), _react.default.createElement("span", {
        contentEditable: false
      }, this.state.embed_data.provider_url || this.state.embed_data.url));
    }
  }]);

  return EmbedBlock;
}(_react.default.Component);

exports.default = EmbedBlock;

var EmbedBlockConfig = function EmbedBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'insert embed',
    type: 'embed',
    block: EmbedBlock,
    icon: _icons.embed,
    editable: true,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--mixtapeEmbed",
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "embed"
    },
    options: {
      endpoint: '//noembed.com/embed?url=',
      placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
    },
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
    }
  };
  return Object.assign(config, options);
};

exports.EmbedBlockConfig = EmbedBlockConfig;