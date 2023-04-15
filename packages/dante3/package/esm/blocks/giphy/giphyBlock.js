import { _ as __makeTemplateObject } from '../../tslib.es6-30a7ce49.js';
import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import styled from '@emotion/styled';
import { x as giphyLogo } from '../../icons-ca14e5a1.js';
import App from './giphy.js';
import 'axios';

//const giphyApiKey = "97g39PuUZ6Q49VdTRBvMYXRoKZYd1ScZ";
var Modal = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  //background-color: ", ";\n  position: fixed;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n"], ["\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  //background-color: ", ";\n  position: fixed;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n"])), function (props) { return props.theme.dante_control_color; });
var ModalWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 1.5rem;\n  overflow: hidden;\n  max-width: 28rem;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: inline-block;\n  border-radius: 0.3rem;\n  position: relative;\n  box-shadow: 1px 2px 7px 0px #27262673;\n  border: 1px solid #2f2f2f3b;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  .close {\n    align-self: flex-end;\n    width: 20px;\n    height: 20px;\n  }\n  input {\n    padding: 0.2em;\n    border: 1px solid #ccc;\n    width: 100%;\n  }\n"], ["\n  padding: 1.5rem;\n  overflow: hidden;\n  max-width: 28rem;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: inline-block;\n  border-radius: 0.3rem;\n  position: relative;\n  box-shadow: 1px 2px 7px 0px #27262673;\n  border: 1px solid #2f2f2f3b;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  .close {\n    align-self: flex-end;\n    width: 20px;\n    height: 20px;\n  }\n  input {\n    padding: 0.2em;\n    border: 1px solid #ccc;\n    width: 100%;\n  }\n"])), function (props) { return props.theme.dante_inversed_color; });
var GiphyBlock = function (props) {
    React.useState(true)[0];
    var getAspectRatio = function (w, h) {
        var maxWidth = 1000;
        var maxHeight = 1000;
        var ratio = 0;
        var width = w; // Current image width
        var height = h; // Current image height
        // Check if the current width is larger than the max
        if (width > maxWidth) {
            ratio = maxWidth / width; // get ratio for scaling image
            height = height * ratio; // Reset height to match scaled image
            width = width * ratio; // Reset width to match scaled image
            // Check if current height is larger than max
        }
        else if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            width = width * ratio; // Reset width to match scaled image
            height = height * ratio; // Reset height to match scaled image
        }
        var fill_ratio = (height / width) * 100;
        var result = { width: width, height: height, ratio: fill_ratio };
        // console.log result
        return result;
    };
    var selectImage = function (giphyblock) {
        var _a = giphyblock.images.original, url = _a.url, height = _a.height, width = _a.width;
        props.editor.commands.insertContent({
            type: "ImageBlock",
            attrs: {
                url: url,
                aspect_ratio: getAspectRatio(width, height),
                forceUpload: true,
            },
        });
    };
    var selfDestroy = function () {
        props.deleteNode();
    };
    /*export default class GiphyBlock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: true,
      };
    }
  
    componentDidMount() {
      // console.log("GIPYH", this.props);
      //this.props.blockProps.toggleEditable();
    }
  
    defaultData = () => {
      //const existing_data = this.props.block.getData().toJS();
      //return existing_data.embed_data || {};
      return {};
    };
  
      deleteSelf = (e) => {
        e.preventDefault();
        this.props.deleteNode();
      };
  
      getAspectRatio = (w, h) => {
        const maxWidth = 1000;
        const maxHeight = 1000;
        let ratio = 0;
        let width = w; // Current image width
        let height = h; // Current image height
  
        // Check if the current width is larger than the max
        if (width > maxWidth) {
          ratio = maxWidth / width; // get ratio for scaling image
          height = height * ratio; // Reset height to match scaled image
          width = width * ratio; // Reset width to match scaled image
  
          // Check if current height is larger than max
        } else if (height > maxHeight) {
          ratio = maxHeight / height; // get ratio for scaling image
          width = width * ratio; // Reset width to match scaled image
          height = height * ratio; // Reset height to match scaled image
        }
  
        const fill_ratio = (height / width) * 100;
        const result = { width, height, ratio: fill_ratio };
        // console.log result
        return result;
      };
  
      selectImage = (giphyblock) => {
        const { url, height, width } = giphyblock.images.original;
  
        this.props.editor.commands.insertContent({
          type: "ImageBlock",
          attrs: {
            url: url,
            aspect_ratio: this.getAspectRatio(width, height),
            forceUpload: true,
          },
        });
      };
  
      selfDestroy = () => {
        this.props.deleteNode();
      };*/
    // console.log(this.state.collection)
    return (React.createElement(NodeViewWrapper, { className: "dante-giphy-wrapper" },
        React.createElement("div", { contentEditable: false, "data-drag-handle": "true" },
            React.createElement(Modal, null,
                React.createElement(ModalWrapper, null,
                    React.createElement("button", { className: "close", onClick: selfDestroy },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }))),
                    React.createElement(App, { apiKey: props.extension.config.addOptions.key, handleSelected: function (data) {
                            selectImage(data);
                        } }))))));
};
var GiphyBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: giphyLogo,
        name: "GiphyBlock",
        tag: "giphy-block",
        component: GiphyBlock,
        atom: true,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "GiphyBlock",
        },
        options: {
            placeholder: "Search any gif on giphy",
            key: "97g39PuUZ6Q49VdTRBvMYXRoKZYd1ScZ",
        },
        attributes: {},
    };
    return Object.assign(config, options);
};
var templateObject_1, templateObject_2;
/*
export const GiphyBlockConfig = (options = {}) => {
  const config = {
    title: "add an image",
    type: "giphy",
    icon: GiphyLogo,
    block: GiphyBlock,
    editable: false,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--figure",
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "giphy",
      // insertion: "func",
      // funcHandler: options.handleFunc,
    },
    options: {
      placeholder: "Search any gif on giphy",
    },
  };

  return Object.assign(config, options);
};*/

export { GiphyBlockConfig, GiphyBlock as default };
