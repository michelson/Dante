"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DividerBlockConfig = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _icons = require("../icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Divider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Divider, _React$Component);

  function Divider(props) {
    var _this;

    _classCallCheck(this, Divider);

    _this = _possibleConstructorReturn(this, (Divider.__proto__ || Object.getPrototypeOf(Divider)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return _react.default.createElement("span", null);
    });

    _this.state = {};
    return _this;
  }

  return Divider;
}(_react.default.Component);

exports.default = Divider;

var DividerBlockConfig = function DividerBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'add divider',
    type: 'divider',
    icon: _icons.divider,
    block: Divider,
    editable: false,
    renderable: true,
    breakOnContinuous: false,
    wrapper_class: "graf graf--divider",
    selected_class: "is-selected",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "divider"
    }
  };
  return Object.assign(config, options);
};

exports.DividerBlockConfig = DividerBlockConfig;