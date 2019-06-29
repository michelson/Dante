function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */
import React, { Component } from "react"; //import classNames from "classnames";
//import icons from "../../icons";

var BlockInput =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockInput, _Component);

  function BlockInput(props) {
    var _this;

    _classCallCheck(this, BlockInput);

    _this = _possibleConstructorReturn(this, (BlockInput.__proto__ || Object.getPrototypeOf(BlockInput)).call(this, props));

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
    return _this;
  }

  _createClass(BlockInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("p", {
        style: this.props.style,
        onClick: function onClick(ev) {
          _this2.setState({
            edit: true
          }, function () {
            _this2.refs.input.focus();
          });
        }
      }, this.state.edit ? React.createElement("input", {
        className: "form-control",
        placeholder: this.props.placeholder,
        type: "text",
        ref: "input",
        defaultValue: this.props.value,
        onBlur: function onBlur(ev) {
          _this2.handleChangeEv(ev, _this2.props.name);

          _this2.setState({
            edit: false
          });
        } //value={this.props.value}
        //onChange={(ev)=>{this.handleChangeEv(ev, this.props.name)}}

      }) : React.createElement("span", null, this.props.value, React.createElement("a", {
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