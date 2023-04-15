import { _ as __makeTemplateObject } from '../tslib.es6-30a7ce49.js';
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import styled from '@emotion/styled';

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .content {\n    background: ", ";\n    padding: 1.2em;\n    padding-top: 0.5em;\n    padding-bottom: 0.5em;\n\n    select,\n    .language {\n      float: right;\n      color: ", ";\n      background-color: ", ";\n    }\n\n    margin-bottom: 10px;\n    margin-top: 10px;\n  }\n\n  /*\n  Qt Creator dark color scheme\n  */\n\n  .hljs {\n    color: ", ";\n    background: ", ";\n  }\n\n  .hljs-strong,\n  .hljs-emphasis {\n    color: ", ";\n  }\n\n  .hljs-bullet,\n  .hljs-quote,\n  .hljs-number,\n  .hljs-regexp,\n  .hljs-literal {\n    color: ", ";\n  }\n\n  .hljs-code .hljs-selector-class {\n    color: ", ";\n  }\n\n  .hljs-emphasis,\n  .hljs-stronge,\n  .hljs-type {\n    font-style: italic;\n  }\n\n  .hljs-keyword,\n  .hljs-selector-tag,\n  .hljs-function,\n  .hljs-section,\n  .hljs-symbol,\n  .hljs-name {\n    color: ", ";\n  }\n\n  .hljs-subst,\n  .hljs-tag,\n  .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-attribute {\n    color: ", ";\n  }\n\n  .hljs-variable,\n  .hljs-params,\n  .hljs-title.class_,\n  .hljs-class .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-string,\n  .hljs-selector-id,\n  .hljs-selector-attr,\n  .hljs-selector-pseudo,\n  .hljs-type,\n  .hljs-built_in,\n  .hljs-template-tag,\n  .hljs-template-variable,\n  .hljs-addition,\n  .hljs-link {\n    color: ", ";\n  }\n\n  .hljs-comment,\n  .hljs-meta,\n  .hljs-deletion {\n    color: ", ";\n  }\n"], ["\n  .content {\n    background: ", ";\n    padding: 1.2em;\n    padding-top: 0.5em;\n    padding-bottom: 0.5em;\n\n    select,\n    .language {\n      float: right;\n      color: ", ";\n      background-color: ", ";\n    }\n\n    margin-bottom: 10px;\n    margin-top: 10px;\n  }\n\n  /*\n  Qt Creator dark color scheme\n  */\n\n  .hljs {\n    color: ", ";\n    background: ", ";\n  }\n\n  .hljs-strong,\n  .hljs-emphasis {\n    color: ", ";\n  }\n\n  .hljs-bullet,\n  .hljs-quote,\n  .hljs-number,\n  .hljs-regexp,\n  .hljs-literal {\n    color: ", ";\n  }\n\n  .hljs-code .hljs-selector-class {\n    color: ", ";\n  }\n\n  .hljs-emphasis,\n  .hljs-stronge,\n  .hljs-type {\n    font-style: italic;\n  }\n\n  .hljs-keyword,\n  .hljs-selector-tag,\n  .hljs-function,\n  .hljs-section,\n  .hljs-symbol,\n  .hljs-name {\n    color: ", ";\n  }\n\n  .hljs-subst,\n  .hljs-tag,\n  .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-attribute {\n    color: ", ";\n  }\n\n  .hljs-variable,\n  .hljs-params,\n  .hljs-title.class_,\n  .hljs-class .hljs-title {\n    color: ", ";\n  }\n\n  .hljs-string,\n  .hljs-selector-id,\n  .hljs-selector-attr,\n  .hljs-selector-pseudo,\n  .hljs-type,\n  .hljs-built_in,\n  .hljs-template-tag,\n  .hljs-template-variable,\n  .hljs-addition,\n  .hljs-link {\n    color: ", ";\n  }\n\n  .hljs-comment,\n  .hljs-meta,\n  .hljs-deletion {\n    color: ", ";\n  }\n"])), function (props) { return props.theme.hljs_background; }, function (props) { return props.theme.dante_text_color; }, function (props) { return props.theme.dante_inversed_color; }, function (props) { return props.theme.hljs_color; }, function (props) { return props.theme.hljs_background; }, function (props) { return props.theme.hljs_emphasis; }, function (props) { return props.theme.hljs_literal_color; }, function (props) { return props.theme.hljs_selector_class_color; }, function (props) { return props.theme.hljs_name_color; }, function (props) { return props.theme.hljs_title_color; }, function (props) { return props.theme.hljs_attribute_color; }, function (props) { return props.theme.hljs_variable_color; }, function (props) { return props.theme.hljs_link_color; }, function (props) { return props.theme.hljs_deletion_color; });
function Code(props) {
    console.log(props.selected);
    function changeLanguage(e) {
        props.updateAttributes({
            language: e.target.value,
        });
    }
    function language() {
        return props.node.attrs.language || "auto";
    }
    return (React.createElement(StyleWrapper, { "data-drag-handle": "true", selected: props.selected },
        React.createElement("div", { className: "content" },
            props.editor.isEditable && (React.createElement("select", { contentEditable: false, onChange: changeLanguage, value: language() },
                React.createElement("option", { value: "null" }, "auto"),
                React.createElement("option", { disabled: true }, "\u2014"),
                props.extension.options.lowlight.listLanguages().map(function (o) { return (React.createElement("option", { value: o, key: o }, o)); }))),
            !props.editor.isEditable && (React.createElement("span", { className: "language" }, language())),
            React.createElement(NodeViewContent, { as: "pre", className: "hljs" }))));
}
var CodeBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "CodeBlock",
        tag: "code-block",
        component: Code,
        attributes: {
            url: { default: "" },
        },
    };
    return Object.assign(config, options);
};
var templateObject_1;

export { CodeBlockConfig, StyleWrapper, Code as default };
