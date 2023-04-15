import { _ as __makeTemplateObject, b as _assign } from '../tslib.es6-30a7ce49.js';
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import axios from 'axios';
import styled from '@emotion/styled';
import ReactMediumZoom from './mediumImage.js';
import { t as image } from '../icons-ca14e5a1.js';
import 'medium-zoom';

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
function ImageBlock(props) {
    // console.log("IMAGE:", props);
    var imageUrl = props.node.attrs.url || props.node.attrs.src;
    React.useEffect(function () {
        replaceImg();
    }, []);
    function setImage(url) {
        props.updateAttributes({
            url: url,
        });
    }
    function replaceImg() {
        var img = new Image();
        img.src = imageUrl; //props.node.attrs.src;
        // setImage(img.src)
        // exit only when not blob and not forceUload
        //if (!img.src.includes("blob:") && !props.node.attrs.forceUpload) {
        //  return;
        //}
        //if(props.node.attrs.aspect_ratio) return
        img.onload = function () {
            props.updateAttributes({
                width: img.width,
                height: img.height,
                aspect_ratio: getAspectRatio(img.width, img.height),
            });
            return handleUpload();
        };
    }
    function startLoader() {
        props.updateAttributes({
            loading: true,
        });
    }
    function stopLoader() {
        props.updateAttributes({
            loading: false,
        });
    }
    function handleUpload() {
        startLoader();
        uploadFile();
    }
    function formatData() {
        var formData = new FormData();
        if (props.node.attrs.file) {
            var formName = props.extension.options.upload_formName || 'file';
            formData.append(formName, props.node.attrs.file);
            return formData;
        }
        else {
            // TODO: check this
            formData.append("url", props.node.attrs.src);
            return formData;
        }
    }
    function uploadFile() {
        // custom upload handler
        if (props.extension.options.upload_handler) {
            return props.extension.options.upload_handler(formatData().get("file"), props);
        }
        if (!props.extension.options.upload_url) {
            stopLoader();
            return;
        }
        //this.props.blockProps.addLock()
        function getUploadUrl() {
            var url = props.extension.options.upload_url;
            if (typeof url === "function") {
                return url();
            }
            else {
                return url;
            }
        }
        function getUploadHeaders() {
            return props.extension.options.upload_headers || {};
        }
        axios({
            method: 'post',
            url: getUploadUrl(),
            headers: getUploadHeaders(),
            data: formatData(),
            onUploadProgress: function (e) {
                console.log("PROCVESSS ", e);
                return updateProgressBar(e);
            }
        }).then(function (result) {
            uploadCompleted(result.data.url);
            if (props.extension.options.upload_callback) {
                return props.extension.options.upload_callback(result, props);
            }
        }).catch(function (error) {
            //this.uploadFailed()
            console.log("ERROR: got error uploading file ".concat(error));
            if (props.extension.options.upload_error_callback) {
                return props.extension.options.upload_error_callback(error, props);
            }
        });
        return function (json_response) {
            // return uploadCompleted("https://i.imgur.com/XUWx1hA.jpeg");
            return uploadCompleted(json_response.url);
        };
    }
    function uploadCompleted(url) {
        setImage(url);
        //this.props.blockProps.removeLock()
        stopLoader();
    }
    function updateProgressBar(e) {
        var complete = props.node.attrs.loading_progress;
        if (e.lengthComputable) {
            complete = e.loaded / e.total * 100;
            complete = complete != null ? complete : { complete: 0 };
            props.updateAttributes({ loading_progress: complete });
            console.log("complete: ".concat(complete));
        }
    }
    function getAspectRatio(w, h) {
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
    }
    function setActive() {
        props.editor.commands.setNodeSelection(props.getPos());
    }
    function handleClick(e) {
        // console.log("clicked, ", e);
        setActive();
    }
    function directionClass() {
        switch (props.node.attrs.direction) {
            case "left":
                return "graf--layoutOutsetLeft";
            case "center":
                return "";
            case "wide":
                return "sectionLayout--fullWidth";
            case "fill":
                return "graf--layoutFillWidth";
            default:
                return "";
        }
    }
    function parseAspectRatio() {
        if (typeof (props.node.attrs.aspect_ratio) === "string") {
            try {
                return JSON.parse(props.node.attrs.aspect_ratio);
            }
            catch (error) {
                return {};
            }
        }
        else {
            return props.node.attrs.aspect_ratio;
        }
    }
    var _a = parseAspectRatio(), width = _a.width, height = _a.height, ratio = _a.ratio;
    return (React.createElement(StyleWrapper, { selected: props.selected, as: "figure", "data-drag-handle": "true", className: "graf graf--figure ".concat(directionClass(), " ").concat(props.selected ? "is-selected is-mediaFocused" : "") },
        React.createElement("div", { onClick: handleClick, className: "aspectRatioPlaceholder is-locked", style: {
                maxHeight: height,
                maxWidth: width,
            } },
            React.createElement("div", { className: "aspect-ratio-fill", style: { paddingBottom: "".concat(ratio, "%") } }),
            React.createElement(ReactMediumZoom, { src: imageUrl, height: width, width: height, className: "graf-image ".concat(props.editor.isEditable ? ".no-zoom" : ""), disabled: props.editor.isEditable, contentEditable: false, isEditable: props.editor.isEditable })),
        React.createElement(NodeViewContent, { as: "figcaption", className: "imageCaption" }, props.node.content.size === 0 && (React.createElement("span", { className: "danteDefaultPlaceholder" }, "type a caption (optional)")))));
}
var ImageBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "ImageBlock",
        icon: image,
        tag: "image-block",
        component: ImageBlock,
        atom: false,
        draggable: true,
        attributes: {
            url: { default: null },
            src: { default: null },
            width: { default: "" },
            height: { default: "" },
            loading: { default: false },
            loading_progress: { default: 0 },
            caption: { default: "caption!" },
            direction: { default: "center" },
            file: { default: null },
            aspect_ratio: {
                default: {
                    width: 200,
                    height: 200,
                    ratio: 100,
                },
            },
        },
        dataSerializer: function (data) {
            return _assign(_assign({}, data), { aspect_ratio: JSON.stringify(data.aspect_ratio), file: null });
        },
        options: {
            upload_handler: function (file, ctx) {
                console.log("UPLOADED FILE", file);
            },
        },
        parseHTML: [
            {
                tag: "image-block",
            },
            {
                tag: "img[src]",
            },
        ],
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "upload",
            insert_block: "image",
        },
        keyboardShortcuts: function (editor) {
            return {
                Enter: function (_a) {
                    var editor = _a.editor;
                    if (editor.isActive("ImageBlock")) {
                        //editor.commands.selectNodeForward()
                        editor.commands.insertContent({
                            type: "paragraph",
                        });
                        editor
                            .chain()
                            .focus()
                            //.insertContent("<strong>It's happening</strong>")
                            .toggleNode("paragraph", "paragraph", {})
                            .run();
                        return true;
                    }
                },
            };
        },
    };
    return Object.assign(config, options);
};
var templateObject_1;

export { ImageBlockConfig, StyleWrapper, ImageBlock as default };
