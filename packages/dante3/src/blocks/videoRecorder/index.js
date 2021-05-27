import React, { Component } from "react";

import ReactMediaRecorder from "./MediaRecorder";
import { videoRecorderIcon as icon } from "../../icons";
//import { updateDataOfBlock, addNewBlockAt } from '../../../model/index.js'
import axios from "axios";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { useCountdownTimer } from "use-countdown-timer";
import { videoRecorderIcon } from "../../icons";

import {
  VideoContainer,
  VideoBody,
  RecordActivity,
  EditorControls,
  StatusBar,
  VideoPlayer,
  SecondsLeft,
  RecButton,
  Button,
} from "./styled";

export default function VideoRecorderBlock(props) {
  let file = null;
  let app = React.useRef();
  let mediaRecorder = React.useRef();
  let video = React.useRef();
  let stopTimeout = null;
  let secondInterval = null;

  const [granted, setGranted] = React.useState(false);
  const [rejectedReason, setRejectedReason] = React.useState("");
  const [fileReady, setFileReady] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(null);

  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: props.extension.options.seconds_to_record,
    onExpire: () => {
      mediaRecorder.current && mediaRecorder.current.stop();
    },
  });

  React.useEffect(() => {
    //video = app.current.querySelector('video');
    if (props.node.attrs.url) {
      setUrlToVideo(props.node.attrs.url);
      playMode();
    }
  }, []);

  React.useEffect(() => {
    if (!props.node.attrs.url || props.node.attrs.url === "") return;
    video.current.src = props.node.attrs.url;
  }, [props.node.attrs.url]);

  function handleGranted() {
    setGranted(true);
    console.log("Permission Granted!");
  }

  function handleDenied(err) {
    setRejectedReason(err.name);
    console.log("Permission Denied!", err);
  }

  /*React.useEffect(()=>{
    if(recording && secondsLeft === props.extension.seconds_to_record){
    }
  }, [recording, secondsLeft])*/

  function handleStart(stream) {
    setFileReady(false);

    setStreamToVideo(stream);
    console.log("Recording Started.");

    // max seconds to record video
    if (!props.extension.options.seconds_to_record) return;
    start();
  }

  function handleStop(blob) {
    reset();

    setFileReady(true);

    releaseStreamFromVideo();

    console.log("Recording Stopped.");
    file = blob;
    setStreamToVideo(file);
    playMode();
  }

  function confirm() {
    downloadVideo(file);
  }

  function handlePause() {
    releaseStreamFromVideo();
    pause();
  }

  function handleResume(stream) {
    setStreamToVideo(stream);
    pause();
  }

  function handleError(err) {
    console.log(err);
  }

  function recordMode() {
    video.current.loop = false;
    video.current.controls = false;
    video.current.muted = true;
  }

  function playMode() {
    video.current.loop = false;
    video.current.controls = true;
    video.current.muted = true;
  }

  function setStreamToVideo(stream) {
    //let video = app.current.querySelector('video');
    recordMode(video);
    // is a mediastream
    try {
      video.current.srcObject = stream;
    } catch (error) {
      video.current.src = URL.createObjectURL(stream);
    }
  }

  function setUrlToVideo(url) {
    playMode();
    video.current.src = url;
  }

  function releaseStreamFromVideo() {
    video.current.src = "";
    video.current.srcObject = null;
  }

  function downloadVideo(blob) {
    //video.current.loop = true
    setStreamToVideo(blob);
    playMode();
    uploadFile(blob);
  }

  function formatData() {
    let formData = new FormData();

    if (file) {
      let formName = props.extension.options.upload_formName || "file";

      formData.append(formName, file);
      return formData;
    } else {
      //formData.append('url', this.props.blockProps.data.get("url"))
      formData.append("url", props.node.attrs.url);
      return formData;
    }
  }

  function getUploadUrl() {
    let url = props.extension.options.upload_url;
    if (typeof url === "function") {
      return url();
    } else {
      return url;
    }
  }

  function getUploadHeaders() {
    return props.extension.options.upload_headers || {};
  }

  function stopLoader() {
    setLoading(false);
    setFileReady(false);
  }

  function uploadFile(blob) {
    file = blob;

    // custom upload handler
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(
        formatData().get("file"),
        props,
        { uploadCompleted, updateProgressBar, uploadFailed }
      );
    }

    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }

    setLoading(true);

    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(),
      onUploadProgress: (e) => {
        return updateProgressBar(e);
      },
    })
      .then((result) => {
        uploadCompleted(result.data.url);

        if (props.extension.options.upload_callback) {
          return props.extension.options.upload_callback(result, this);
        }
      })
      .catch((error) => {
        uploadFailed();

        console.log(`ERROR: got error uploading file ${error}`);
        if (props.extension.options.upload_error_callback) {
          return props.extension.options.upload_error_callback(error, this);
        }
      });

    return (json_response) => {
      return uploadCompleted(json_response.url);
    };
  }

  function uploadFailed() {
    //this.props.blockProps.removeLock()
    stopLoader();
  }

  function uploadCompleted(url) {
    props.updateAttributes({
      url: url,
    });
    //this.setState({ url }, this.updateData)
    //this.props.blockProps.removeLock()
    stopLoader();
    file = null;
    setUrlToVideo(url);
  }

  function updateProgressBar(e) {
    let complete = loadingProgress;
    if (e.lengthComputable) {
      complete = (e.loaded / e.total) * 100;
      complete = complete != null ? complete : { complete: 0 };

      setLoadingProgress(complete);

      return console.log(`complete: ${complete}`);
    }
  }

  function isReadOnly() {
    return !props.editor.isEditable;
  }

  function placeHolderEnabled() {
    return "placeholder";
    //return state.enabled || 'placehlder'
  }

  function placeholderText() {
    return (
      props.extension.options.image_caption_placeholder ||
      "caption here (optional)"
    );
  }

  function defaultPlaceholder() {
    return "default placeholder";
  }

  return (
    <NodeViewWrapper>
      <VideoContainer ref={app}>
        <ReactMediaRecorder
          ref={mediaRecorder}
          constraints={{
            audio: {
              sampleSize: 16,
              channelCount: 2,
              echoCancellation: true,
              noiseSuppression: false,
            },
            video: true,
          }}
          timeSlice={10}
          onGranted={handleGranted}
          onDenied={handleDenied}
          onStart={(stream) => handleStart(stream)}
          onStop={handleStop}
          onPause={handlePause}
          onResume={handleResume}
          onError={handleError}
          render={({ start, stop, pause, resume }) => (
            <div>
              {!isReadOnly() && (
                <StatusBar contentEditable={false} loading={loading}>
                  {loading && (
                    <Loader toggle={loading} progress={loadingProgress} />
                  )}
                </StatusBar>
              )}

              <VideoBody>
                {!isReadOnly() && (
                  <EditorControls contentEditable={false}>
                    <div className="controls-recording">
                      {!loading && (
                        <React.Fragment>
                          <RecButton
                            onClick={(e) => {
                              e.preventDefault();
                              isRunning ? stop() : start();
                            }}
                            disabled={isRunning}
                            className={isRunning ? "recording" : ""}
                          >
                            {isRunning
                              ? `recording. (${countdown / 1000} seconds left)`
                              : `press button to start recording`}

                            {rejectedReason && <span>{rejectedReason}</span>}
                          </RecButton>

                          <SecondsLeft></SecondsLeft>
                        </React.Fragment>
                      )}
                    </div>
                    {fileReady && !loading && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          confirm();
                        }}
                      >
                        confirm recording upload ?
                      </Button>
                    )}
                  </EditorControls>
                )}

                <VideoPlayer autoPlay muted ref={video} />

                <NodeViewContent as={"figcaption"} className="imageCaption">
                  {props.node.content.size === 0 && (
                    <span className="danteDefaultPlaceholder">
                      type a caption (optional)
                    </span>
                  )}
                </NodeViewContent>

                {/*<figcaption className='imageCaption' onMouseDown={this.handleFocus}>
                { this.props.block.getText().length === 0 ? 
                  <span className="danteDefaultPlaceholder">
                    {this.placeholderText()}
                </span> : undefined }
                {<EditorBlock {...Object.assign({}, this.props, { 
                  "editable": true, "className": "imageCaption" })
                  } />}
                </figcaption>*/}
              </VideoBody>
            </div>
          )}
        />
      </VideoContainer>
    </NodeViewWrapper>
  );
}

