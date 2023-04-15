import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorBlock, RichUtils } from 'draft-js';
import 'axios';
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js';
import { image } from '../icons.js';
import 'immutable';

var CodeBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(CodeBlock, _React$Component);
  var _super = _createSuper(CodeBlock);
  function CodeBlock(props) {
    var _this;
    _classCallCheck(this, CodeBlock);
    _this = _super.call(this, props);
    // will update block state
    _defineProperty(_assertThisInitialized(_this), "updateData", function (options) {
      var _this$props = _this.props,
        blockProps = _this$props.blockProps,
        block = _this$props.block;
      var getEditorState = blockProps.getEditorState;
      var setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state).merge(options);
      return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
    });
    _defineProperty(_assertThisInitialized(_this), "renderSelect", function () {
      return _this.props.blockProps.config.displaySelect && !_this.props.blockProps.getEditor().props.read_only;
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        className: "dante-code-syntax"
      }, _this.renderSelect() && /*#__PURE__*/React.createElement(Select, {
        options: _this.languages,
        isSearchable: true,
        value: _this.state.syntax,
        onChange: function onChange(e) {
          console.log(e.target.value);
          _this.setState({
            syntax: e.target.value
          }, function () {
            _this.updateData({
              syntax: e.target.value
            });
          });
        }
      })), /*#__PURE__*/React.createElement(EditorBlock, _this.props));
    });
    _this.state = {
      syntax: _this.props.blockProps.data.get('syntax')
    };
    _this.languages = _this.props.blockProps.config.languages;
    return _this;
  }
  _createClass(CodeBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //this.updateData({syntax: "javascript"})
    }
  }]);
  return CodeBlock;
}(React.Component);
function Select(_ref) {
  var options = _ref.options,
    value = _ref.value,
    onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: "select-lang-".concat(o.value)
    }, o.label);
  }));
}
var CodeBlockConfig = function CodeBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'add an code',
    type: 'code-block',
    icon: image,
    block: CodeBlock,
    editable: true,
    renderable: true,
    //breakOnContinuous: true,
    wrapper_class: "graf graf--code",
    selected_class: "is-selected",
    selectedFn: function selectedFn(block) {},
    handleEnterWithoutText: function handleEnterWithoutText(ctx, block) {
      var editorState = ctx.state.editorState;
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
    },
    handleEnterWithText: function handleEnterWithText(ctx, block) {
      var editorState = ctx.state.editorState;
      var selection = editorState.getSelection();
      // check if we are in the last line and got 2 previous breaklines
      if (block.getLength() === selection.getEndOffset()) {
        if (block.getText().slice(-2) === "\n\n") {
          return ctx.onChange(addNewBlockAt(editorState, block.getKey()));
        }
      }
      return ctx.onChange(RichUtils.insertSoftNewline(editorState));
    },
    widget_options: {},
    options: {
      displaySelect: true,
      languages: [{
        value: 'javascript',
        label: 'javascript'
      }, {
        value: 'html',
        label: 'html'
      }, {
        value: 'css',
        label: 'css'
      }, {
        value: null,
        label: 'none'
      }]
    }
  };
  return Object.assign(config, options);
};

export { CodeBlockConfig, CodeBlock as default };
