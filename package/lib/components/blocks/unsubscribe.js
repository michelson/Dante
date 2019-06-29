"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _commons = require("./commons.js");

var _reactColor = require("react-color");

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var UnsubscribeBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UnsubscribeBlock, _React$Component);

  function UnsubscribeBlock(props) {
    var _this;

    _classCallCheck(this, UnsubscribeBlock);

    _this = _possibleConstructorReturn(this, (UnsubscribeBlock.__proto__ || Object.getPrototypeOf(UnsubscribeBlock)).call(this, props));

    var existing_data = _this.props.block.getData().toJS();

    _this.state = {
      enabled: false,
      link_name: "Unsuscribe",
      displayPopOver: false,
      data: _this.props.blockProps.data.toJS(),
      buttonStyle: existing_data.buttonStyle || _this.defaultStyle(),
      city: "Jackson Inc.",
      address: "Paupio 46, Vilnius",
      country: "Lithuania",
      notice: "You received this email because you signed up on our website or made purchase from us."
    };
    _this.placeholderRender = _this.placeholderRender.bind(_assertThisInitialized(_this));
    _this.hidePopover = _this.hidePopover.bind(_assertThisInitialized(_this));
    _this.setWrapperRef = _this.setWrapperRef.bind(_assertThisInitialized(_this));
    _this.handleClickOutside = _this.handleClickOutside.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.setButtonStyle = _this.setButtonStyle.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(UnsubscribeBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    /**
     * Set the wrapper ref
     */

  }, {
    key: "setWrapperRef",
    value: function setWrapperRef(node) {
      this.wrapperRef = node;
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(event) {
      if (this.wrapperRef && this.wrapperRef.refs.btn && !this.wrapperRef.refs.btn.contains(event.target) && !event.target.closest(".popover")) {
        this.hidePopover();
      }
    }
  }, {
    key: "updateData",
    value: function updateData() {
      (0, _commons.UpdateData)(this);
    }
  }, {
    key: "handleChange",
    value: function handleChange(data) {
      var _this2 = this;

      var updateData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.setState(data, function () {
        if (updateData) {
          _this2.updateData();
        }
      });
    }
  }, {
    key: "popoverTop",
    value: function popoverTop() {
      return _react.default.createElement("p", null);
      /*
      return (<Popover id="popover-positioned-top" title="Popover top">
                <ButtonControls
                  link_name={this.state.link_name}
                  handleChange={this.handleChange}
                  setButtonStyle={this.setButtonStyle}
                  buttonStyle={this.state.buttonStyle}
                  hidePopover={this.hidePopover}
                  ref={this.setWrapperRef}
                />
              </Popover>)*/
    }
  }, {
    key: "defaultStyle",
    value: function defaultStyle() {
      return {
        color: "#fff",
        backgroundColor: "#3498db",
        padding: "5px",
        display: "block",
        fontFamily: "Helvetica",
        fontSize: 13
      };
    }
  }, {
    key: "setButtonStyle",
    value: function setButtonStyle(args) {
      var a = Object.assign({}, this.state.buttonStyle, args);
      this.setState({
        buttonStyle: a
      }, this.updateData);
    }
  }, {
    key: "hidePopover",
    value: function hidePopover() {
      this.setState({
        displayPopOver: false
      });
    }
  }, {
    key: "placeholderRender",
    value: function placeholderRender() {
      if (this.props.block.text.length === 0) {
        return _react.default.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, _react.default.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, "write something"));
      }
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.props.block.getText().length);
      return _react.default.createElement("div", null, _react.default.createElement("hr", null), this.placeholderRender(), _react.default.createElement(_draftJs.EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })));
    }
  }]);

  return UnsubscribeBlock;
}(_react.default.Component);

exports.default = UnsubscribeBlock;

