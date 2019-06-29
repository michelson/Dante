"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeBlockConfig = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _axios = _interopRequireDefault(require("axios"));

var _index = require("../../model/index.js");

var _icons = require("../icons.js");

var _reactSelect = _interopRequireDefault(require("react-select"));

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

var CodeBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CodeBlock, _React$Component);

  function CodeBlock(props) {
    var _this;

    _classCallCheck(this, CodeBlock);

    _this = _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updateData", function (options) {
      var _this$props = _this.props,
          blockProps = _this$props.blockProps,
          block = _this$props.block;
      var getEditorState = blockProps.getEditorState;
      var setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state).merge(options);
      return setEditorState((0, _index.updateDataOfBlock)(getEditorState(), block, newData));
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelect", function () {
      return _this.props.blockProps.config.displaySelect && !_this.props.blockProps.getEditor().props.read_only;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return _react.default.createElement("div", null, _react.default.createElement("span", {
        className: "dante-code-syntax"
      }, _this.renderSelect() ? _react.default.createElement(_reactSelect.default, {
        options: _this.languages,
        isSearchable: true,
        defaultValue: _this.state.syntax,
        onChange: function onChange(o) {
          _this.updateData({
            syntax: o.value
          });
        }
      }) : null), _react.default.createElement(_draftJs.EditorBlock, _this.props));
    });

    _this.state = {
      syntax: _this.props.blockProps.data.get('syntax')
    };
    _this.languages = _this.props.blockProps.config.languages;
    return _this;
  }

  _createClass(CodeBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {} //this.updateData({syntax: "javascript"})
    // will update block state

  }]);

  return CodeBlock;
}(_react.default.Component);

exports.default = CodeBlock;

var CodeBlockConfig = function CodeBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'add an code',
    type: 'code-block',
    icon: _icons.image,
    block: CodeBlock,
    editable: true,
    renderable: true,
    //breakOnContinuous: true,
    wrapper_class: "graf graf--code",
    selected_class: "is-selected",
    selectedFn: function selectedFn(block) {},
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      var selection = editorState.getSelection(); // check if we are in the last line and got 2 previous breaklines

      if (block.getLength() === selection.getEndOffset()) {
        if (block.getText().slice(-2) === "\n\n") {
          return ctx.onChange((0, _index.addNewBlockAt)(editorState, block.getKey()));
        }
      }

      return ctx.onChange(_draftJs.RichUtils.insertSoftNewline(editorState));
    },
    widget_options: {},
    options: {
      displaySelect: true,
      languages: [{
        value: 'javascript',
        label: 'javascript'
      }, {
        value: 'html',
        label: 'html'
      }, {
        value: 'css',
        label: 'css'
      }, {
        value: null,
        label: 'none'
      }]
    }
  };
  return Object.assign(config, options);
};

exports.CodeBlockConfig = CodeBlockConfig;