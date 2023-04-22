import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import axios from "axios";
import styled from "@emotion/styled";
// import { isEmpty } from "../utils";
import MediumImage from "./mediumImage";
import { image } from "../icons";
import ReactMediumZoom from "./mediumImage";
import { getUrl } from "./blockUtils";


export const StyleWrapper = styled(NodeViewWrapper)``;

export default function ImageBlock(props: any) {
  // console.log("IMAGE:", props);
  const imageUrl = props.node.attrs.url || props.node.attrs.src;

  let img = null;
  let file = null;

  React.useEffect(() => {
    replaceImg();
  }, []);

  function setImage(url: any) {
    props.updateAttributes({
      url: url,
    });
  }

  function replaceImg() {
    let img = new Image();
    img.src = imageUrl; //props.node.attrs.src;

    // setImage(img.src)

    // exit only when not blob and not forceUload
    if (!img.src.includes("blob:") && !props.node.attrs.forceUpload) {
      return;
    }

    //if(props.node.attrs.aspect_ratio) return
    img.onload = () => {
      props.updateAttributes({
        width: img.width,
        height: img.height,
        aspect_ratio: getAspectRatio(img.width, img.height),
      });

      return handleUpload();
    }
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
    startLoader()
    uploadFile();
  }

  function formatData() {
    let formData = new FormData();
    if (props.node.attrs.file) {
      let formName = props.extension.options.upload_formName || 'file'

      formData.append(formName, props.node.attrs.file);
      return formData;
    } else {
      // TODO: check this
      formData.append("url", props.node.attrs.src);
      return formData;
    }
  }

  function uploadFile() {
    // custom upload handler
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(
        formatData().get("file"),
        props
      );
    }

    if (!props.extension.options.upload_url){
      stopLoader()
      return
    }

    //this.props.blockProps.addLock()

    function getUploadUrl() {
      let url = props.extension.options.upload_url
      if (typeof url === "function") {
        return url();
      } else {
        return url;
      }
    }

    function getUploadHeaders() {
      return props.extension.options.upload_headers || {}
    }

    axios({
      method: 'post',
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(),
      onUploadProgress: e => {
				console.log("PROCVESSS ", e)
        return updateProgressBar(e)
      }
    }).then(result => {
      uploadCompleted(result.data.url)
        if (props.extension.options.upload_callback) {
          return props.extension.options.upload_callback(result, props)
        }
    }).catch(error => {
      //this.uploadFailed()
      console.log(`ERROR: got error uploading file ${ error }`)
      if (props.extension.options.upload_error_callback) {
        return props.extension.options.upload_error_callback(error, props)
      }
    })

    return (json_response: any) => {
      // return uploadCompleted("https://i.imgur.com/XUWx1hA.jpeg");
      return uploadCompleted(json_response.url)
    }
  }

  function uploadCompleted(url: any) {
    setImage(url);
    //this.props.blockProps.removeLock()
    stopLoader()
    file = null;
  }

  function updateProgressBar(e: any) {
    let complete = props.node.attrs.loading_progress
    if (e.lengthComputable) {
      complete = e.loaded / e.total * 100
      complete = complete != null ? complete : { complete: 0 }
      props.updateAttributes({ loading_progress: complete })
      console.log(`complete: ${ complete }`)
    }
  }

  function getAspectRatio(w: any, h: any) {
    let maxWidth = 1000;
    let maxHeight = 1000;
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

    let fill_ratio = (height / width) * 100;
    let result = { width, height, ratio: fill_ratio };
    // console.log result
    return result;
  }

  function setActive() {
    props.editor.commands.setNodeSelection(props.getPos());
  }

  function handleClick(e: any) {
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

  function parseAspectRatio(){
    if(typeof(props.node.attrs.aspect_ratio) === "string"){
      try {
        return JSON.parse(props.node.attrs.aspect_ratio)        
      } catch (error) {
        return {}
      }
    } else {
      return props.node.attrs.aspect_ratio
    }
  }

  const { width, height, ratio } = parseAspectRatio();
  return (
    <StyleWrapper
      selected={props.selected}
      as="figure"
      data-drag-handle="true"
      className={`graf graf--figure ${directionClass()} ${
        props.selected ? "is-selected is-mediaFocused" : ""
      }`}
    >
      <div
        onClick={handleClick}
        className="aspectRatioPlaceholder is-locked"
        style={{
          maxHeight: height,
          maxWidth: width,
        }}
      >
        <div
          className="aspect-ratio-fill"
          style={{ paddingBottom: `${ratio}%` }}
        />

        {/*<img
          src={imageUrl}
          height={width}
          width={height}
          className="graf-image"
          contentEditable={false}
          alt={imageUrl}
        />*/}

        <MediumImage
          src={imageUrl}
          height={width}
          width={height}
          className={`graf-image ${props.editor.isEditable ? ".no-zoom" : ""}`}
          disabled={props.editor.isEditable}
          contentEditable={false}
          isEditable={props.editor.isEditable}
          //onOpen={() => {
          //  return false;
          //}}
          //onClosed={() => console.log("Image closed")}
        />
      </div>

      <NodeViewContent as={"figcaption"} className="imageCaption">
        {props.node.content.size === 0 && (
          <span className="danteDefaultPlaceholder">
            type a caption (optional)
          </span>
        )}
      </NodeViewContent>
    </StyleWrapper>
  );
}

