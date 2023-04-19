import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";
import axios from "axios";
import { embed } from "../icons";

export const StyleWrapper = styled(NodeViewWrapper)`
  ${(props) => `border: 3px solid ${props.selected ? "purple" : "black"};`}
`;

function picture(embed_data: any) {
  if (
    embed_data.images &&
    embed_data.images.length > 0
  ) {
    return embed_data.images[0].url;
  } else if (embed_data.thumbnail_url) {
    return embed_data.thumbnail_url;
  } else if (embed_data.image) {
    return embed_data.image;
  } else {
    return null;
  }
}

function classForImage(embed_data: any) {
  if (picture(embed_data)) {
    return "";
  } else {
    return "mixtapeImage--empty u-ignoreBlock";
  }
}

export default function EmbedBlock(props: any) {
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    initializeCard();
  }, []);

  function deleteSelf() {
    props.deleteNode();
  }

  function updateData(data: any) {
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

  function handleClick(e: any) {
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
      data-drag-handle="true"
      selected={props.selected}
      className={`graf graf--mixtapeEmbed ${
        props.selected ? "is-selected is-mediaFocused" : ""
      }`}
    >
      {/*<NodeViewContent>*/}
        <span contentEditable={false}>
          {picture(embed_data) ? (
            <a
              target="_blank"
              className={`js-mixtapeImage mixtapeImage ${classForImage(embed_data)}`}
              href={embed_data.url}
              style={{ backgroundImage: `url('${picture(embed_data)}')` }}
              rel={"noreferrer"}
            > </a>
          ) : undefined}
          {error ? <h2>{error}</h2> : undefined}

          {
            //!this.props.blockProps.getEditor().props.read_only
            props.editor.isEditable ? (
              <button
                type="button"
                className={"graf--media-embed-close"}
                onClick={deleteSelf}
              >
                x
              </button>
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
      {/*</NodeViewContent>*/}
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
        "Paste a link to embed content from another site (e.g. Twitter) and press Enter"
    },
    attributes: {
      embed_data: {
        default: {},
      },
      provisory_text: { default: null },
    },
    dataSerializer: (data: any)=>{
      return {
        ...data, 
        embed_data: JSON.stringify(data.embed_data),
      }
    },
  };

  return Object.assign(config, options);
};

export function EmbedBlockRenderer({ blockKey, data }: { blockKey: any, data: any }) {

  const {embed_data} = data

  return (

    <div
      className={"graf graf--mixtapeEmbed"}
    >

      <span contentEditable={false}>
        {picture(embed_data) ? (
          <a
            target="_blank"
            className={`js-mixtapeImage mixtapeImage ${classForImage(embed_data)}`}
            href={embed_data.url}
            style={{ backgroundImage: `url('${picture(embed_data)}')` }}
            rel={"noreferrer"}
          > </a>
        ) : undefined}

        <a
          className="markup--anchor markup--mixtapeEmbed-anchor"
          target="_blank"
          href={embed_data.url}
          rel="noreferrer"
        >
          <strong className="markup--strong markup--mixtapeEmbed-strong">
            {embed_data.title}
          </strong>

          <em className="markup--em markup--mixtapeEmbed-em">
            {embed_data.description}
          </em>
        </a>

        <span>
          {embed_data.provider_url || embed_data.url}
        </span>
      </span>

    </div>

  )
}

