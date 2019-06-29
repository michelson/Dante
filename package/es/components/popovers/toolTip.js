function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDOM from 'react-dom';
import DanteTooltipColor from './color';
import { AnchorStyle } from '../../styled/menu'; //import DanteTooltipList from './select'

import { getVisibleSelectionRect, Entity, RichUtils } from 'draft-js';
import { getSelectionRect, getSelection, getRelativeParent } from "../../utils/selection.js";
import { getCurrentBlock } from '../../model/index.js';
import Icons from "../icons.js";

var DanteTooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DanteTooltip, _React$Component);

  function DanteTooltip(props) {
    var _this;

    _classCallCheck(this, DanteTooltip);

    _this = _possibleConstructorReturn(this, (DanteTooltip.__proto__ || Object.getPrototypeOf(DanteTooltip)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_clickInlineHandler", function (ev, style) {
      ev.preventDefault();

      _this.props.onChange(RichUtils.toggleInlineStyle(_this.props.editorState, style));

      _this.callRelocate();
    });

    _defineProperty(_assertThisInitialized(_this), "display", function (b) {
      if (b) {
        return _this.show();
      } else {
        return _this.hide();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      return _this.setState({
        show: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      return _this.setState({
        link_mode: false,
        show: false,
        menu_style: {}
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPosition", function (coords) {
      return _this.setState({
        position: coords
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isDescendant", function (parent, child) {
      var node = child.parentNode;

      while (node !== null) {
        if (node === parent) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowWidth", function () {});

    _defineProperty(_assertThisInitialized(_this), "relocate", function () {
      // no position needs to be set
      if (_this.state.sticky) {
        return _this.handleWindowWidth();
      }

      var currentBlock = getCurrentBlock(_this.props.editorState);
      var blockType = currentBlock.getType(); // display tooltip only for unstyled

      if (_this.props.configTooltip.selectionElements.indexOf(blockType) < 0) {
        _this.hide();

        return;
      }

      if (_this.state.link_mode) {
        return;
      }

      if (!_this.state.show) {
        return;
      }

      var el = _this.refs.dante_menu;
      var padd = el.offsetWidth / 2;
      var nativeSelection = getSelection(window);

      if (!nativeSelection.rangeCount) {
        return;
      }

      var selectionBoundary = getSelectionRect(nativeSelection);
      var parent = ReactDOM.findDOMNode(_this.props.editor); // hide if selected node is not in editor

      if (!_this.isDescendant(parent, nativeSelection.anchorNode)) {
        _this.hide();

        return;
      }

      var relativeParent = getRelativeParent(_this.refs.dante_menu.parentElement);
      var toolbarHeight = _this.refs.dante_menu.clientHeight; //const toolbarWidth = this.refs.dante_menu.clientWidth;

      var relativeRect = (relativeParent || document.body).getBoundingClientRect();
      var selectionRect = getVisibleSelectionRect(window);
      if (!selectionRect || !relativeRect || !selectionBoundary) return;
      var top = selectionRect.top - relativeRect.top - toolbarHeight; //let left = selectionBoundary.left + selectionBoundary.width / 2 - padd

      var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - padd; // - (toolbarWidth / 2 ) + 10
      //let left = (selectionRect.left - relativeRect.left) + (selectionRect.width / 2)

      if (!top || !left) {
        return;
      }

      return _this.setState({
        show: true,
        position: {
          left: left,
          top: top
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_clickBlockHandler", function (ev, style) {
      ev.preventDefault();

      _this.props.onChange(RichUtils.toggleBlockType(_this.props.editorState, style));

      return setTimeout(function () {
        return _this.relocate();
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "_clickBlockInlineStyle", function (ev, style) {
      var k = Object.keys(style)[0];

      _this.props.onChange(_this.props.styles[k].toggle(_this.props.editorState, style[k])); //this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style))


      return setTimeout(function () {
        return _this.relocate();
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "displayLinkMode", function () {
      if (_this.state.link_mode) {
        return "dante-menu--linkmode";
      } else {
        return "";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "displayActiveMenu", function () {
      if (_this.state.show) {
        return "dante-menu--active";
      } else {
        return "";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_enableLinkMode", function (ev) {
      ev.preventDefault();
      return _this.setState({
        link_mode: true,
        menu_style: {
          minWidth: '200px'
        }
      }, _this.callRelocate);
    });

    _defineProperty(_assertThisInitialized(_this), "_disableLinkMode", function (ev) {
      ev.preventDefault();
      return _this.setState({
        link_mode: false,
        url: "",
        menu_style: {}
      }, _this.callRelocate);
    });

    _defineProperty(_assertThisInitialized(_this), "callRelocate", function () {
      setTimeout(function () {
        return _this.relocate();
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "hideMenu", function () {
      return _this.hide();
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputEnter", function (e) {
      if (e.which === 13) {
        return _this.confirmLink(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "confirmLink", function (e) {
      e.preventDefault();
      var editorState = _this.props.editorState;
      var urlValue = e.currentTarget.value;
      var selection = editorState.getSelection();
      var opts = {
        url: urlValue,
        showPopLinkOver: _this.props.showPopLinkOver,
        hidePopLinkOver: _this.props.hidePopLinkOver
      };
      var entityKey = Entity.create('LINK', 'MUTABLE', opts); //contentState.createEntity('LINK', 'MUTABLE', opts)

      if (selection.isCollapsed()) {
        return;
      }

      _this.props.onChange(RichUtils.toggleLink(editorState, selection, entityKey));

      return _this._disableLinkMode(e);
    });

    _defineProperty(_assertThisInitialized(_this), "getPosition", function () {
      if (_this.isSticky()) return _this.stickyStyle();
      var pos = _this.state.position;
      return pos;
    });

    _defineProperty(_assertThisInitialized(_this), "inlineItems", function () {
      return _this.props.widget_options.block_types.filter(function (o) {
        return o.type === "inline";
      });
    });

    _defineProperty(_assertThisInitialized(_this), "blockItems", function () {
      return _this.props.widget_options.block_types.filter(function (o) {
        return o.type === "block";
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultValue", function () {
      if (_this.refs.dante_menu_input) {
        _this.refs.dante_menu_input.value = "";
      }

      var currentBlock = getCurrentBlock(_this.props.editorState);

      var selection = _this.props.editor.state.editorState.getSelection();

      var contentState = _this.props.editorState.getCurrentContent();

      var selectedEntity = null;
      var defaultUrl = null;
      return currentBlock.findEntityRanges(function (character) {
        var entityKey = character.getEntity();
        selectedEntity = entityKey;
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
      }, function (start, end) {
        var selStart = selection.getAnchorOffset();
        var selEnd = selection.getFocusOffset();

        if (selection.getIsBackward()) {
          selStart = selection.getFocusOffset();
          selEnd = selection.getAnchorOffset();
        }

        if (start === selStart && end === selEnd) {
          defaultUrl = contentState.getEntity(selectedEntity).getData().url;
          return _this.refs.dante_menu_input.value = defaultUrl;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "linkBlock", function () {
      return _this.props.widget_options.block_types.find(function (o) {
        return o.type === "link";
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stickyStyle", function () {
      return {
        position: "fixed",
        top: "0px",
        left: "0px"
      };
    });

    _defineProperty(_assertThisInitialized(_this), "isSticky", function () {
      if (_this.state.sticky) return true;
      var x = window.matchMedia("(max-width: 700px)");
      if (x.matches) return true;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return React.createElement(AnchorStyle, {
        id: "dante-menu",
        ref: "dante_menu",
        className: "dante-menu ".concat(_this.displayActiveMenu(), " ").concat(_this.displayLinkMode(), " ").concat(_this.isSticky() ? 'dante-sticky-menu' : ''),
        style: _this.getPosition()
      }, _this.linkBlock() ? React.createElement("div", {
        className: "dante-menu-linkinput"
      }, React.createElement("input", {
        className: "dante-menu-input",
        ref: "dante_menu_input",
        placeholder: _this.linkBlock().placeholder,
        onKeyPress: _this.handleInputEnter //defaultValue={ this.getDefaultValue() }

      }), React.createElement("div", {
        className: "dante-menu-button",
        onMouseDown: _this._disableLinkMode
      }, React.createElement("span", {
        className: 'dante-icon'
      }, Icons['close']()))) : null, React.createElement("ul", {
        className: "dante-menu-buttons",
        style: _this.state.menu_style
      }, _this.props.widget_options.block_types.map(function (item, i) {
        switch (item.type) {
          case "block":
            return React.createElement(DanteTooltipItem, {
              key: i,
              item: item,
              styles: _this.props.style,
              handleClick: _this._clickBlockHandler,
              editorState: _this.props.editorState,
              type: "block",
              currentStyle: _this.props.editorState.getCurrentInlineStyle
            });
            break;

          case "inline":
            return React.createElement(DanteTooltipItem, {
              key: i,
              item: item,
              type: "inline",
              editorState: _this.props.editorState,
              handleClick: _this._clickInlineHandler
            });
            break;

          case "color":
            return React.createElement(DanteTooltipColor, {
              key: i,
              styles: _this.props.styles,
              editorState: _this.props.editorState,
              enableLinkMode: _this._enableLinkMode,
              value: '#000',
              style_type: "color",
              handleClick: _this._clickBlockInlineStyle,
              show: _this.state.show
            });
            break;

          case "separator":
            return React.createElement(DanteMenuDivider, {
              key: i
            });
            break;

          case "link":
            return React.createElement(DanteTooltipLink, {
              key: i,
              editorState: _this.props.editorState,
              enableLinkMode: _this._enableLinkMode
            });
            break;

          default:
            break;
        }
      })));
    });

    _this.state = {
      link_mode: false,
      show: false,
      sticky: props.configTooltip.sticky,
      position: {},
      menu_style: {}
    };
    return _this;
  }

  return DanteTooltip;
}(React.Component);

var DanteMenuDivider = function DanteMenuDivider() {
  return React.createElement("li", {
    className: "dante-menu-divider"
  });
};

var DanteTooltipItem =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DanteTooltipItem, _React$Component2);

  function DanteTooltipItem() {
    var _ref;

    var _this2;

    _classCallCheck(this, DanteTooltipItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_ref = DanteTooltipItem.__proto__ || Object.getPrototypeOf(DanteTooltipItem)).call.apply(_ref, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "handleClick", function (ev) {
      return _this2.props.handleClick(ev, _this2.props.item.style);
    });

    _defineProperty(_assertThisInitialized(_this2), "activeClass", function () {
      if (_this2.isActive()) {
        return "active";
      } else {
        return "";
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "isActive", function () {
      if (_this2.props.type === "block") {
        return _this2.activeClassBlock();
      } else {
        return _this2.activeClassInline();
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "activeClassInline", function () {
      if (!_this2.props.editorState || !_this2.props.editorState.getCurrentContent().hasText()) {
        return;
      }

      return _this2.props.editorState.getCurrentInlineStyle().has(_this2.props.item.style);
    });

    _defineProperty(_assertThisInitialized(_this2), "activeClassBlock", function () {
      if (!_this2.props.editorState || !_this2.props.editorState.getCurrentContent().hasText()) {
        return;
      }

      var selection = _this2.props.editorState.getSelection();

      var blockKey = _this2.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey());

      if (!blockKey) return;
      var blockType = blockKey.getType();
      return _this2.props.item.style === blockType;
    });

    return _this2;
  }

  _createClass(DanteTooltipItem, [{
    key: "render",
    value: function render() {
      return React.createElement("li", {
        className: "dante-menu-button ".concat(this.activeClass()),
        onMouseDown: this.handleClick
      }, React.createElement("span", {
        className: 'dante-icon'
      }, this.props.item.icon()));
    }
  }]);

  return DanteTooltipItem;
}(React.Component);

var DanteTooltipLink =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(DanteTooltipLink, _React$Component3);

  function DanteTooltipLink() {
    var _ref2;

    var _this3;

    _classCallCheck(this, DanteTooltipLink);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_ref2 = DanteTooltipLink.__proto__ || Object.getPrototypeOf(DanteTooltipLink)).call.apply(_ref2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this3), "promptForLink", function (ev) {
      var selection = _this3.props.editorState.getSelection();

      if (!selection.isCollapsed()) {
        return _this3.props.enableLinkMode(ev);
      }
    });

    _this3.promptForLink = _this3.promptForLink.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(DanteTooltipLink, [{
    key: "render",
    value: function render() {
      return React.createElement("li", {
        className: "dante-menu-button",
        onMouseDown: this.promptForLink
      }, React.createElement("span", {
        className: 'dante-icon'
      }, Icons['link']()));
    }
  }]);

  return DanteTooltipLink;
}(React.Component);

export default DanteTooltip;
export var DanteTooltipConfig = function DanteTooltipConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: 'insert_tooltip',
    component: DanteTooltip,
    displayOnSelection: true,
    sticky: false,
    selectionElements: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block", 'header-one', 'header-two', 'header-three', 'header-four', 'footer', 'column', 'jumbo'],
    widget_options: {
      placeholder: "type a url",
      block_types: [{
        label: 'p',
        style: 'unstyled',
        icon: Icons.bold
      }, {
        label: 'h2',
        style: 'header-one',
        type: "block",
        icon: Icons.h1
      }, {
        label: 'h3',
        style: 'header-two',
        type: "block",
        icon: Icons.h2
      }, {
        label: 'h4',
        style: 'header-three',
        type: "block",
        icon: Icons.h3
      }, {
        type: "separator"
      }, {
        label: 'color',
        type: "color"
      }, {
        type: "link"
      }, {
        label: 'blockquote',
        style: 'blockquote',
        type: "block",
        icon: Icons.blockquote
      }, {
        type: "separator"
      }, {
        label: 'insertunorderedlist',
        style: 'unordered-list-item',
        type: "block",
        icon: Icons.insertunorderedlist
      }, {
        label: 'insertorderedlist',
        style: 'ordered-list-item',
        type: "block",
        icon: Icons.insertunorderedlist
      }, {
        type: "separator"
      }, {
        label: 'code',
        style: 'code-block',
        type: "block",
        icon: Icons.code
      }, {
        label: 'bold',
        style: 'BOLD',
        type: "inline",
        icon: Icons.bold
      }, {
        label: 'italic',
        style: 'ITALIC',
        type: "inline",
        icon: Icons.italic
      }]
    }
  };
  return Object.assign(config, options);
};