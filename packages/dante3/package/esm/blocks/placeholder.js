import { _ as __makeTemplateObject } from '../tslib.es6-30a7ce49.js';
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import styled from '@emotion/styled';

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .editable-content {\n    color: ", ";\n    background: ", ";\n    //border-color: ", ";\n    //border-width: 1px;\n    padding: 10px;\n    border-radius: 5px;\n    box-shadow: 0px 1px 3px 0px #9e9e9e54;\n    ::after {\n      content: attr(data-placeholder);\n      color: #b5b4b4;\n      font-size: 0.6em;\n      width: 100%;\n      border-top: 1px solid #c1c1c1;\n      padding-top: 1px;\n    }\n    button {\n      float: right;\n    }\n  }\n"], ["\n  .editable-content {\n    color: ", ";\n    background: ", ";\n    //border-color: ", ";\n    //border-width: 1px;\n    padding: 10px;\n    border-radius: 5px;\n    box-shadow: 0px 1px 3px 0px #9e9e9e54;\n    ::after {\n      content: attr(data-placeholder);\n      color: #b5b4b4;\n      font-size: 0.6em;\n      width: 100%;\n      border-top: 1px solid #c1c1c1;\n      padding-top: 1px;\n    }\n    button {\n      float: right;\n    }\n  }\n"])), function (props) { return props.theme.dante_text_color; }, function (props) { return props.theme.dante_bg_color; }, function (props) { return props.theme.dante_text_color; });
function PlaceholderBlock(props) {
    // console.log(props.node.attrs.blockKind);
    return (React.createElement(StyleWrapper, { selected: props.selected },
        React.createElement("div", { className: "content" },
            React.createElement(NodeViewContent, { className: "editable-content", "data-placeholder": props.node.attrs.blockKind.options.placeholder },
                React.createElement("button", { onClick: function () { return props.deleteNode(); } },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })))))));
}
var PlaceholderBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        name: "PlaceholderBlock",
        tag: "placeholder-block",
        component: PlaceholderBlock,
        priority: 20,
        //onUpdate: (editor) => {
        //  console.log("CONTENT CHANGED ON PLACEHOLDER!!!", editor)
        //},
        keyboardShortcuts: function (editor) {
            return {
                Enter: function () {
                    if (editor.isActive("PlaceholderBlock")) {
                        var parentComp = editor.state.selection.$anchor.parent;
                        var comp = parentComp.attrs.blockKind;
                        var text = parentComp.textContent;
                        if (!(comp === null || comp === void 0 ? void 0 : comp.name))
                            return;
                        editor
                            .chain()
                            .toggleNode(comp.name, comp.name, { provisory_text: text })
                            .run();
                    }
                    //return editor.commands.toggleBulletList()
                    return false;
                },
            };
        },
        attributes: {
            blockKind: {
                default: {},
            },
        },
    };
    return Object.assign(config, options);
};
var templateObject_1;

export { PlaceholderBlockConfig, StyleWrapper, PlaceholderBlock as default };
