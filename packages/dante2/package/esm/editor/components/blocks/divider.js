import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { divider } from '../icons.js';

var Divider = /*#__PURE__*/function (_React$Component) {
  _inherits(Divider, _React$Component);
  var _super = _createSuper(Divider);
  function Divider(props) {
    var _this;
    _classCallCheck(this, Divider);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement("span", null);
    });
    _this.state = {};
    return _this;
  }
  return _createClass(Divider);
}(React.Component);
var DividerBlockConfig = function DividerBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'add divider',
    type: 'divider',
    icon: divider,
    block: Divider,
    editable: false,
    renderable: true,
    breakOnContinuous: false,
    wrapper_class: "graf graf--divider",
    selected_class: "is-selected",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "divider"
    }
  };
  return Object.assign(config, options);
};

export { DividerBlockConfig, Divider as default };
