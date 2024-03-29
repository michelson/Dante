import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";
import { divider } from "../icons";

export const StyleWrapper = styled(NodeViewWrapper)``;

export default function DividerBlock(props: any) {
  return (
    <StyleWrapper
      data-drag-handle="true"
      selected={props.selected}
      className="graf graf--divider is-selected"
    >
      <span />
    </StyleWrapper>
  );
}

export const DividerBlockConfig = (options = {}) => {
  let config = {
    icon: divider,
    name: "DividerBlock",
    tag: "divider-block",
    atom: true,
    component: DividerBlock,
    attributes: {},
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "divider-block",
    },
    priority: 1,
    parseHTML: [
      {
        tag: "divider-block",
      },
      {
        tag: "HR",
      },
    ],
    addInputRules() {
      return [/^(?:---|—-|___\s|\*\*\*\s)$/];
    },
  };

  return Object.assign(config, options);
};


export function DividerBlockRenderer({ blockKey, data, domain }: { blockKey: any, data: any, domain?: any }) {
  return (
    <div
      className="graf graf--divider is-selected"
    >
      <span />
    </div>
  );
}