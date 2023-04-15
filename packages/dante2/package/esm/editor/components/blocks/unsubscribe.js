import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, f as _assertThisInitialized, e as _defineProperty } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { UpdateData } from './commons.js';
import { HexColorPicker } from 'react-colorful';
import { EditorBlock } from 'draft-js';
import '../../model/index.js';
import 'immutable';

var UnsubscribeBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(UnsubscribeBlock, _React$Component);
  var _super = _createSuper(UnsubscribeBlock);
  function UnsubscribeBlock(props) {
    var _this;
    _classCallCheck(this, UnsubscribeBlock);
    _this = _super.call(this, props);
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
      UpdateData(this);
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
      return /*#__PURE__*/React.createElement("p", null);
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
        return /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, "write something"));
      }
    }
  }, {
    key: "render",
    value: function render() {
      console.log(this.props.block.getText().length);
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("hr", null), this.placeholderRender(), /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })));
    }
  }]);
  return UnsubscribeBlock;
}(React.Component);
/*#__PURE__*/(function (_React$Component2) {
  _inherits(ButtonControls, _React$Component2);
  var _super2 = _createSuper(ButtonControls);
  function ButtonControls(props) {
    var _this3;
    _classCallCheck(this, ButtonControls);
    _this3 = _super2.call(this, props);
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
      return /*#__PURE__*/React.createElement("div", {
        key: "0",
        id: "button-edit"
      }, /*#__PURE__*/React.createElement("a", {
        className: "close-popup",
        href: "#",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this4.props.hidePopover();
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "svgIcon-use",
        height: "19",
        viewBox: "0 0 19 19",
        width: "19"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M13.792 4.6l-4.29 4.29-4.29-4.29-.612.613 4.29 4.29-4.29 4.29.613.612 4.29-4.29 4.29 4.29.612-.613-4.29-4.29 4.29-4.29",
        fillRule: "evenodd"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "edit"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content-elements"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/React.createElement("span", {
        className: "input-group-addon",
        id: "link"
      }, /*#__PURE__*/React.createElement("img", {
        className: "link",
        src: "images/icons/link.svg"
      })), /*#__PURE__*/React.createElement("input", {
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
      })), /*#__PURE__*/React.createElement("div", {
        className: "input-group text-style"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-btn"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn-group"
      }, /*#__PURE__*/React.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn dropdown-toggle",
        "data-toggle": "dropdown",
        id: "button-font-color",
        ref: "btn",
        type: "button"
      }, /*#__PURE__*/React.createElement("span", {
        className: "color-select",
        style: {
          background: this.props.buttonStyle.color
        }
      })), /*#__PURE__*/React.createElement("ul", {
        "aria-labelledby": "button-font-color",
        className: "dropdown-menu color-picker"
      }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(HexColorPicker, {
        color: this.props.buttonStyle.color,
        onChange: function onChange(color, ev) {
          _this4.props.setButtonStyle({
            color: color
          });
        }
      })))), /*#__PURE__*/React.createElement("div", {
        className: "btn-group"
      }, /*#__PURE__*/React.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn dropdown-toggle",
        "data-toggle": "dropdown",
        id: "button-font-size",
        type: "button"
      }, this.props.buttonStyle.fontSize, /*#__PURE__*/React.createElement("span", {
        className: "caret"
      })), /*#__PURE__*/React.createElement("ul", {
        "aria-labelledby": "button-font-size",
        className: "dropdown-menu"
      }, this.state.fontSizes.map(function (o, i) {
        return /*#__PURE__*/React.createElement("li", {
          key: "font-size-".concat(i)
        }, /*#__PURE__*/React.createElement("a", {
          href: "#",
          onClick: function onClick(ev) {
            ev.preventDefault();
            _this4.props.setButtonStyle({
              fontSize: o
            });
          }
        }, o));
      })))), /*#__PURE__*/React.createElement("div", {
        className: "dropdown font-select"
      }, /*#__PURE__*/React.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn dropdown-toggle",
        "data-toggle": "dropdown",
        id: "dropdownMenu1",
        type: "button"
      }, /*#__PURE__*/React.createElement("span", {
        className: "selected"
      }, this.props.buttonStyle.fontFamily), /*#__PURE__*/React.createElement("span", {
        className: "caret"
      })), /*#__PURE__*/React.createElement("ul", {
        "aria-labelledby": "dropdownMenu1",
        className: "dropdown-menu"
      }, this.state.fontsFamilies.map(function (o, i) {
        return /*#__PURE__*/React.createElement("li", {
          key: "font-family-".concat(i)
        }, /*#__PURE__*/React.createElement("a", {
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
})(React.Component);

export { UnsubscribeBlock as default };