export const ImageBlockConfig = (options = {}) => {
  let config = {
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
      caption: { default: null },
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
    dataSerializer: (data: any)=>{
      return {
        ...data,
        src: data.url || data.src,
        url: data.src,
        aspect_ratio: JSON.stringify(data.aspect_ratio),
        file: null
      }
    },
    options: {
      upload_handler: (file: any, ctx: any) => {
        console.log("UPLOADED FILE", file)
      },
    },
    parseHTML: [
      {
        tag: "image-block[src]",
      },
      {
        tag: "img[src]",
      },
    ],
    // renderHTML: function(attributes){},
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "upload",
      insert_block: "ImageBlock",
      file_types: "image/*",
    },
    keyboardShortcuts: (editor: any) => {
      return {
        Enter: ({ editor } : {editor: any}) => {
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


export function ImageRenderer({ blockKey, data, domain }: { blockKey: any, data: any, domain?: any }) {

  const { url, src, aspect_ratio, caption } = data;

  var height, width, ratio;

  if (!aspect_ratio) {
    height = '100%';
    width = '100%';
    ratio = '100';
  } else {
    height = aspect_ratio.height;
    width = aspect_ratio.width;
    ratio = aspect_ratio.ratio;
  }

  const defaultStyle = { maxWidth: `${width}px`, maxHeight: `${height}px` };

  function directionClass(direction: any) {
    switch (direction) {
      case 'left':
        return 'graf--layoutOutsetLeft';
      case 'center':
        return '';
      case 'wide':
        return 'sectionLayout--fullWidth';
      case 'fill':
        return 'graf--layoutFillWidth';
      default:
        return '';
    }
  }

  let defaultAlignment = directionClass(data.direction);

  function resolveCaption(){
    if(!caption) return getSrc()
    if(caption === "type a caption (optional)") return url
    return caption
  }

  function getSrc(){
    return url || src
  }

  return (
    <figure key={blockKey} className={`graf graf--figure ${defaultAlignment}`}>
      <div>
        <div className="aspectRatioPlaceholder is-locked" style={defaultStyle}>
          <div
            className="aspect-ratio-fill"
            style={{ paddingBottom: `${ratio}%` }}
          ></div>

          <ReactMediumZoom 
            src={getUrl(getSrc(), domain)} 
            width={width} 
            height={height} 
            className={"graf-image medium-zoom-image"}
            alt={resolveCaption()}
          />
        </div>
      </div>

      {caption && caption !== 'type a caption (optional)' && (
        <figcaption className="imageCaption">
          <span>
            <span data-text="true">{caption}</span>
          </span>
        </figcaption>
      )}
    </figure>
  );
}