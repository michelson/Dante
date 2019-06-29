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
import Icons from '../icons';
import { capitalize } from 'lodash';
import { getSelection } from "../../utils/selection.js";
import { getCurrentBlock } from '../../model/index.js';
import { getRelativeParent } from "../../utils/selection.js";
import { AnchorStyle } from '../../styled/menu';

var DanteImagePopover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DanteImagePopover, _React$Component);

  function DanteImagePopover(props) {
    var _this;

    _classCallCheck(this, DanteImagePopover);

    _this = _possibleConstructorReturn(this, (DanteImagePopover.__proto__ || Object.getPrototypeOf(DanteImagePopover)).call(this, props));

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
          var el = _this.refs.image_popover;
          var relativeParent = getRelativeParent(el.parentElement);
          var toolbarHeight = el.clientHeight;
          var toolbarWidth = el.clientWidth;
          var relativeRect = (relativeParent || document.body).getBoundingClientRect();
          var top = selectionRect.top - relativeRect.top - toolbarHeight / 0.8;
          var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - toolbarWidth / 2; //let left = selectionRect.left + selectionRect.width / 2 - padd
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
      return React.createElement(AnchorStyle, {
        ref: "image_popover",
        className: "dante-popover popover--Aligntooltip popover--top popover--animated ".concat(_this.state.show ? 'is-active' : undefined),
        style: {
          top: _this.state.position.top,
          left: _this.state.position.left
        }
      }, React.createElement("div", {
        className: "popover-inner"
      }, React.createElement("ul", {
        className: "dante-menu-buttons"
      }, _this.state.buttons.map(function (item, i) {
        return React.createElement(DanteImagePopoverItem, {
          item: item,
          handleClick: _this.handleClick,
          key: i
        });
      }))), React.createElement("div", {
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
    return _this;
  }

  _createClass(DanteImagePopover, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      return this.collapse();
    }
  }]);

  return DanteImagePopover;
}(React.Component);

var DanteImagePopoverItem =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(DanteImagePopoverItem, _React$Component2);

  function DanteImagePopoverItem() {
    var _ref;

    var _this2;

    _classCallCheck(this, DanteImagePopoverItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_ref = DanteImagePopoverItem.__proto__ || Object.getPrototypeOf(DanteImagePopoverItem)).call.apply(_ref, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "handleClick", function (e) {
      e.preventDefault();
      return _this2.props.handleClick(_this2.props.item);
    });

    _defineProperty(_assertThisInitialized(_this2), "render", function () {
      return React.createElement("li", {
        className: "dante-menu-button align-".concat(_this2.props.item.type),
        onMouseDown: _this2.handleClick
      }, React.createElement("span", {
        className: "tooltip-icon dante-icon"
      }, Icons["image".concat(capitalize(_this2.props.item.type))]()));
    });

    _this2.handleClick = _this2.handleClick.bind(_assertThisInitialized(_this2));
    _this2.render = _this2.render.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  return DanteImagePopoverItem;
}(React.Component);

export default DanteImagePopover;
export var DanteImagePopoverConfig = function DanteImagePopoverConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: 'image_popover',
    component: DanteImagePopover
  };
  return Object.assign(config, options);
};