function Loader({ toggle, progress }) {
  return (
    <React.Fragment>
      {toggle && (
        <div
          className="image-upoader-loader"
          style={{ width: "100%", textAlign: "center" }}
        >
          <p>
            {progress === 100 ? (
              "processing video..."
            ) : (
              <span>
                <span>uploading video </span>
                {Math.round(progress)}%
              </span>
            )}
          </p>
        </div>
      )}
    </React.Fragment>
  );
}

export const VideoRecorderBlockConfig = (options = {}) => {
  return {
    name: "VideoRecorderBlock",
    icon: videoRecorderIcon,
    tag: "recorded-video",
    component: VideoRecorderBlock,
    atom: false,
    attributes: {
      url: { default: null },
      src: { default: null },
      width: { default: "" },
      height: { default: "" },
      loading: { default: false },
      loading_progress: { default: 0 },
      caption: { default: "caption!" },
      direction: { default: "center" },
      file: { default: null },
    },

    wrapper_class: "graf graf--video",
    selected_class: "is-selected",
    selectedFn: (_block) => {},
    /* handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  },
  handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(RichUtils.insertSoftNewline(editorState))
    //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
  }, */
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image",
    },
    options: {
      upload_formName: "file",
      /*upload_handler: (file, props, { uploadCompleted }) => {
        console.log("UPLOADED video");
        const url =
          "https://video.twimg.com/ext_tw_video/1388976569348235264/pu/vid/960x720/mCVk3dF_nGTgIZLX.mp4?tag=12";
        uploadCompleted(url);
      },*/
      seconds_to_record: 10000,
    },
  };
};
