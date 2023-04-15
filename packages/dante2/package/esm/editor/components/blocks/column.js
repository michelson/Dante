import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorBlock } from 'draft-js';

var Column = /*#__PURE__*/function (_React$Component) {
  _inherits(Column, _React$Component);
  var _super = _createSuper(Column);
  function Column(props) {
    var _this;
    _classCallCheck(this, Column);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, "write something"));
      }
    });
    _this.state = {
      enabled: false,
      data: _this.props.blockProps.data.toJS()
    };
    _this.placeholderRender = _this.placeholderRender.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Column, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.placeholderRender(), /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, this.props, {
        "editable": true
      })));
    }
  }]);
  return Column;
}(React.Component);

export { Column as default };