var ButtonControls =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(ButtonControls, _React$Component2);

  function ButtonControls(props) {
    var _this3;

    _classCallCheck(this, ButtonControls);

    _this3 = _possibleConstructorReturn(this, (ButtonControls.__proto__ || Object.getPrototypeOf(ButtonControls)).call(this, props));
    _this3.state = {
      open: false,
      fontsFamilies: ["Georgia", "Helvetica", "Tahoma", "Times", "Verdana"],
      fontSizes: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 44, 48, 52, 56, 60]
    };
    return _this3;
  }

  _createClass(ButtonControls, [{
    key: "handleChange",
    value: function handleChange(ev, field) {
      var updateData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      //ev.preventDefault()
      var data = _defineProperty({}, field, ev.currentTarget.value);

      console.log("updating ".concat(JSON.stringify(data)));
      this.props.handleChange(data, updateData);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", {
        key: "0",
        id: "button-edit"
      }, _react.default.createElement("a", {
        className: "close-popup",
        href: "#",
        onClick: function onClick(ev) {
          ev.preventDefault();

          _this4.props.hidePopover();
        }
      }, _react.default.createElement("svg", {
        className: "svgIcon-use",
        height: "19",
        viewBox: "0 0 19 19",
        width: "19"
      }, _react.default.createElement("path", {
        d: "M13.792 4.6l-4.29 4.29-4.29-4.29-.612.613 4.29 4.29-4.29 4.29.613.612 4.29-4.29 4.29 4.29.612-.613-4.29-4.29 4.29-4.29",
        fillRule: "evenodd"
      }))), _react.default.createElement("div", {
        className: "edit"
      }, _react.default.createElement("div", {
        className: "content-elements"
      }, _react.default.createElement("div", {
        className: "input-group"
      }, _react.default.createElement("span", {
        className: "input-group-addon",
        id: "link"
      }, _react.default.createElement("img", {
        className: "link",
        src: "images/icons/link.svg"
      })), _react.default.createElement("input", {
        className: "form-control",
        placeholder: "Add link to button",
        type: "text",
        defaultValue: this.props.link_name,
        onChange: function onChange(ev) {
          _this4.handleChange(ev, "link_name");
        },
        onBlur: function onBlur(ev) {
          _this4.handleChange(ev, "link_name", true);
        }
      })), _react.default.createElement("div", {
        className: "input-group text-style"
      }, _react.default.createElement("div", {
        className: "input-group-btn"
      }, _react.default.createElement("div", {
        className: "btn-group"
      }, _react.default.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn dropdown-toggle",
        "data-toggle": "dropdown",
        id: "button-font-color",
        ref: "btn",
        type: "button"
      }, _react.default.createElement("span", {
        className: "color-select",
        style: {
          background: this.props.buttonStyle.color
        }
      })), _react.default.createElement("ul", {
        "aria-labelledby": "button-font-color",
        className: "dropdown-menu color-picker"
      }, _react.default.createElement("li", null, _react.default.createElement(_reactColor.SketchPicker, {
        color: this.props.buttonStyle.color,
        presetColors: [],
        onChangeComplete: function onChangeComplete(color, ev) {
          _this4.props.setButtonStyle({
            color: color.hex
          });
        }
      })))), _react.default.createElement("div", {
        className: "btn-group"
      }, _react.default.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn dropdown-toggle",
        "data-toggle": "dropdown",
        id: "button-font-size",
        type: "button"
      }, this.props.buttonStyle.fontSize, _react.default.createElement("span", {
        className: "caret"
      })), _react.default.createElement("ul", {
        "aria-labelledby": "button-font-size",
        className: "dropdown-menu"
      }, this.state.fontSizes.map(function (o, i) {
        return _react.default.createElement("li", {
          key: "font-size-".concat(i)
        }, _react.default.createElement("a", {
          href: "#",
          onClick: function onClick(ev) {
            ev.preventDefault();

            _this4.props.setButtonStyle({
              fontSize: o
            });
          }
        }, o));
      })))), _react.default.createElement("div", {
        className: "dropdown font-select"
      }, _react.default.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn dropdown-toggle",
        "data-toggle": "dropdown",
        id: "dropdownMenu1",
        type: "button"
      }, _react.default.createElement("span", {
        className: "selected"
      }, this.props.buttonStyle.fontFamily), _react.default.createElement("span", {
        className: "caret"
      })), _react.default.createElement("ul", {
        "aria-labelledby": "dropdownMenu1",
        className: "dropdown-menu"
      }, this.state.fontsFamilies.map(function (o, i) {
        return _react.default.createElement("li", {
          key: "font-family-".concat(i)
        }, _react.default.createElement("a", {
          href: "#",
          onClick: function onClick(ev) {
            ev.preventDefault();

            _this4.props.setButtonStyle({
              fontFamily: o
            });
          }
        }, o));
      })))))));
    }
  }]);

  return ButtonControls;
}(_react.default.Component);