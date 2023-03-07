import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

import styled from "@emotion/styled";

export const StyleWrapper = styled(NodeViewWrapper)`
  .content {
    background: ${(props) => props.theme.hljs_background};
    padding: 1.2em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;

    select,
    .language {
      float: right;
      color: ${(props) => props.theme.dante_text_color};
      background-color: ${(props) => props.theme.dante_inversed_color};
    }

    margin-bottom: 10px;
    margin-top: 10px;
  }

  /*
  Qt Creator dark color scheme
  */

  .hljs {
    color: ${(props) => props.theme.hljs_color};
    background: ${(props) => props.theme.hljs_background};
  }

  .hljs-strong,
  .hljs-emphasis {
    color: ${(props) => props.theme.hljs_emphasis};
  }

  .hljs-bullet,
  .hljs-quote,
  .hljs-number,
  .hljs-regexp,
  .hljs-literal {
    color: ${(props) => props.theme.hljs_literal_color};
  }

  .hljs-code .hljs-selector-class {
    color: ${(props) => props.theme.hljs_selector_class_color};
  }

  .hljs-emphasis,
  .hljs-stronge,
  .hljs-type {
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-function,
  .hljs-section,
  .hljs-symbol,
  .hljs-name {
    color: ${(props) => props.theme.hljs_name_color};
  }

  .hljs-subst,
  .hljs-tag,
  .hljs-title {
    color: ${(props) => props.theme.hljs_title_color};
  }

  .hljs-attribute {
    color: ${(props) => props.theme.hljs_attribute_color};
  }

  .hljs-variable,
  .hljs-params,
  .hljs-title.class_,
  .hljs-class .hljs-title {
    color: ${(props) => props.theme.hljs_variable_color};
  }

  .hljs-string,
  .hljs-selector-id,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-type,
  .hljs-built_in,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-addition,
  .hljs-link {
    color: ${(props) => props.theme.hljs_link_color};
  }

  .hljs-comment,
  .hljs-meta,
  .hljs-deletion {
    color: ${(props) => props.theme.hljs_deletion_color};
  }
`;

export default function Code(props) {
  console.log(props.selected);

  function changeLanguage(e) {
    props.updateAttributes({
      language: e.target.value,
    });
  }

  function language() {
    return props.node.attrs.language || "auto";
  }

  return (
    <StyleWrapper selected={props.selected}>
      <div className="content">
        {props.editor.isEditable && (
          <select
            contentEditable={false}
            onChange={changeLanguage}
            value={language()}
          >
            <option value="null">auto</option>

            <option disabled>—</option>

            {props.extension.options.lowlight.listLanguages().map((o) => (
              <option value={o} key={o}>
                {o}
              </option>
            ))}
          </select>
        )}

        {!props.editor.isEditable && (
          <span className="language">{language()}</span>
        )}
        <NodeViewContent as={"pre"} className="hljs" />
      </div>
    </StyleWrapper>
  );
}

export const CodeBlockConfig = (options = {}) => {
  let config = {
    name: "CodeBlock",
    tag: "code-block",
    component: Code,
    attributes: {
      url: { default: "" },
    },
  };

  return Object.assign(config, options);
};
