import { c as _inherits, d as _createSuper, a as _createClass, b as _classCallCheck, e as _defineProperty, f as _assertThisInitialized } from '../../../_rollupPluginBabelHelpers-09096d66.js';
import React from 'react';
import { EditorBlock } from 'draft-js';
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js';
import axios from 'axios';
import { video } from '../icons.js';
import 'immutable';

var VideoBlock = /*#__PURE__*/function (_React$Component) {
  _inherits(VideoBlock, _React$Component);
  var _super = _createSuper(VideoBlock);
  function VideoBlock(props) {
    var _this;
    _classCallCheck(this, VideoBlock);
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
    _defineProperty(_assertThisInitialized(_this), "dataForUpdate", function () {
      return _this.props.blockProps.data.toJS();
    });
    _defineProperty(_assertThisInitialized(_this), "classForImage", function () {
      if (_this.state.embed_data.thumbnail_url) {
        return "";
      } else {
        return "mixtapeImage--empty u-ignoreBlock";
      }
    });
    _defineProperty(_assertThisInitialized(_this), "renderEmbedHtml", function () {
      if (_this.dataForUpdate().mediaRenderHandler) {
        return _this.dataForUpdate().mediaRenderHandler();
      } else {
        return _this.state.embed_data.media ? _this.state.embed_data.media.html : _this.state.embed_data.html;
      }
    });
    _this.state = {
      embed_data: _this.defaultData()
    };
    return _this;
  }
  _createClass(VideoBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (!this.props.blockProps.data) {
        return;
      }
      // ensure data isnt already loaded
      if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
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
        return console.log("TODO: error");
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("figure", {
        className: "graf--figure graf--iframe graf--first",
        tabIndex: "0"
      }, /*#__PURE__*/React.createElement("div", {
        className: "iframeContainer",
        dangerouslySetInnerHTML: {
          __html: this.renderEmbedHtml()
        }
      }), /*#__PURE__*/React.createElement("figcaption", {
        className: "imageCaption"
      }, /*#__PURE__*/React.createElement(EditorBlock, Object.assign({}, this.props, {
        "className": "imageCaption"
      }))));
    }
  }]);
  return VideoBlock;
}(React.Component);
var VideoBlockConfig = function VideoBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    title: 'insert video',
    editable: true,
    type: 'video',
    icon: video,
    block: VideoBlock,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf--figure graf--iframe",
    selected_class: " is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "video"
    },
    options: {
      endpoint: '//noembed.com/embed?url=',
      placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
      caption: 'Type caption for embed (optional)'
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

export { VideoBlockConfig, VideoBlock as default };
