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

var DanteTooltipList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DanteTooltipList, _React$Component);

  function DanteTooltipList() {
    var _ref;

    var _this;

    _classCallCheck(this, DanteTooltipList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_ref = DanteTooltipList.__proto__ || Object.getPrototypeOf(DanteTooltipList)).call.apply(_ref, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "logChange", function (val) {//console.log("Selected: " + JSON.stringify(val));
    });

    _defineProperty(_assertThisInitialized(_this), "promptForLink", function (ev) {
      var selection = _this.props.editorState.getSelection();

      if (!selection.isCollapsed()) {//ev.preventDefault()
        //return this.props.enableLinkMode(ev)
      }
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
      var v = this.currentValue() || this.props.value; //console.log(`this should be ${v}`)
      //let v = this.props.value

      return React.createElement("li", {
        className: "dante-menu-button visible-overflow",
        onMouseDown: this.promptForLink
      }, React.createElement(DropDown, {
        items: this.props.items,
        value: v,
        style_type: this.props.style_type,
        handleClick: this.props.handleClick
      }));
    }
  }]);

  return DanteTooltipList;
}(React.Component);

export { DanteTooltipList as default };

var DropDown =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DropDown, _React$Component2);

  function DropDown() {
    var _ref2;

    var _this2;

    _classCallCheck(this, DropDown);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_ref2 = DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call.apply(_ref2, [this].concat(args)));

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

      return React.createElement("div", {
        className: "dropdown ".concat(this.state.open ? 'open' : '')
      }, React.createElement("button", (_React$createElement = {
        type: "button",
        className: "btn btn-default dropdown-toggle" //onMouseDown={this.toggle}

      }, _defineProperty(_React$createElement, "type", "button"), _defineProperty(_React$createElement, "id", "dropdownMenu1"), _defineProperty(_React$createElement, "data-toggle", "dropdown"), _defineProperty(_React$createElement, "aria-haspopup", "true"), _defineProperty(_React$createElement, "aria-expanded", "true"), _React$createElement), this.props.value, React.createElement("span", {
        className: "caret"
      })), React.createElement("ul", {
        className: "dropdown-menu",
        "aria-labelledby": "dropdownMenu1"
      }, this.props.items.map(function (o) {
        return React.createElement(DropDownItem, {
          item: o,
          handleClick: _this3.handleClick
        });
      })));
    }
  }]);

  return DropDown;
}(React.Component);

var DropDownItem =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DropDownItem, _React$Component3);

  function DropDownItem() {
    _classCallCheck(this, DropDownItem);

    return _possibleConstructorReturn(this, (DropDownItem.__proto__ || Object.getPrototypeOf(DropDownItem)).apply(this, arguments));
  }

  _createClass(DropDownItem, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement("li", null, React.createElement("button", {
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