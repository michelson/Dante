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
import { EditorBlock } from 'draft-js';
import { updateDataOfBlock, addNewBlockAt } from '../../model/index.js';
import axios from "axios";
import { video } from "../icons.js";

var VideoBlock =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VideoBlock, _React$Component);

  function VideoBlock(props) {
    var _this;

    _classCallCheck(this, VideoBlock);

    _this = _possibleConstructorReturn(this, (VideoBlock.__proto__ || Object.getPrototypeOf(VideoBlock)).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "defaultData", function () {
      var existing_data = _this.props.block.getData().toJS();

      return existing_data.embed_data || {};
    });

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
      } // ensure data isnt already loaded


      if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
        return;
      }

      return axios({
        method: 'get',
        url: "".concat(this.dataForUpdate().endpoint).concat(this.dataForUpdate().provisory_text, "&scheme=https")
      }).then(function (result) {
        return _this2.setState({
          embed_data: result.data //JSON.parse(data.responseText)

        }, _this2.updateData);
      }).catch(function (error) {
        return console.log("TODO: error");
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("figure", {
        className: "graf--figure graf--iframe graf--first",
        tabIndex: "0"
      }, React.createElement("div", {
        className: "iframeContainer",
        dangerouslySetInnerHTML: {
          __html: this.renderEmbedHtml()
        }
      }), React.createElement("figcaption", {
        className: "imageCaption"
      }, React.createElement(EditorBlock, Object.assign({}, this.props, {
        "className": "imageCaption"
      }))));
    }
  }]);

  return VideoBlock;
}(React.Component);

export { VideoBlock as default };
export var VideoBlockConfig = function VideoBlockConfig() {
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