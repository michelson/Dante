import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorBlock } from 'draft-js';
import { resetBlockWithType } from '../../model/index.js';
import 'immutable';

var PlaceholderBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(PlaceholderBlock, _React$Component);
  var _super = _createSuper(PlaceholderBlock);
  function PlaceholderBlock(props) {
    var _this;
    _classCallCheck(this, PlaceholderBlock);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "placeholderText", function () {
      //if (this.state.enabled) {
      //  return ""
      //}
      return _this.props.blockProps.data.toJS().placeholder || _this.placeholderFromProps() || _this.defaultText();
    });
    //if @.props.blockProps.data then @.props.blockProps.data.placeholder else @defaultText()
    _defineProperty(_assertThisInitialized(_this), "placeholderFromProps", function () {
      return _this.props.block.toJS().placeholder;
    });
    _defineProperty(_assertThisInitialized(_this), "defaultText", function () {
      return "write something ";
    });
    _defineProperty(_assertThisInitialized(_this), "placeholderRender", function () {
      if (_this.props.block.text.length === 0) {
        return /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-root"
        }, /*#__PURE__*/React.createElement("div", {
          className: "public-DraftEditorPlaceholder-inner"
        }, _this.placeholderText()));
      }
    });
    _this.state = {
      enabled: false,
      data: _this.props.blockProps.data.toJS()
    };
    return _this;
  }
  _createClass(PlaceholderBlock, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("span", {
        onMouseDown: this.handleFocus
      }, this.placeholderRender(), /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, this.props, {
        "className": "imageCaption",
        "placeholder": "escrive alalal"
      })));
    }
  }]);
  return PlaceholderBlock;
}(React.Component);
var PlaceholderBlockConfig = function PlaceholderBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    renderable: true,
    editable: true,
    block: PlaceholderBlock,
    type: 'placeholder',
    wrapper_class: "is-embedable",
    breakOnContinuous: true,
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: false
    },
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange(resetBlockWithType(editorState, "unstyled"));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      var data = {
        provisory_text: block.getText(),
        endpoint: block.getData().get('endpoint'),
        type: block.getData().get('type')
      };
      return ctx.onChange(resetBlockWithType(editorState, data.type, data));
    }
  };
  return Object.assign(config, options);
};

export { PlaceholderBlockConfig, PlaceholderBlock as default };
