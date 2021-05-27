import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

import styled from "@emotion/styled";

export const StyleWrapper = styled(NodeViewWrapper)`
  .editable-content {
    color: ${(props) => props.theme.dante_text_color};
    background: ${(props) => props.theme.dante_bg_color};
    //border-color: ${(props) => props.theme.dante_text_color};
    //border-width: 1px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 1px 3px 0px #9e9e9e54;
    ::after {
      content: attr(data-placeholder);
      color: #b5b4b4;
      font-size: 0.6em;
      width: 100%;
      border-top: 1px solid #c1c1c1;
      padding-top: 1px;
    }
    button {
      float: right;
    }
  }
`;

export default function PlaceholderBlock(props) {
  console.log(props.node.attrs.blockKind);

  return (
    <StyleWrapper selected={props.selected}>
      <div className="content">
        <NodeViewContent
          className="editable-content"
          data-placeholder={props.node.attrs.blockKind.options.placeholder}
        >
          <button onClick={() => props.deleteNode()}>x</button>
        </NodeViewContent>
      </div>
    </StyleWrapper>
  );
}

export const PlaceholderBlockConfig = (options = {}) => {
  let config = {
    name: "PlaceholderBlock",
    tag: "placeholder-block",
    component: PlaceholderBlock,
    onUpdate: (editor) => {
      //console.log("CONTENT CHANGED ON PLACEHOLDER!!!", editor)
    },
    keyboardShortcuts: (editor) => {
      return {
        Enter: ({ editor }) => {
          //getNodeType('PlaceholderBlock' , editor.schema)
          //if (
          //  editor.view?.trackWrites?.pmViewDesc?.parent?.spec?.extension
          //    ?.name === "PlaceholderBlock"
          //)

          if (editor.isActive("PlaceholderBlock")) {
            /*console.log("YES MADA!", editor.view?.trackWrites?.pmViewDesc);
            const comp =
              editor.view.trackWrites.pmViewDesc.parent.node.attrs.blockKind
                .name;
            const text = editor.view.trackWrites.pmViewDesc.node.text;*/

            const parentComp = editor.state.selection.$anchor.parent;
            const comp = parentComp.attrs.blockKind;
            const text = parentComp.textContent;

            if (!comp?.name) return;

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
