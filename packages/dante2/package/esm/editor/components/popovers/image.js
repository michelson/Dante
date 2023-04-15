import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import Icons from '../icons.js';
import { capitalize } from 'lodash';
import { getSelection, getRelativeParent } from '../../utils/selection.js';
import { getCurrentBlock } from '../../model/index.js';
import { AnchorStyle } from '../../styled/menu.js';
import 'immutable';
import 'draft-js';
import '@emotion/styled';
import 'polished';

var DanteImagePopover = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteImagePopover, _React$Component);
  var _super = _createSuper(DanteImagePopover);
  function DanteImagePopover(props) {
    var _this;
    _classCallCheck(this, DanteImagePopover);
    _this = _super.call(this, props);
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
        show: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "setPosition", function (coords) {
      return _this.setState({
        position: coords
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_toggleScaled", function (ev) {
      if (_this.state.scaled) {
        return _this.collapse();
      } else {
        return _this.scale();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "scale", function () {
      return _this.setState({
        scaled: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "collapse", function () {
      return _this.setState({
        scaled: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "relocate", function () {
      var editorState = _this.props.editorState;
      if (editorState.getSelection().isCollapsed()) {
        var currentBlock = getCurrentBlock(editorState);
        var blockType = currentBlock.getType();
        var nativeSelection = getSelection(window);
        if (!nativeSelection.rangeCount) {
          return;
        }
        _this.display(blockType === "image");
        if (blockType === "image") {
          var imageBoxNode = document.getElementsByClassName("is-selected")[0];
          var selectionRect = imageBoxNode.getBoundingClientRect();
          var el = _this.image_popover.current;
          var relativeParent = getRelativeParent(el.parentElement);
          var toolbarHeight = el.clientHeight;
          var toolbarWidth = el.clientWidth;
          var relativeRect = (relativeParent || document.body).getBoundingClientRect();
          var top = selectionRect.top - relativeRect.top - toolbarHeight / 0.8;
          var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - toolbarWidth / 2;

          //let left = selectionRect.left + selectionRect.width / 2 - padd
          //let top = (selectionRect.top + window.scrollY) - toolbarHeight
          return _this.setPosition({
            top: top,
            left: left
          });
        }
      } else {
        return _this.hide();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getStyle", function () {
      if (!_this.state.position) {
        return {};
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function (item) {
      return _this.props.editor.setDirection(item.type);
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement(AnchorStyle, {
        ref: _this.image_popover,
        className: "dante-popover popover--Aligntooltip popover--top popover--animated ".concat(_this.state.show ? 'is-active' : undefined),
        style: {
          top: _this.state.position.top,
          left: _this.state.position.left
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "popover-inner"
      }, /*#__PURE__*/React.createElement("ul", {
        className: "dante-menu-buttons"
      }, _this.state.buttons.map(function (item, i) {
        return /*#__PURE__*/React.createElement(DanteImagePopoverItem, {
          item: item,
          handleClick: _this.handleClick,
          key: i
        });
      }))), /*#__PURE__*/React.createElement("div", {
        className: "popover-arrow"
      }));
    });
    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      scaled: false,
      buttons: [{
        type: "left"
      }, {
        type: "center"
      }, {
        type: "fill"
      }, {
        type: "wide"
      }]
    };
    _this.image_popover = /*#__PURE__*/React.createRef();
    return _this;
  }
  _createClass(DanteImagePopover, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(newProps) {
      return this.collapse();
    }
  }]);
  return DanteImagePopover;
}(React.Component);
var DanteImagePopoverItem = /*#__PURE__*/function (_React$Component2) {
  _inherits(DanteImagePopoverItem, _React$Component2);
  var _super2 = _createSuper(DanteImagePopoverItem);
  function DanteImagePopoverItem() {
    var _this2;
    _classCallCheck(this, DanteImagePopoverItem);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "handleClick", function (e) {
      e.preventDefault();
      return _this2.props.handleClick(_this2.props.item);
    });
    _defineProperty(_assertThisInitialized(_this2), "render", function () {
      return /*#__PURE__*/React.createElement("li", {
        className: "dante-menu-button align-".concat(_this2.props.item.type),
        onMouseDown: _this2.handleClick
      }, /*#__PURE__*/React.createElement("span", {
        className: "tooltip-icon dante-icon"
      }, Icons["image".concat(capitalize(_this2.props.item.type))]()));
    });
    _this2.handleClick = _this2.handleClick.bind(_assertThisInitialized(_this2));
    _this2.render = _this2.render.bind(_assertThisInitialized(_this2));
    return _this2;
  }
  return _createClass(DanteImagePopoverItem);
}(React.Component);
var DanteImagePopoverConfig = function DanteImagePopoverConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: 'image_popover',
    component: DanteImagePopover
  };
  return Object.assign(config, options);
};

export { DanteImagePopoverConfig, DanteImagePopover as default };
