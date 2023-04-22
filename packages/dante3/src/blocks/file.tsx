import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import axios from "axios";
import styled from "@emotion/styled";
// import { isEmpty } from "../utils";
import { file as FileIcon } from "../icons.js";
import { getUrl } from "./blockUtils";


export const StyleWrapper = styled(NodeViewWrapper)``;

export default function FileBlock(props: any) {
  // console.log("IMAGE:", props);
  const imageUrl = props.node.attrs.url || props.node.attrs.src;

  let img = null;
  let file = null;

  React.useEffect(() => {
    replaceFile();
  }, []);

  function setImage(url: any) {
    props.updateAttributes({
      url: url,
    });
  }

  function replaceFile() {
    // exit only when not blob and not forceUload
    if (
      !props.node.attrs.url.includes('blob:') &&
      !props.node.attrs.forceUpload
    ) {
      return;
    }
    return handleUpload();
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


  function setActive() {
    props.editor.commands.setNodeSelection(props.getPos());
  }

  return (
    <StyleWrapper
      selected={props.selected}
      as="figure"
      data-drag-handle="true"
    >
      
      <a
        href={imageUrl}
        target="blank"
        className="flex items-center border rounded text-sm text-gray-100 bg-gray-500 border-gray-600 p-2 py-2"
      >
        <FileIcon />
        {getFileNameFromUrl(imageUrl)}
      </a>
    

      {/*loading && (
        <Loader
          toggle={loading}
          progress={loading_progress}
        />
      )*/}

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

function getFileNameFromUrl(url: any) {
  if(!url.includes("://"))
    return url.split("/").at(-1)

  let urlObject = new URL(url);

  const pathname = urlObject.pathname;
  const blobRegex = /^\/([a-zA-Z0-9-_.]+\/){2}([a-zA-Z0-9-_.]+)$/;

  try {
    if (blobRegex.test(pathname)) {
      // Blob URL
      const blobFileName = urlObject.searchParams.get("filename") || "blob-file";
      return blobFileName;
    } else {
      // Regular URL
      const segments = pathname.split("/");
      const fileName = segments[segments.length - 1];
      return fileName;
    }  
  } catch (error) {
    null
  }
}

function Loader(props: any) {
  return (
    <div>
      {props.toggle ? (
        <div className="image-upoader-loader">
          <p>
            {props.progress === 100 ? (
              "processing image..."
            ) : (
              <span>
                <span>loading</span> {Math.round(props.progress)}
              </span>
            )}
          </p>
        </div>
      ) : undefined}
    </div>
  );
}

export const FileBlockConfig = (options = {}) => {
  let config = {
    name: "FileBlock",
    icon: FileIcon,
    tag: "file-block",
    component: FileBlock,
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
        src: data.url, 
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
        tag: "file-block[url]",
      }
    ],
    // renderHTML: function(attributes){},
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "upload",
      insert_block: "FileBlock",
      file_types: '*',
    },
    keyboardShortcuts: (editor: any) => {
      return {
        Enter: ({ editor } : {editor: any}) => {
          if (editor.isActive("FileBlock")) {
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

export function FileBlockRenderer({ blockKey, data, domain }: { blockKey: any, data: any, domain?: any }) {
  const { url, caption } = data;

  return (
    <figure key={blockKey} className={`graf graf--figure`}>
      
      <a
        href={url}
        target="blank"
        className="flex items-center border rounded text-sm text-gray-100 bg-gray-500 border-gray-600 p-2 py-2"
      >
        <FileIcon />
        {getFileNameFromUrl(getUrl(url, domain))}
      </a>

      {caption && caption !== 'type a caption (optional)' && (
        <figcaption className="imageCaption">
          <span>
            <span data-text="true">{caption}</span>
          </span>
        </figcaption>
      )}
    </figure>
  )
}
