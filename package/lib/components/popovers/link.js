"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DanteAnchorPopoverConfig = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _menu = require("../../styled/menu");

var _selection = require("../../utils/selection.js");

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

var DanteAnchorPopover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DanteAnchorPopover, _React$Component);

  function DanteAnchorPopover(props) {
    var _this;

    _classCallCheck(this, DanteAnchorPopover);

    _this = _possibleConstructorReturn(this, (DanteAnchorPopover.__proto__ || Object.getPrototypeOf(DanteAnchorPopover)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "display", function (b) {
      if (b) {
        return _this.show();
      } else {
        return _this.hide();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      return _this.setState({
        show: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      return _this.setState({
        show: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "relocate", function (node) {
      if (!node) {
        return;
      }

      var editorState = _this.props.editorState;
      var selectionRect = node.getBoundingClientRect();

      var parent = _reactDom.default.findDOMNode(_this.props.editor);

      var relativeParent = (0, _selection.getRelativeParent)(_this.refs.dante_popover.parentElement);
      var toolbarHeight = _this.refs.dante_popover.clientHeight;
      var toolbarWidth = _this.refs.dante_popover.clientWidth;
      var relativeRect = (relativeParent || document.body).getBoundingClientRect();
      if (!relativeRect || !selectionRect) return;
      var top = selectionRect.top - relativeRect.top + toolbarHeight * 0.6;
      var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - toolbarWidth / 2;

      if (!top || !left) {
        return;
      }

      return {
        top: top,
        left: left
      };
    });

    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      url: ""
    };
    return _this;
  }

  _createClass(DanteAnchorPopover, [{
    key: "setPosition",
    value: function setPosition(coords) {
      return this.setState({
        position: coords
      });
    }
  }, {
    key: "render",
    value: function render() {
      var position = this.state.position;
      var style = {
        left: position.left,
        top: position.top,
        visibility: "".concat(this.state.show ? 'visible' : 'hidden')
      };
      return _react.default.createElement(_menu.AnchorStyle, {
        ref: "dante_popover",
        className: "dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active",
        style: style,
        onMouseOver: this.props.handleOnMouseOver,
        onMouseOut: this.props.handleOnMouseOut
      }, _react.default.createElement("div", {
        className: "popover-inner"
      }, _react.default.createElement("a", {
        href: this.state.url,
        target: "_blank"
      }, this.state.url)), _react.default.createElement("div", {
        className: "popover-arrow"
      }));
    }
  }]);

  return DanteAnchorPopover;
}(_react.default.Component);

var _default = DanteAnchorPopover;
exports.default = _default;

var DanteAnchorPopoverConfig = function DanteAnchorPopoverConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: 'anchor_popover',
    component: DanteAnchorPopover
  };
  return Object.assign(config, options);
};

exports.DanteAnchorPopoverConfig = DanteAnchorPopoverConfig;