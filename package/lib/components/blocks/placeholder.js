"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaceholderBlockConfig = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _draftJs = require("draft-js");

var _index = require("../../model/index.js");

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

var PlaceholderBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PlaceholderBlock, _React$Component);

  function PlaceholderBlock(props) {
    var _this;

    _classCallCheck(this, PlaceholderBlock);

    _this = _possibleConstructorReturn(this, (PlaceholderBlock.__proto__ || Object.getPrototypeOf(PlaceholderBlock)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "placeholderText", function () {
      //if (this.state.enabled) {
      //  return ""
      //}
      return _this.props.blockProps.data.toJS().placeholder || _this.placeholderFromProps() || _this.defaultText();
    });

    _defineProperty(_assertThisInitialized(_this), "placeholderFromProps", function () {
      return _this.props.block.toJS().placeholder;
    });

    _defineProperty(_assertThisInitialized(_this), "defaultText", function () {
      return "write something ";
    });

    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return _react.default.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, _react.default.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, _this.placeholderText()));
      }
    });

    _this.state = {
      enabled: false,
      data: _this.props.blockProps.data.toJS()
    };
    return _this;
  }

  _createClass(PlaceholderBlock, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("span", {
        onMouseDown: this.handleFocus
      }, this.placeholderRender(), _react.default.createElement(_draftJs.EditorBlock, Object.assign({}, this.props, {
        "className": "imageCaption",
        "placeholder": "escrive alalal"
      })));
    }
  }]);

  return PlaceholderBlock;
}(_react.default.Component);

exports.default = PlaceholderBlock;

var PlaceholderBlockConfig = function PlaceholderBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    renderable: true,
    editable: true,
    block: PlaceholderBlock,
    type: 'placeholder',
    wrapper_class: "is-embedable",
    breakOnContinuous: true,
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: false
    },
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange((0, _index.resetBlockWithType)(editorState, "unstyled"));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      var data = {
        provisory_text: block.getText(),
        endpoint: block.getData().get('endpoint'),
        type: block.getData().get('type')
      };
      return ctx.onChange((0, _index.resetBlockWithType)(editorState, data.type, data));
    }
  };
  return Object.assign(config, options);
};

exports.PlaceholderBlockConfig = PlaceholderBlockConfig;