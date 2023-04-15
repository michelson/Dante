import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import axios from 'axios';
import { updateDataOfBlock, resetBlockWithType, addNewBlockAt } from '../../model/index.js';
import 'draft-js';
import { embed } from '../icons.js';
import 'immutable';

var EmbedBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(EmbedBlock, _React$Component);
  var _super = _createSuper(EmbedBlock);
  function EmbedBlock(props) {
    var _this;
    _classCallCheck(this, EmbedBlock);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "defaultData", function () {
      var existing_data = _this.props.block.getData().toJS();
      return existing_data.embed_data || {};
    });
    // will update block state
    _defineProperty(_assertThisInitialized(_this), "updateData", function () {
      var _this$props = _this.props,
        block = _this$props.block,
        blockProps = _this$props.blockProps;
      var getEditorState = blockProps.getEditorState,
        setEditorState = blockProps.setEditorState;
      var data = block.getData();
      var newData = data.merge(_this.state);
      return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
    });
    _defineProperty(_assertThisInitialized(_this), "deleteSelf", function (e) {
      e.preventDefault();
      var _this$props2 = _this.props,
        block = _this$props2.block,
        blockProps = _this$props2.blockProps;
      var getEditorState = blockProps.getEditorState,
        setEditorState = blockProps.setEditorState;
      var data = block.getData();
      data.merge(_this.state);
      return setEditorState(resetBlockWithType(getEditorState(), 'unstyled', {}));
    });
    _defineProperty(_assertThisInitialized(_this), "dataForUpdate", function () {
      return _this.props.blockProps.data.toJS();
    });
    _defineProperty(_assertThisInitialized(_this), "classForImage", function () {
      if (_this.picture()) {
        return "";
      } else {
        return "mixtapeImage--empty u-ignoreBlock";
      }
    });
    //if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"
    _defineProperty(_assertThisInitialized(_this), "picture", function () {
      if (_this.state.embed_data.images && _this.state.embed_data.images.length > 0) {
        return _this.state.embed_data.images[0].url;
      } else if (_this.state.embed_data.thumbnail_url) {
        return _this.state.embed_data.thumbnail_url;
      } else if (_this.state.embed_data.image) {
        return _this.state.embed_data.image;
      } else {
        return null;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      if (!_this.props.blockProps.getEditor().props.read_only) {
        e.preventDefault();
      }
    });
    _this.state = {
      embed_data: _this.defaultData(),
      error: ""
    };
    return _this;
  }
  _createClass(EmbedBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (!this.props.blockProps.data) {
        return;
      }

      // ensure data isnt already loaded
      // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text

      if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
        //debugger
        return;
      }
      return axios({
        method: 'get',
        url: "".concat(this.dataForUpdate().endpoint).concat(this.dataForUpdate().provisory_text, "&scheme=https")
      }).then(function (result) {
        return _this2.setState({
          embed_data: result.data
        } //JSON.parse(data.responseText)
        , _this2.updateData);
      })["catch"](function (error) {
        _this2.setState({
          error: error.response.data.error_message
        });
        return console.log("TODO: error");
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("span", null, this.picture() ? /*#__PURE__*/React.createElement("a", {
        target: "_blank",
        className: "js-mixtapeImage mixtapeImage ".concat(this.classForImage()),
        href: this.state.embed_data.url,
        style: {
          backgroundImage: "url('".concat(this.picture(), "')")
        }
      }) : undefined, this.state.error ? /*#__PURE__*/React.createElement("h2", null, this.state.error) : undefined, !this.props.blockProps.getEditor().props.read_only ? /*#__PURE__*/React.createElement("a", {
        href: "#",
        className: "graf--media-embed-close",
        onClick: this.deleteSelf
      }, "x") : null, /*#__PURE__*/React.createElement("a", {
        className: "markup--anchor markup--mixtapeEmbed-anchor",
        target: "_blank",
        href: this.state.embed_data.url,
        onClick: this.handleClick,
        contentEditable: false
      }, /*#__PURE__*/React.createElement("strong", {
        className: "markup--strong markup--mixtapeEmbed-strong"
      }, this.state.embed_data.title), /*#__PURE__*/React.createElement("em", {
        className: "markup--em markup--mixtapeEmbed-em"
      }, this.state.embed_data.description)), /*#__PURE__*/React.createElement("span", {
        contentEditable: false
      }, this.state.embed_data.provider_url || this.state.embed_data.url));
    }
  }]);
  return EmbedBlock;
}(React.Component);
var EmbedBlockConfig = function EmbedBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'insert embed',
    type: 'embed',
    block: EmbedBlock,
    icon: embed,
    editable: true,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--mixtapeEmbed",
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "embed"
    },
    options: {
      endpoint: '//noembed.com/embed?url=',
      placeholder: 'Paste a link to embed content from another site (e.g. Twitter) and press Enter'
    },
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

export { EmbedBlockConfig, EmbedBlock as default };
