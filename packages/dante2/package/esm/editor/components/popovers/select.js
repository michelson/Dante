import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';

var DanteTooltipList = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteTooltipList, _React$Component);
  var _super = _createSuper(DanteTooltipList);
  function DanteTooltipList() {
    var _this;
    _classCallCheck(this, DanteTooltipList);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "logChange", function (val) {
      //console.log("Selected: " + JSON.stringify(val));
    });
    _defineProperty(_assertThisInitialized(_this), "promptForLink", function (ev) {
      var selection = _this.props.editorState.getSelection();
      if (!selection.isCollapsed()) ;
    });
    _defineProperty(_assertThisInitialized(_this), "currentValue", function () {
      if (_this.props.style_type === "block") {
        return;
      }
      var selection = _this.props.editorState.getSelection();
      if (!selection.isCollapsed()) {
        return _this.props.styles[_this.props.style_type].current(_this.props.editorState);
      } else {
        return;
      }
    });
    return _this;
  }
  _createClass(DanteTooltipList, [{
    key: "render",
    value: function render() {
      //console.log(`${this.currentValue()} vs ${this.props.value}`)
      var v = this.currentValue() || this.props.value;
      //console.log(`this should be ${v}`)
      //let v = this.props.value

      return /*#__PURE__*/React.createElement("li", {
        className: "dante-menu-button visible-overflow",
        onMouseDown: this.promptForLink
      }, /*#__PURE__*/React.createElement(DropDown, {
        items: this.props.items,
        value: v,
        style_type: this.props.style_type,
        handleClick: this.props.handleClick
      }));
    }
  }]);
  return DanteTooltipList;
}(React.Component);
var DropDown = /*#__PURE__*/function (_React$Component2) {
  _inherits(DropDown, _React$Component2);
  var _super2 = _createSuper(DropDown);
  function DropDown() {
    var _this2;
    _classCallCheck(this, DropDown);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "toggle", function (e) {
      e.preventDefault();
      _this2.setState({
        open: !_this2.state.open
      });
    });
    _defineProperty(_assertThisInitialized(_this2), "handleClick", function (e, item) {
      e.preventDefault();
      _this2.setState({
        value: item
      }, function () {
        var o = _defineProperty({}, _this2.props.style_type, _this2.state.value);
        _this2.props.handleClick(e, o);
      });
    });
    _this2.state = {
      open: false,
      value: _this2.props.value
    };
    return _this2;
  }
  _createClass(DropDown, [{
    key: "render",
    value: function render() {
      var _React$createElement,
        _this3 = this;
      return /*#__PURE__*/React.createElement("div", {
        className: "dropdown ".concat(this.state.open ? 'open' : '')
      }, /*#__PURE__*/React.createElement("button", (_React$createElement = {
        type: "button",
        className: "btn btn-default dropdown-toggle"
        //onMouseDown={this.toggle}
      }, _defineProperty(_React$createElement, "type", "button"), _defineProperty(_React$createElement, "id", "dropdownMenu1"), _defineProperty(_React$createElement, "data-toggle", "dropdown"), _defineProperty(_React$createElement, "aria-haspopup", "true"), _defineProperty(_React$createElement, "aria-expanded", "true"), _React$createElement), this.props.value, /*#__PURE__*/React.createElement("span", {
        className: "caret"
      })), /*#__PURE__*/React.createElement("ul", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownMenu1"
      }, this.props.items.map(function (o) {
        return /*#__PURE__*/React.createElement(DropDownItem, {
          item: o,
          handleClick: _this3.handleClick
        });
      })));
    }
  }]);
  return DropDown;
}(React.Component);
var DropDownItem = /*#__PURE__*/function (_React$Component3) {
  _inherits(DropDownItem, _React$Component3);
  var _super3 = _createSuper(DropDownItem);
  function DropDownItem() {
    _classCallCheck(this, DropDownItem);
    return _super3.apply(this, arguments);
  }
  _createClass(DropDownItem, [{
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: function onClick(e) {
          return e.preventDefault();
        },
        onMouseDown: function onMouseDown(e) {
          return _this4.props.handleClick(e, _this4.props.item);
        }
      }, this.props.item));
    }
  }]);
  return DropDownItem;
}(React.Component);

export { DanteTooltipList as default };
