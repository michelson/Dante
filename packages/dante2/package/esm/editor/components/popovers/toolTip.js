import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import ReactDOM from 'react-dom';
import DanteTooltipColor from './color.js';
import { AnchorStyle } from '../../styled/menu.js';
import { RichUtils, getVisibleSelectionRect, Entity } from 'draft-js';
import { getSelection, getSelectionRect, getRelativeParent } from '../../utils/selection.js';
import { getCurrentBlock } from '../../model/index.js';
import Icons from '../icons.js';
import 'react-colorful';
import 'lodash';
import '@emotion/styled';
import 'polished';
import 'immutable';

var DanteTooltip = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteTooltip, _React$Component);
  var _super = _createSuper(DanteTooltip);
  function DanteTooltip(props) {
    var _this;
    _classCallCheck(this, DanteTooltip);
    _this = _super.call(this, props);
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
      var blockType = currentBlock.getType();
      // display tooltip only for unstyled

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
      var el = _this.dante_menu.current;
      var padd = el.offsetWidth / 2;
      var nativeSelection = getSelection(window);
      if (!nativeSelection.rangeCount) {
        return;
      }
      var selectionBoundary = getSelectionRect(nativeSelection);
      var parent = ReactDOM.findDOMNode(_this.props.editor);

      // hide if selected node is not in editor
      if (!_this.isDescendant(parent, nativeSelection.anchorNode)) {
        _this.hide();
        return;
      }
      var relativeParent = getRelativeParent(_this.dante_menu.current.parentElement);
      var toolbarHeight = _this.dante_menu.current.clientHeight;
      //const toolbarWidth = this.dante_menu.current.clientWidth;
      var relativeRect = (relativeParent || document.body).getBoundingClientRect();
      var selectionRect = getVisibleSelectionRect(window);
      if (!selectionRect || !relativeRect || !selectionBoundary) return;
      var top = selectionRect.top - relativeRect.top - toolbarHeight;
      //let left = selectionBoundary.left + selectionBoundary.width / 2 - padd
      var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - padd; // - (toolbarWidth / 2 ) + 10

      //let left = (selectionRect.left - relativeRect.left) + (selectionRect.width / 2)

      if (!top || !left) {
        return;
      }
      var tooltipArrowPosition = _this.state.tooltipArrowPosition;
      var crossedRightBorder = relativeRect.width - left - _this.dante_menu.current.clientWidth;
      var crossedLeftBorder = left;
      if (crossedLeftBorder < 0) {
        left = 10;
      }
      if (crossedRightBorder < 0) {
        left += crossedRightBorder - 10;
      }
      tooltipArrowPosition = selectionRect.left - left + selectionRect.width / 2;
      return _this.setState({
        show: true,
        tooltipArrowPosition: "".concat(tooltipArrowPosition, "px"),
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
      _this.props.onChange(_this.props.styles[k].toggle(_this.props.editorState, style[k]));
      //this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style))
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
      if (_this.state.show || _this.state.fixed) {
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
          minWidth: "200px"
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
      if (/^javascript:/.test(urlValue.trim())) return;
      var opts = {
        url: urlValue,
        showPopLinkOver: _this.props.showPopLinkOver,
        hidePopLinkOver: _this.props.hidePopLinkOver
      };
      var entityKey = Entity.create("LINK", "MUTABLE", opts);
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
      var editorState = _this.props.editorState;
      var contentState = editorState.getCurrentContent();
      var startKey = editorState.getSelection().getStartKey();
      var startOffset = editorState.getSelection().getStartOffset();
      var blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      var linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      var url = '';
      if (linkKey) {
        var linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      return url;
    });
    _defineProperty(_assertThisInitialized(_this), "linkBlock", function () {
      return _this.props.widget_options.block_types.find(function (o) {
        return o.type === "link";
      });
    });
    _defineProperty(_assertThisInitialized(_this), "stickyStyle", function () {
      return {
        position: "sticky",
        top: "0px",
        left: "0px"
      };
    });
    _defineProperty(_assertThisInitialized(_this), "isSticky", function () {
      if (_this.state.sticky) return true;
      if (typeof window === "undefined") return;
      var x = window.matchMedia("(max-width: 700px)");
      if (x.matches) return true;
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement(AnchorStyle, {
        id: "dante-menu",
        ref: _this.dante_menu,
        className: "dante-menu ".concat(_this.displayActiveMenu(), " ").concat(_this.displayLinkMode(), " ").concat(_this.isSticky() ? "dante-sticky-menu" : ""),
        style: _this.getPosition(),
        arrowPosition: _this.state.tooltipArrowPosition
      }, _this.linkBlock() && _this.displayLinkMode() ? /*#__PURE__*/React.createElement("div", {
        className: "dante-menu-linkinput"
      }, /*#__PURE__*/React.createElement("input", {
        className: "dante-menu-input",
        ref: _this.dante_menu_input,
        placeholder: _this.linkBlock().placeholder,
        onKeyPress: _this.handleInputEnter,
        defaultValue: _this.getDefaultValue()
      }), /*#__PURE__*/React.createElement("div", {
        className: "dante-menu-button",
        onMouseDown: _this._disableLinkMode
      }, /*#__PURE__*/React.createElement("span", {
        className: "dante-icon"
      }, Icons["close"]()))) : null, /*#__PURE__*/React.createElement("ul", {
        className: "dante-menu-buttons",
        style: _this.state.menu_style
      }, _this.props.widget_options.block_types.map(function (item, i) {
        switch (item.type) {
          case "block":
            return /*#__PURE__*/React.createElement(DanteTooltipItem, {
              key: i,
              item: item,
              styles: _this.props.style,
              handleClick: _this._clickBlockHandler,
              editorState: _this.props.editorState,
              type: "block",
              currentStyle: _this.props.editorState.getCurrentInlineStyle
            });
          case "inline":
            return /*#__PURE__*/React.createElement(DanteTooltipItem, {
              key: i,
              item: item,
              type: "inline",
              editorState: _this.props.editorState,
              handleClick: _this._clickInlineHandler
            });
          case "color":
            return /*#__PURE__*/React.createElement(DanteTooltipColor, {
              key: i,
              styles: _this.props.styles,
              editorState: _this.props.editorState,
              enableLinkMode: _this._enableLinkMode,
              value: "#000",
              style_type: "color",
              handleClick: _this._clickBlockInlineStyle,
              show: _this.state.show
            });
          case "separator":
            return /*#__PURE__*/React.createElement(DanteMenuDivider, {
              key: i
            });
          case "link":
            return /*#__PURE__*/React.createElement(DanteTooltipLink, {
              key: i,
              editorState: _this.props.editorState,
              enableLinkMode: _this._enableLinkMode
            });
        }
      })));
    });
    _this.state = {
      link_mode: false,
      show: false,
      fixed: props.configTooltip.fixed,
      sticky: props.configTooltip.sticky,
      position: {},
      tooltipArrowPosition: 0,
      menu_style: {}
    };
    _this.dante_menu = /*#__PURE__*/React.createRef();
    _this.dante_menu_input = /*#__PURE__*/React.createRef();
    return _this;
  }
  return _createClass(DanteTooltip);
}(React.Component);
var DanteMenuDivider = function DanteMenuDivider() {
  return /*#__PURE__*/React.createElement("li", {
    className: "dante-menu-divider"
  });
};
var DanteTooltipItem = /*#__PURE__*/function (_React$Component2) {
  _inherits(DanteTooltipItem, _React$Component2);
  var _super2 = _createSuper(DanteTooltipItem);
  function DanteTooltipItem() {
    var _this2;
    _classCallCheck(this, DanteTooltipItem);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
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
      return /*#__PURE__*/React.createElement("li", {
        className: "dante-menu-button ".concat(this.activeClass()),
        onMouseDown: this.handleClick
      }, /*#__PURE__*/React.createElement("span", {
        className: "dante-icon"
      }, this.props.item.icon()));
    }
  }]);
  return DanteTooltipItem;
}(React.Component);
var DanteTooltipLink = /*#__PURE__*/function (_React$Component3) {
  _inherits(DanteTooltipLink, _React$Component3);
  var _super3 = _createSuper(DanteTooltipLink);
  function DanteTooltipLink() {
    var _this3;
    _classCallCheck(this, DanteTooltipLink);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _super3.call.apply(_super3, [this].concat(args));
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
      return /*#__PURE__*/React.createElement("li", {
        className: "dante-menu-button",
        onMouseDown: this.promptForLink
      }, /*#__PURE__*/React.createElement("span", {
        className: "dante-icon"
      }, Icons["link"]()));
    }
  }]);
  return DanteTooltipLink;
}(React.Component);
var DanteTooltipConfig = function DanteTooltipConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: "insert_tooltip",
    component: DanteTooltip,
    displayOnSelection: true,
    fixed: false,
    sticky: false,
    placement: "up",
    selectionElements: ["unstyled", "blockquote", "ordered-list", "unordered-list", "unordered-list-item", "ordered-list-item", "code-block", "header-one", "header-two", "header-three", "header-four", "footer", "column", "jumbo"],
    widget_options: {
      placeholder: "type a url",
      block_types: [{
        label: "p",
        style: "unstyled",
        icon: Icons.bold
      }, {
        label: "h2",
        style: "header-one",
        type: "block",
        icon: Icons.h1
      }, {
        label: "h3",
        style: "header-two",
        type: "block",
        icon: Icons.h2
      }, {
        label: "h4",
        style: "header-three",
        type: "block",
        icon: Icons.h3
      }, {
        type: "separator"
      }, {
        label: "color",
        type: "color"
      }, {
        type: "link"
      }, {
        label: "blockquote",
        style: "blockquote",
        type: "block",
        icon: Icons.blockquote
      }, {
        type: "separator"
      }, {
        label: "insertunorderedlist",
        style: "unordered-list-item",
        type: "block",
        icon: Icons.insertunorderedlist
      }, {
        label: "insertorderedlist",
        style: "ordered-list-item",
        type: "block",
        icon: Icons.insertunorderedlist
      }, {
        type: "separator"
      }, {
        label: "code",
        style: "code-block",
        type: "block",
        icon: Icons.code
      }, {
        label: "bold",
        style: "BOLD",
        type: "inline",
        icon: Icons.bold
      }, {
        label: "italic",
        style: "ITALIC",
        type: "inline",
        icon: Icons.italic
      }]
    }
  };
  return Object.assign(config, options);
};

export { DanteTooltipConfig, DanteTooltip as default };
