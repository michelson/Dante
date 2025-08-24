import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const EditableSimple = () => {
  return (
    <NodeViewWrapper
      className="react-component-with-content"
      style={{ position: "relative" }}
    >
      <span className="label" contentEditable={false}>
        AAAAAAKAKAAKAK
      </span>

      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};

export default EditableSimple
