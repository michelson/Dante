import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";
import axios from "axios";
import { embed } from "../icons";

export const StyleWrapper = styled(NodeViewWrapper)`
  ${(props) => `border: 3px solid ${props.selected ? "purple" : "black"};`}
`;

export default function EmbedBlock(props) {
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    initializeCard();
  }, []);

  function picture() {
    if (
      props.node.attrs.embed_data.images &&
      props.node.attrs.embed_data.images.length > 0
    ) {
      return props.node.attrs.embed_data.images[0].url;
    } else if (props.node.attrs.embed_data.thumbnail_url) {
      return props.node.attrs.embed_data.thumbnail_url;
    } else if (props.node.attrs.embed_data.image) {
      return props.node.attrs.embed_data.image;
    } else {
      return null;
    }
  }

  function classForImage() {
    if (picture()) {
      return "";
    } else {
      return "mixtapeImage--empty u-ignoreBlock";
    }
  }

  function deleteSelf() {
    props.deleteNode();
  }

  function updateData(data) {
    props.updateAttributes({
      embed_data: data,
    });
  }

  function dataForUpdate() {
    return props.node.attrs;
  }

  function initializeCard() {
    if (!dataForUpdate()) {
      return;
    }

    // ensure data isnt already loaded
    // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text
    if (!dataForUpdate().provisory_text) {
      return;
    }

    return axios({
      method: "get",
      url: `${props.extension.options.endpoint}${
        dataForUpdate().provisory_text
      }&scheme=https`,
    })
      .then((result) => {
        return updateData(result.data); //JSON.parse(data.responseText)
      })
      .catch((error) => {
        setError(error.response.data.error_message);
        return console.log("TODO: error");
      });
  }

  function handleClick(e) {
    //if(!this.props.blockProps.getEditor().props.read_only){
    //  e.preventDefault()
    //}
  }

  function parseEmbedData(){
    if(typeof(props.node.attrs.embed_data) === "string"){
      try {
        return JSON.parse(props.node.attrs.embed_data)        
      } catch (error) {
        return {}
      }
    } else {
      return props.node.attrs.embed_data
    }
  }

  const embed_data = parseEmbedData()

  return (
    <StyleWrapper
      selected={props.selected}
      className={`graf graf--mixtapeEmbed ${
        props.selected ? "is-selected is-mediaFocused" : ""
      }`}
    >
      <NodeViewContent>
        <span contentEditable={false}>
          {picture() ? (
            <a
              target="_blank"
              className={`js-mixtapeImage mixtapeImage ${classForImage()}`}
              href={embed_data.url}
              style={{ backgroundImage: `url('${picture()}')` }}
              rel={"noreferrer"}
            />
          ) : undefined}
          {error ? <h2>{error}</h2> : undefined}

          {
            //!this.props.blockProps.getEditor().props.read_only
            props.editor.isEditable ? (
              <a
                href="#"
                className={"graf--media-embed-close"}
                onClick={deleteSelf}
              >
                x
              </a>
            ) : null
          }

          <a
            className="markup--anchor markup--mixtapeEmbed-anchor"
            target="_blank"
            href={embed_data.url}
            onClick={handleClick}
            contentEditable={false} 
            rel="noreferrer"
          >
            <strong className="markup--strong markup--mixtapeEmbed-strong">
              {embed_data.title}
            </strong>

            <em className="markup--em markup--mixtapeEmbed-em">
              {embed_data.description}
            </em>
          </a>

          <span contentEditable={false}>
            {embed_data.provider_url || embed_data.url}
          </span>
        </span>
      </NodeViewContent>
    </StyleWrapper>
  );
}

export const EmbedBlockConfig = (options = {}) => {
  let config = {
    icon: embed,
    name: "EmbedBlock",
    tag: "embed-block",
    component: EmbedBlock,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "embed",
    },
    options: {
      endpoint: "//noembed.com/embed?url=",
      placeholder:
        "Paste a link to embed content from another site (e.g. Twitter) and press Enter",
    },
    attributes: {
      embed_data: {
        default: {},
      },
      provisory_text: { default: null },
    },
    dataSerializer: (data)=>{
      return {
        ...data, 
        embed_data: JSON.stringify(data.embed_data),
      }
    },
  };

  return Object.assign(config, options);
};
