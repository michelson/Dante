import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { AnchorStyle } from '../../styled/menu.js';
import { getRelativeParent } from '../../utils/selection.js';
import '@emotion/styled';
import 'polished';

var DanteAnchorPopover = /*#__PURE__*/function (_React$Component) {
  _inherits(DanteAnchorPopover, _React$Component);
  var _super = _createSuper(DanteAnchorPopover);
  function DanteAnchorPopover(props) {
    var _this;
    _classCallCheck(this, DanteAnchorPopover);
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
    _defineProperty(_assertThisInitialized(_this), "relocate", function (node) {
      if (!node) {
        return;
      }
      _this.props.editorState;
      var selectionRect = node.getBoundingClientRect();
      ReactDOM.findDOMNode(_this.props.editor);
      var relativeParent = getRelativeParent(_this.dante_popover.current.parentElement);
      var toolbarHeight = _this.dante_popover.current.clientHeight;
      var toolbarWidth = _this.dante_popover.current.clientWidth;
      var relativeRect = (relativeParent || document.body).getBoundingClientRect();
      if (!relativeRect || !selectionRect) return;
      var top = selectionRect.top - relativeRect.top + toolbarHeight * 0.6;
      var left = selectionRect.left - relativeRect.left + selectionRect.width / 2 - toolbarWidth / 2;
      if (!top || !left) {
        return;
      }
      return {
        top: top,
        left: left
      };
    });
    _this.state = {
      position: {
        top: 0,
        left: 0
      },
      show: false,
      url: ""
    };
    _this.dante_popover = /*#__PURE__*/React.createRef('dante_popover');
    return _this;
  }
  _createClass(DanteAnchorPopover, [{
    key: "setPosition",
    value: function setPosition(coords) {
      return this.setState({
        position: coords
      });
    }
  }, {
    key: "render",
    value: function render() {
      var position = this.state.position;
      var style = {
        left: position.left,
        top: position.top,
        visibility: "".concat(this.state.show ? 'visible' : 'hidden')
      };
      return /*#__PURE__*/React.createElement(AnchorStyle, {
        ref: this.dante_popover,
        className: "dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active",
        style: style,
        onMouseOver: this.props.handleOnMouseOver,
        onMouseOut: this.props.handleOnMouseOut
      }, /*#__PURE__*/React.createElement("div", {
        className: "popover-inner"
      }, /*#__PURE__*/React.createElement("a", {
        href: this.state.url,
        target: "_blank"
      }, this.state.url)), /*#__PURE__*/React.createElement("div", {
        className: "popover-arrow"
      }));
    }
  }]);
  return DanteAnchorPopover;
}(React.Component);
var DanteAnchorPopoverConfig = function DanteAnchorPopoverConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    ref: 'anchor_popover',
    component: DanteAnchorPopover
  };
  return Object.assign(config, options);
};

export { DanteAnchorPopoverConfig, DanteAnchorPopover as default };
