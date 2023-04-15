import { c as _inherits, d as _createSuper, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized, a as _createClass } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React, { Component } from 'react';

//import classNames from "classnames";
//import icons from "../../icons";
var BlockInput = /*#__PURE__*/function (_Component) {
  _inherits(BlockInput, _Component);
  var _super = _createSuper(BlockInput);
  function BlockInput(props) {
    var _this;
    _classCallCheck(this, BlockInput);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleChangeEv", function (ev, field) {
      //ev.preventDefault()
      var data = _defineProperty({}, field, ev.currentTarget.value);
      console.log("updating ".concat(JSON.stringify(data)));
      _this.props.handleOnChange(data);
    });
    _this.state = {
      enabled: false,
      value: "sfsdd",
      edit: false
    };
    _this.input = /*#__PURE__*/React.createRef();
    return _this;
  }
  _createClass(BlockInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement("p", {
        style: this.props.style,
        onClick: function onClick(ev) {
          _this2.setState({
            edit: true
          }, function () {
            _this2.input.current.focus();
          });
        }
      }, this.state.edit ? /*#__PURE__*/React.createElement("input", {
        className: "form-control",
        placeholder: this.props.placeholder,
        type: "text",
        ref: this.input,
        defaultValue: this.props.value,
        onBlur: function onBlur(ev) {
          _this2.handleChangeEv(ev, _this2.props.name);
          _this2.setState({
            edit: false
          });
        }
        //value={this.props.value}
        //onChange={(ev)=>{this.handleChangeEv(ev, this.props.name)}}
      }) : /*#__PURE__*/React.createElement("span", null, this.props.value, /*#__PURE__*/React.createElement("a", {
        href: "#",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this2.setState({
            edit: true
          });
        }
      }, " edit")));
    }
  }]);
  return BlockInput;
}(Component);

export { BlockInput as default };
