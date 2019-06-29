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
import { SketchPicker } from 'react-color';
import { fontColor } from "../icons.js";

var DanteTooltipColor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DanteTooltipColor, _React$Component);

  function DanteTooltipColor() {
    var _ref;

    var _this;

    _classCallCheck(this, DanteTooltipColor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_ref = DanteTooltipColor.__proto__ || Object.getPrototypeOf(DanteTooltipColor)).call.apply(_ref, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "toggle", function (ev) {
      // let selection = this.props.editorState.getSelection()
      // prevent unselection of selection
      ev.preventDefault();

      _this.setState({
        open: true
      }); //!this.state.open})

    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e, item) {
      e.preventDefault();

      _this.setState({
        value: item
      }, function () {
        var o = _defineProperty({}, _this.props.style_type, _this.state.value);

        _this.props.handleClick(e, o);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "currentValue", function () {
      var selection = _this.props.editorState.getSelection();

      if (!selection.isCollapsed()) {
        return _this.props.styles[_this.props.style_type].current(_this.props.editorState);
      } else {
        return;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderColor", function () {
      //console.log(`${this.currentValue()} vs ${this.props.value}`)
      var v = _this.currentValue() || _this.props.value; //console.log(`this should be ${v}`)


      if (_this.state.open) {
        return React.createElement("div", {
          style: {
            position: 'absolute'
          }
        }, React.createElement(SketchPicker, {
          color: v,
          presetColors: [],
          onChangeComplete: function onChangeComplete(color, e) {
            _this.handleClick(e, color.hex);
          }
        }));
      }
    });

    _this.state = {
      open: false,
      value: _this.props.value
    };
    return _this;
  }

  _createClass(DanteTooltipColor, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.show === false) {
        this.setState({
          open: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("li", {
        className: "dante-menu-button",
        onMouseDown: this.toggle
      }, React.createElement("span", {
        className: 'dante-icon'
      }, fontColor()), this.renderColor());
    }
  }]);

  return DanteTooltipColor;
}(React.Component);

export { DanteTooltipColor as default };