import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React, { Component } from 'react';
import 'react-dom';
import { HexColorPicker } from 'react-colorful';
import { EditorBlock } from 'draft-js';
import { Manager, Reference, Popper } from 'react-popper';
import { link } from '../icons.js';
import { UpdateData } from './commons.js';
import '../../model/index.js';
import 'immutable';

var ButtonBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(ButtonBlock, _React$Component);
  var _super = _createSuper(ButtonBlock);
  function ButtonBlock(props) {
    var _this;
    _classCallCheck(this, ButtonBlock);
    _this = _super.call(this, props);
    /**
     * Set the wrapper ref
     */
    _defineProperty(_assertThisInitialized(_this), "setWrapperRef", function (node) {
      _this.wrapperRef = node;
    });
    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      if (_this.wrapperRef && !_this.wrapperRef.contains(event.target) && !event.target.closest(".popover")) {
        _this.hidePopover();
      }
    });
    // will update block state
    _defineProperty(_assertThisInitialized(_this), "updateData", function () {
      UpdateData(_assertThisInitialized(_this));
    });
    _defineProperty(_assertThisInitialized(_this), "changeLabel", function (ev) {
      _this.setState({
        label: ev.currentTarget.value
      }, _this.updateData);
    });
    _defineProperty(_assertThisInitialized(_this), "changeHref", function (ev) {
      _this.setState({
        href: ev.currentTarget.value
      }, _this.updateData);
    });
    _defineProperty(_assertThisInitialized(_this), "setButtonStyle", function (args) {
      var a = Object.assign({}, _this.state.buttonStyle, args);
      _this.setState({
        buttonStyle: a
      }, _this.updateData);
    });
    _defineProperty(_assertThisInitialized(_this), "defaultStyle", function () {
      return {
        color: "#fff",
        backgroundColor: "#3498db",
        padding: "6px 12px",
        display: "inline-block",
        fontFamily: "Helvetica",
        fontSize: 13,
        "float": "none"
      };
    });
    _defineProperty(_assertThisInitialized(_this), "containerStyle", function () {
      return {
        textAlign: "left",
        margin: "0px 13px 0px 0px"
      };
    });
    _defineProperty(_assertThisInitialized(_this), "setPosition", function (direction) {
      switch (direction) {
        case "left":
          return Object.assign({}, _this.state.containerStyle, {
            textAlign: 'left'
          });
        case "right":
          return Object.assign({}, _this.state.containerStyle, {
            textAlign: 'right'
          });
        case "center":
          return Object.assign({}, _this.state.containerStyle, {
            textAlign: 'center'
          });
        default:
          return _this.containerStyle();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "setFill", function (fill) {
      switch (fill) {
        case "fill":
          return Object.assign({}, _this.state.buttonStyle, {
            color: _this.state.buttonStyle.backgroundColor,
            backgroundColor: _this.state.buttonStyle.color,
            border: "1px solid ".concat(_this.state.buttonStyle.color)
          });
        case "stroke":
          return Object.assign({}, _this.state.buttonStyle, {
            color: _this.state.buttonStyle.backgroundColor,
            backgroundColor: _this.state.buttonStyle.color,
            border: "1px solid ".concat(_this.state.buttonStyle.backgroundColor)
          });
        default:
          return _this.defaultStyle();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleFloat", function (direction) {
      console.log("direction ".concat(direction));
      _this.setState({
        containerStyle: _this.setPosition(direction),
        "float": direction
      }, function () {
        _this.updateData();
        // this will toggle popover on position change
        _this.setState({
          displayPopOver: false
        }, function () {
          setTimeout(function () {
            _this.setState({
              displayPopOver: true
            });
          }, 300);
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleFill", function (fill) {
      console.log("fill ".concat(fill));
      _this.setState({
        buttonStyle: _this.setFill(fill),
        fill: fill
      }, _this.updateData);
    });
    _defineProperty(_assertThisInitialized(_this), "getBorderValue", function (border) {
      switch (border) {
        case "medium":
          return "6px";
        case "large":
          return "40px";
        default:
          return "0px";
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleBorder", function (border) {
      console.log("border ".concat(border));
      var borderStyle = _this.getBorderValue(border);
      _this.setState({
        border: border
      }, function () {
        _this.setButtonStyle({
          borderRadius: borderStyle
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "popoverTop", function () {
      return /*#__PURE__*/React.createElement(ButtonControls, {
        changeLabel: _this.changeLabel,
        label: _this.state.label,
        changeHref: _this.changeHref,
        handleFloat: _this.handleFloat,
        handleFill: _this.handleFill,
        handleBorder: _this.handleBorder,
        "float": _this.state["float"],
        border: _this.state.border,
        toggle: _this.toggle,
        fill: _this.state.fill,
        href: _this.state.href,
        blockProps: _this.props.blockProps,
        buttonStyle: _this.state.buttonStyle,
        setButtonStyle: _this.setButtonStyle
      });
    });
    _defineProperty(_assertThisInitialized(_this), "togglePopUp", function (ev) {
      ev.preventDefault();
      _this.setState({
        displayPopOver: !_this.state.displayPopOver
      }); //, this.updateData );
      //this.setState({enabled: !this.state.enabled})
    });
    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      _this.setState({
        displayPopOver: !_this.state.displayPopOver
      }); //, this.updateData);
    });
    _defineProperty(_assertThisInitialized(_this), "hidePopover", function () {
      _this.setState({
        displayPopOver: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, "write something"));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      // onClick={this.togglePopUp}
      // onMouseOver={this.props.blockProps.disableEditable}
      // onMouseOut={this.props.blockProps.enableEditable}
      return /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%',
          margin: "18px 0px 47px 0px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        ref: _this.setWrapperRef,
        style: _this.state.containerStyle
      }, /*#__PURE__*/React.createElement(Manager, null, /*#__PURE__*/React.createElement(Reference, null, function (_ref) {
        var _React$createElement;
        var ref = _ref.ref;
        return /*#__PURE__*/React.createElement("a", (_React$createElement = {
          href: _this.href,
          className: "btn",
          onClick: _this.togglePopUp,
          ref: ref,
          style: _this.state.buttonStyle
        }, _defineProperty(_React$createElement, "href", _this.state.href), _defineProperty(_React$createElement, "onMouseOver", _this._showPopLinkOver), _defineProperty(_React$createElement, "onMouseOut", _this._hidePopLinkOver), _React$createElement), /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, _this.props)));
      }), _this.state.displayPopOver ? /*#__PURE__*/React.createElement(Popper, {
        placement: "top"
      }, function (_ref2) {
        var ref = _ref2.ref,
          style = _ref2.style,
          placement = _ref2.placement,
          arrowProps = _ref2.arrowProps;
        return /*#__PURE__*/React.createElement("div", {
          ref: ref,
          style: style,
          className: "dante--popover",
          "data-placement": placement
        }, /*#__PURE__*/React.createElement("h3", {
          className: "popover-title"
        }, "Popper element"), /*#__PURE__*/React.createElement(ButtonControls, {
          changeLabel: _this.changeLabel,
          label: _this.state.label,
          changeHref: _this.changeHref,
          handleFloat: _this.handleFloat,
          handleFill: _this.handleFill,
          handleBorder: _this.handleBorder,
          "float": _this.state["float"],
          border: _this.state.border,
          toggle: _this.toggle,
          fill: _this.state.fill,
          href: _this.state.href,
          blockProps: _this.props.blockProps,
          buttonStyle: _this.state.buttonStyle,
          setButtonStyle: _this.setButtonStyle
        }), /*#__PURE__*/React.createElement("div", {
          ref: arrowProps.ref,
          style: arrowProps.style
        }));
      }) : null)));
    });
    var existing_data = _this.props.block.getData().toJS();
    _this.state = {
      enabled: false,
      label: existing_data.label || "click me",
      href: existing_data.href || "",
      data: _this.props.blockProps.data.toJS(),
      containerStyle: existing_data.containerStyle || _this.containerStyle(),
      buttonStyle: existing_data.buttonStyle || _this.defaultStyle(),
      "float": existing_data["float"] || "left",
      border: existing_data.border || "default",
      fill: existing_data.fill || "fill",
      displayPopOver: false
    };
    return _this;
  }
  _createClass(ButtonBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }]);
  return ButtonBlock;
}(React.Component);
var ButtonControls = /*#__PURE__*/function (_React$Component2) {
  _inherits(ButtonControls, _React$Component2);
  var _super2 = _createSuper(ButtonControls);
  function ButtonControls(props) {
    var _this2;
    _classCallCheck(this, ButtonControls);
    _this2 = _super2.call(this, props);
    _defineProperty(_assertThisInitialized(_this2), "changeLabel", function (ev) {
      console.log(ev);
      _this2.props.changeLabel(ev);
    });
    _defineProperty(_assertThisInitialized(_this2), "changeHref", function (ev) {
      console.log(ev);
      _this2.props.changeHref(ev);
    });
    _defineProperty(_assertThisInitialized(_this2), "activeFloat", function (direction) {
      if (direction == _this2.props["float"]) {
        return "active";
      } else {
        return "";
      }
    });
    _defineProperty(_assertThisInitialized(_this2), "activeFill", function (fill) {
      if (fill == _this2.props.fill) {
        return "active";
      } else {
        return "";
      }
    });
    _defineProperty(_assertThisInitialized(_this2), "activeBorder", function (border) {
      if (border == _this2.props.border) {
        return "active";
      } else {
        return "";
      }
    });
    _this2.state = {
      open: false,
      fontsFamilies: ["Georgia", "Helvetica", "Tahoma", "Times", "Verdana"],
      fontSizes: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 44, 48, 52, 56, 60],
      fontColorPicker: false,
      buttonColorPicker: false
    };
    return _this2;
  }
  _createClass(ButtonControls, [{
    key: "render",
    value: function render() {
      var _this3 = this;
      return /*#__PURE__*/React.createElement("div", {
        className: "popover-content",
        contenteditable: "false"
      }, /*#__PURE__*/React.createElement("div", {
        className: "button-edit",
        onMouseOver: function onMouseOver(e) {
          _this3.props.blockProps.disableEditable();
        },
        onMouseOut: function onMouseOut(e) {
          _this3.setState({
            displayPopOver: false
          });
          _this3.props.blockProps.enableEditable();
        }
      }, /*#__PURE__*/React.createElement("a", {
        className: "close-popup",
        href: "#",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.toggle(ev);
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
      }, link()), /*#__PURE__*/React.createElement("input", {
        className: "form-control",
        placeholder: "Add link to button",
        type: "text",
        style: {
          width: '89%'
        },
        value: this.props.href,
        onChange: this.changeHref
      }))), /*#__PURE__*/React.createElement("div", {
        className: "design-settings"
      }, /*#__PURE__*/React.createElement("div", {
        "aria-label": "...",
        className: "btn-group btn-group-justified",
        id: "button-align",
        role: "group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeFloat('left')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleFloat("left");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "25",
        height: "12",
        viewBox: "0 0 25 12"
      }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        width: "25",
        height: "1",
        y: "11"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "13",
        height: "6",
        x: "1",
        y: "3",
        rx: ".5"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "25",
        height: "1"
      }))))), /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeFloat('right')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleFloat("right");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "25",
        height: "12",
        viewBox: "0 0 25 12"
      }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        width: "25",
        height: "1",
        y: "11"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "13",
        height: "6",
        x: "11",
        y: "3",
        rx: ".5"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "25",
        height: "1"
      }))))), /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeFloat('center')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleFloat("center");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "25",
        height: "12",
        viewBox: "0 0 25 12"
      }, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        width: "25",
        height: "1",
        y: "11"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "13",
        height: "6",
        x: "6",
        y: "3",
        rx: ".5"
      }), /*#__PURE__*/React.createElement("rect", {
        width: "25",
        height: "1"
      })))))), /*#__PURE__*/React.createElement("div", {
        "aria-label": "...",
        className: "btn-group btn-group-justified",
        id: "button-corners",
        role: "group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeBorder('default')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleBorder("default");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "43",
        height: "12",
        viewBox: "0 0 43 12"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M1,1 L1,11 L42,11 L42,1 L1,1 Z M43,0 L43,12 L0,12 L0,0 L43,0 Z"
      })))), /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeBorder('medium')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleBorder("medium");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "43",
        height: "12",
        viewBox: "0 0 43 12"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M3.5,1 C2.11928813,1 1,2.11928813 1,3.5 L1,8.5 C1,9.88071187 2.11928813,11 3.5,11 L39.5,11 C40.8807119,11 42,9.88071187 42,8.5 L42,3.5 C42,2.11928813 40.8807119,1 39.5,1 L3.5,1 Z M3.5,0 L39.5,0 C41.4329966,0 43,1.56700338 43,3.5 L43,8.5 C43,10.4329966 41.4329966,12 39.5,12 L3.5,12 C1.56700338,12 0,10.4329966 0,8.5 L0,3.5 C0,1.56700338 1.56700338,0 3.5,0 Z"
      })))), /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeBorder('large')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleBorder("large");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "43",
        height: "12",
        viewBox: "0 0 43 12"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M6,1 C3.23857625,1 1,3.23857625 1,6 C1,8.76142375 3.23857625,11 6,11 L37,11 C39.7614237,11 42,8.76142375 42,6 C42,3.23857625 39.7614237,1 37,1 L6,1 Z M6,0 L37,0 C40.3137085,0 43,2.6862915 43,6 C43,9.3137085 40.3137085,12 37,12 L6,12 C2.6862915,12 0,9.3137085 0,6 C0,2.6862915 2.6862915,0 6,0 Z"
      }))))), /*#__PURE__*/React.createElement("div", {
        "aria-label": "...",
        className: "btn-group btn-group-justified",
        id: "button-fill",
        role: "group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeFill('fill')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleFill("fill");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "79",
        height: "12",
        viewBox: "0 0 79 12"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "79",
        height: "12",
        rx: "2"
      })))), /*#__PURE__*/React.createElement("div", {
        className: "btn-group",
        role: "group"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-default ".concat(this.activeFill('stroke')),
        type: "button",
        onClick: function onClick(ev) {
          ev.preventDefault();
          _this3.props.handleFill("stroke");
        }
      }, /*#__PURE__*/React.createElement("svg", {
        className: "link",
        xmlns: "http://www.w3.org/2000/svg",
        width: "79",
        height: "12",
        viewBox: "0 0 79 12"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M2.5,1 C1.67157288,1 1,1.67157288 1,2.5 L1,9.5 C1,10.3284271 1.67157288,11 2.5,11 L76.5,11 C77.3284271,11 78,10.3284271 78,9.5 L78,2.5 C78,1.67157288 77.3284271,1 76.5,1 L2.5,1 Z M2.5,0 L76.5,0 C77.8807119,-2.77555756e-16 79,1.11928813 79,2.5 L79,9.5 C79,10.8807119 77.8807119,12 76.5,12 L2.5,12 C1.11928813,12 1.38777878e-16,10.8807119 0,9.5 L0,2.5 C-1.38777878e-16,1.11928813 1.11928813,2.77555756e-16 2.5,0 Z"
      }))))), /*#__PURE__*/React.createElement("div", {
        className: "input-group text-style"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-btn"
      }, /*#__PURE__*/React.createElement("div", {
        className: "btn-group"
      }, /*#__PURE__*/React.createElement("button", {
        "aria-expanded": "true",
        "aria-haspopup": "true",
        className: "btn",
        id: "button-font-color",
        onClick: function onClick(e) {
          _this3.setState({
            fontColorPicker: !_this3.state.fontColorPicker
          });
        },
        type: "button"
      }, /*#__PURE__*/React.createElement("span", {
        className: "color-select",
        style: {
          background: this.props.buttonStyle.color
        }
      })), this.state.fontColorPicker ? /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute"
        }
      }, /*#__PURE__*/React.createElement(HexColorPicker, {
        color: this.props.buttonStyle.color,
        onChange: function onChange(color, ev) {
          _this3.props.setButtonStyle({
            color: color
          });
        }
      })) : null), /*#__PURE__*/React.createElement("div", {
        className: "btn-group"
      }, /*#__PURE__*/React.createElement(Dropdown, {
        trigger: function trigger(ctx) {
          return /*#__PURE__*/React.createElement("button", {
            "aria-expanded": "true",
            "aria-haspopup": "true",
            className: "btn dropdown-toggle",
            id: "button-font-size",
            onClick: function onClick(e) {
              return ctx.toggle();
            },
            type: "button"
          }, _this3.props.buttonStyle.fontSize, /*#__PURE__*/React.createElement("span", {
            className: "caret"
          }));
        },
        target: function target(ctx) {
          return /*#__PURE__*/React.createElement("ul", {
            "aria-labelledby": "button-font-size",
            className: "dropdown-menu"
          }, _this3.state.fontSizes.map(function (o, i) {
            return /*#__PURE__*/React.createElement("li", {
              key: "font-size-".concat(i)
            }, /*#__PURE__*/React.createElement("a", {
              href: "#",
              onClick: function onClick(ev) {
                ev.preventDefault();
                _this3.props.setButtonStyle({
                  fontSize: o
                });
              }
            }, o));
          }));
        }
      }))), /*#__PURE__*/React.createElement(Dropdown, {
        trigger: function trigger(ctx) {
          return /*#__PURE__*/React.createElement("button", {
            "aria-expanded": "true",
            "aria-haspopup": "true",
            className: "btn dropdown-toggle",
            id: "dropdownMenu1",
            onClick: function onClick(e) {
              return ctx.toggle();
            },
            type: "button"
          }, /*#__PURE__*/React.createElement("span", {
            className: "selected"
          }, _this3.props.buttonStyle.fontFamily), /*#__PURE__*/React.createElement("span", {
            className: "caret"
          }));
        },
        target: function target(ctx) {
          return /*#__PURE__*/React.createElement("ul", {
            "aria-labelledby": "dropdownMenu1",
            className: "dropdown-menu"
          }, _this3.state.fontsFamilies.map(function (o, i) {
            return /*#__PURE__*/React.createElement("li", {
              key: "font-family-".concat(i)
            }, /*#__PURE__*/React.createElement("a", {
              href: "#",
              onClick: function onClick(ev) {
                ev.preventDefault();
                _this3.props.setButtonStyle({
                  fontFamily: o
                });
              }
            }, o));
          }));
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
        className: "btn",
        id: "button-font-color",
        onClick: function onClick(e) {
          _this3.setState({
            buttonColorPicker: !_this3.state.buttonColorPicker
          });
        },
        type: "button"
      }, /*#__PURE__*/React.createElement("span", {
        className: "color-select",
        style: {
          background: this.props.buttonStyle.backgroundColor
        }
      })), this.state.buttonColorPicker ? /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute"
        }
      }, /*#__PURE__*/React.createElement(SketchPicker, {
        color: this.props.buttonStyle.backgroundColor,
        onChangeComplete: function onChangeComplete(color, ev) {
          _this3.props.setButtonStyle({
            backgroundColor: color.hex
          });
        }
      })) : null)), /*#__PURE__*/React.createElement("input", {
        "aria-label": "...",
        className: "form-control",
        type: "text",
        value: this.props.buttonStyle.backgroundColor,
        onChange: function onChange(ev) {
          _this3.props.setButtonStyle({
            backgroundColor: ev.currentTarget.value
          });
        }
      }))))));
    }
  }]);
  return ButtonControls;
}(React.Component);
var Dropdown = /*#__PURE__*/function (_Component) {
  _inherits(Dropdown, _Component);
  var _super3 = _createSuper(Dropdown);
  function Dropdown(props) {
    var _this4;
    _classCallCheck(this, Dropdown);
    _this4 = _super3.call(this, props);
    _defineProperty(_assertThisInitialized(_this4), "handleClickOutside", function (event) {
      if (_this4.refs.el && !_this4.refs.el.contains(event.target)) {
        _this4.setState({
          open: false
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this4), "toggle", function (e) {
      _this4.setState({
        open: !_this4.state.open
      });
    });
    _this4.state = {
      open: false
    };
    return _this4;
  }
  _createClass(Dropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "dropdown font-select",
        ref: "el",
        style: {
          "float": "none"
        }
      }, this.props.trigger(this), this.state.open ? this.props.target(this) : null);
    }
  }]);
  return Dropdown;
}(Component);
var ButtonBlockConfig = function ButtonBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'button',
    type: 'button',
    block: ButtonBlock,
    icon: link,
    editable: true,
    renderable: true,
    breakOnContinuous: true,
    //wrapper_class: "graf graf--mixtapeEmbed",
    //selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "button"
    },
    options: {},
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
    }
  };
  return Object.assign(config, options);
};

export { ButtonBlockConfig, ButtonBlock as default };
