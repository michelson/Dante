import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { fontColor } from '../icons.js';
import { debounce } from 'lodash';

var DanteTooltipColor = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteTooltipColor, _React$Component);
  var _super = _createSuper(DanteTooltipColor);
  function DanteTooltipColor() {
    var _this;
    _classCallCheck(this, DanteTooltipColor);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "toggle", function (ev) {
      // let selection = this.props.editorState.getSelection()
      // prevent unselection of selection
      ev.preventDefault();
      _this.setState({
        open: !_this.state.open
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e, item) {
      e && e.preventDefault();
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
      var v = _this.currentValue() || _this.props.value;
      //console.log(`this should be ${v}`)

      if (_this.state.open) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            position: "absolute"
          }
        }, /*#__PURE__*/React.createElement(HexColorPicker, {
          color: v,
          onChange: function onChange(color, e) {
            _this.handleChange(e, color);
            //this.handleClick(e,  color )
          }
        }));
      }
    });
    _this.state = {
      open: false,
      value: _this.props.value
    };
    _this.handleChange = debounce(function (e, value) {
      _this.handleClick(e, value);
    }, 500);
    return _this;
  }
  _createClass(DanteTooltipColor, [{
    key: "componentWillUmount",
    value: function componentWillUmount() {
      this.handleChange.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("li", {
        className: "dante-menu-button"
      }, /*#__PURE__*/React.createElement("span", {
        className: "dante-icon",
        onMouseDown: this.toggle
      }, fontColor()), this.state.open && this.renderColor());
    }
  }]);
  return DanteTooltipColor;
}(React.Component);

export { DanteTooltipColor as default };
