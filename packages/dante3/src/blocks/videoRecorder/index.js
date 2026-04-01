import React from "react";

import ReactMediaRecorder from "./MediaRecorder";
import axios from "axios";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { useCountdownTimer } from "use-countdown-timer";
import { videoRecorderIcon } from "../../icons";

import {
  VideoContainer,
  VideoBody,
  VideoStage,
  StageBackdrop,
  VideoPlayer,
  StageTopBar,
  StageTopGroup,
  StatusPill,
  StatusDot,
  EmptyState,
  EmptyStateCard,
  EmptyIcon,
  EmptyEyebrow,
  EmptyTitle,
  EmptyText,
  ProgressRail,
  ProgressFill,
  RecorderPanel,
  PanelCopy,
  PanelEyebrow,
  PanelTitle,
  PanelText,
  MetaRow,
  MetaItem,
  ActionRow,
  PrimaryAction,
  SecondaryAction,
  GhostAction,
  UploadOverlay,
  UploadCard,
  UploadTitle,
  UploadText,
  UploadSpinner,
} from "./styled";
import { getUrl } from "../blockUtils";

const DEFAULT_RECORDING_TIME = 10000;

function formatTime(ms) {
  const safeMs = Number.isFinite(Number(ms)) ? Math.max(0, Number(ms)) : 0;
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function permissionMessage(reason) {
  switch (reason) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "Allow camera and microphone access to record directly in the editor.";
    case "NotFoundError":
    case "DevicesNotFoundError":
      return "No camera or microphone was found on this device.";
    case "NotReadableError":
    case "TrackStartError":
      return "The camera is busy in another app or the stream could not be started.";
    default:
      return "Camera access failed. Try again and check your browser permissions.";
  }
}

function getPanelCopy({
  rejectedReason,
  uploadError,
  loading,
  isRunning,
  hasDraftClip,
  hasSavedClip,
  maxDurationMs,
  uploadProgress,
}) {
  if (rejectedReason) {
    return {
      tone: "error",
      eyebrow: "Camera blocked",
      title: "This block needs permission before it can record",
      text: rejectedReason,
    };
  }

  if (uploadError) {
    return {
      tone: "error",
      eyebrow: "Upload failed",
      title: "The take is still here, but it was not saved",
      text: uploadError,
    };
  }

  if (loading) {
    return {
      tone: "uploading",
      eyebrow: "Uploading",
      title:
        uploadProgress >= 100
          ? "Processing the video on the server"
          : "Sending your clip",
      text: "Keep the editor open while the upload finishes.",
    };
  }

  if (isRunning) {
    return {
      tone: "recording",
      eyebrow: "Recording live",
      title: "Capture the take you want, then stop when it feels right",
      text: "The clip will stay here for review before it gets uploaded.",
    };
  }

  if (hasDraftClip) {
    return {
      tone: "draft",
      eyebrow: "Preview ready",
      title: "Review this take before you commit it",
      text: "Upload it now or record again if you want a better version.",
    };
  }

  if (hasSavedClip) {
    return {
      tone: "saved",
      eyebrow: "Saved clip",
      title: "This video is already attached to the document",
      text: "You can keep it, replay it, or replace it with a fresh take.",
    };
  }

  return {
    tone: "idle",
    eyebrow: "Video note",
    title: "Record a quick clip without leaving the flow of writing",
    text: `Capture up to ${formatTime(maxDurationMs)} and attach it right inside the block.`,
  };
}

export default function VideoRecorderBlock(props) {
  const mediaRecorder = React.useRef();
  const video = React.useRef();
  const previewUrl = React.useRef(null);

  const [rejectedReason, setRejectedReason] = React.useState("");
  const [fileReady, setFileReady] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [uploadError, setUploadError] = React.useState("");

  const maxDurationMs = Number(
    props.extension.options.seconds_to_record || DEFAULT_RECORDING_TIME
  );

  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: maxDurationMs,
    onExpire: () => {
      mediaRecorder.current && mediaRecorder.current.stop();
    },
  });

  React.useEffect(() => {
    if (props.node.attrs.url) {
      setUrlToVideo(props.node.attrs.url);
    }
  }, []);

  React.useEffect(() => {
    if (!props.node.attrs.url || props.node.attrs.url === "") return;
    setUrlToVideo(props.node.attrs.url);
  }, [props.node.attrs.url]);

  React.useEffect(() => {
    return () => {
      clearPreviewUrl();
      releaseStreamFromVideo();
    };
  }, []);

  function clearPreviewUrl() {
    if (!previewUrl.current) return;
    URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = null;
  }

  function handleGranted() {
    setRejectedReason("");
    setUploadError("");
  }

  function handleDenied(err) {
    setRejectedReason(permissionMessage(err?.name));
  }

  function handleStart(stream) {
    setFileReady(false);
    setLoading(false);
    setLoadingProgress(0);
    setUploadError("");

    clearPreviewUrl();
    setStreamToVideo(stream);

    if (!props.extension.options.seconds_to_record) return;
    start();
  }

  function handleStop(blob) {
    reset();
    releaseStreamFromVideo();

    setFile(blob);
    setFileReady(true);
    setUploadError("");

    setBlobToVideo(blob);
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
    setRejectedReason(
      err?.message || "The camera could not be initialized in this browser."
    );
  }

  function recordMode() {
    if (!video.current) return;
    video.current.loop = false;
    video.current.controls = false;
    video.current.muted = true;
    video.current.playsInline = true;
  }

  function playMode() {
    if (!video.current) return;
    video.current.loop = false;
    video.current.controls = true;
    video.current.muted = true;
    video.current.playsInline = true;
  }

  function setStreamToVideo(stream) {
    if (!video.current) return;

    recordMode();

    try {
      video.current.srcObject = stream;
    } catch (error) {
      clearPreviewUrl();
      previewUrl.current = URL.createObjectURL(stream);
      video.current.src = previewUrl.current;
    }

    video.current.play?.().catch(() => {});
  }

  function setBlobToVideo(blob) {
    if (!video.current) return;

    clearPreviewUrl();
    playMode();

    previewUrl.current = URL.createObjectURL(blob);
    video.current.srcObject = null;
    video.current.src = previewUrl.current;
  }

  function setUrlToVideo(url) {
    if (!video.current) return;

    clearPreviewUrl();
    playMode();
    video.current.srcObject = null;
    video.current.src = url;
  }

  function releaseStreamFromVideo() {
    if (!video.current) return;

    video.current.pause?.();
    video.current.srcObject = null;
  }

  function formatData(currentFile = file) {
    const formData = new FormData();

    if (currentFile) {
      const formName = props.extension.options.upload_formName || "file";
      formData.append(formName, currentFile);
      return formData;
    }

    formData.append("url", props.node.attrs.src);
    return formData;
  }

  function getUploadUrl() {
    const url = props.extension.options.upload_url;
    return typeof url === "function" ? url() : url;
  }

  function getUploadHeaders() {
    return props.extension.options.upload_headers || {};
  }

  function stopLoader() {
    setLoading(false);
  }

  function uploadFile(blob) {
    if (!blob) return;

    setFile(blob);
    setLoading(true);
    setLoadingProgress(0);
    setUploadError("");

    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(
        blob,
        props,
        { uploadCompleted, updateProgressBar, uploadFailed }
      );
    }

    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }

    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(blob),
      onUploadProgress: updateProgressBar,
    })
      .then((result) => {
        uploadCompleted(result.data.url);

        if (props.extension.options.upload_callback) {
          return props.extension.options.upload_callback(result, props);
        }
      })
      .catch((error) => {
        uploadFailed(error);

        if (props.extension.options.upload_error_callback) {
          return props.extension.options.upload_error_callback(error, props);
        }
      });
  }

  function uploadFailed(error) {
    stopLoader();
    setUploadError(
      error?.message ||
        "The upload failed. You can try again or keep the draft in place."
    );
  }

  function uploadCompleted(url) {
    props.updateAttributes({
      url,
    });

    stopLoader();
    setFileReady(false);
    setFile(null);
    setLoadingProgress(100);
    setUploadError("");
    setUrlToVideo(url);
  }

  function updateProgressBar(e) {
    if (!e.lengthComputable) return;
    setLoadingProgress((e.loaded / e.total) * 100);
  }

  function isReadOnly() {
    return !props.editor.isEditable;
  }

  function replayCurrentVideo() {
    if (!video.current) return;
    video.current.currentTime = 0;
    video.current.play?.().catch(() => {});
  }

  const hasDraftClip = Boolean(fileReady && file);
  const hasSavedClip = Boolean(props.node.attrs.url);
  const showEmptyState = !hasDraftClip && !hasSavedClip && !isRunning;
  const remainingMs = isRunning ? countdown : maxDurationMs;
  const recordingProgress = isRunning
    ? ((maxDurationMs - Math.max(0, countdown)) / maxDurationMs) * 100
    : hasDraftClip || hasSavedClip
      ? 100
      : 0;
  const progressTone = loading ? "uploading" : isRunning ? "recording" : "saved";
  const progressValue = loading ? loadingProgress : recordingProgress;
  const panel = getPanelCopy({
    rejectedReason,
    uploadError,
    loading,
    isRunning,
    hasDraftClip,
    hasSavedClip,
    maxDurationMs,
    uploadProgress: loadingProgress,
  });

  return (
    <NodeViewWrapper>
      <VideoContainer>
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
          onStart={handleStart}
          onStop={handleStop}
          onPause={handlePause}
          onResume={handleResume}
          onError={handleError}
          render={({ start, stop }) => (
            <VideoBody>
              <VideoStage contentEditable={false} data-drag-handle="true">
                <VideoPlayer autoPlay muted playsInline ref={video} />
                <StageBackdrop />

                <StageTopBar>
                  <StageTopGroup>
                    <StatusPill tone={panel.tone}>
                      <StatusDot active={isRunning} />
                      {panel.eyebrow}
                    </StatusPill>

                    {(isRunning || hasDraftClip || hasSavedClip) && (
                      <StatusPill tone={isRunning ? "recording" : hasDraftClip ? "draft" : "saved"}>
                        {isRunning ? "Live Preview" : hasDraftClip ? "Draft Clip" : "Attached Video"}
                      </StatusPill>
                    )}
                  </StageTopGroup>

                  <StageTopGroup>
                    <StatusPill tone={loading ? "uploading" : isRunning ? "recording" : "idle"}>
                      {loading ? `${Math.round(loadingProgress)}%` : formatTime(remainingMs)}
                    </StatusPill>
                  </StageTopGroup>
                </StageTopBar>

                {showEmptyState && (
                  <EmptyState>
                    <EmptyStateCard>
                      <EmptyIcon>{videoRecorderIcon()}</EmptyIcon>
                      <EmptyEyebrow>Record In Place</EmptyEyebrow>
                      <EmptyTitle>Camera notes, demos or quick updates.</EmptyTitle>
                      <EmptyText>
                        Start recording from inside the editor, review the take,
                        and only upload it when it is ready.
                      </EmptyText>
                    </EmptyStateCard>
                  </EmptyState>
                )}

                {(isRunning || hasDraftClip || hasSavedClip || loading) && (
                  <ProgressRail>
                    <ProgressFill tone={progressTone} value={progressValue} />
                  </ProgressRail>
                )}

                {loading && (
                  <UploadOverlay>
                    <UploadCard>
                      <UploadSpinner />
                      <UploadTitle>
                        {loadingProgress >= 100
                          ? "Processing the uploaded clip"
                          : "Uploading the current take"}
                      </UploadTitle>
                      <UploadText>
                        {loadingProgress >= 100
                          ? "The transfer is done. Waiting for the final URL."
                          : `Uploaded ${Math.round(
                              loadingProgress
                            )}% so far.`}
                      </UploadText>
                    </UploadCard>
                  </UploadOverlay>
                )}
              </VideoStage>

              {!isReadOnly() && (
                <RecorderPanel contentEditable={false}>
                  <PanelCopy>
                    <PanelEyebrow>{panel.eyebrow}</PanelEyebrow>
                    <PanelTitle>{panel.title}</PanelTitle>
                    <PanelText>{panel.text}</PanelText>

                    <MetaRow>
                      <MetaItem>Max {formatTime(maxDurationMs)}</MetaItem>
                      <MetaItem>
                        {isRunning
                          ? `${formatTime(remainingMs)} left`
                          : hasDraftClip
                            ? "Unsaved preview"
                            : hasSavedClip
                              ? "Saved on this block"
                              : "Ready when you are"}
                      </MetaItem>
                    </MetaRow>
                  </PanelCopy>

                  <ActionRow>
                    {!loading && !isRunning && !hasDraftClip && (
                      <PrimaryAction
                        onClick={(e) => {
                          e.preventDefault();
                          start();
                        }}
                      >
                        {rejectedReason
                          ? "Retry Camera Access"
                          : hasSavedClip
                            ? "Record New Take"
                            : "Start Recording"}
                      </PrimaryAction>
                    )}

                    {!loading && isRunning && (
                      <PrimaryAction
                        tone="danger"
                        onClick={(e) => {
                          e.preventDefault();
                          stop();
                        }}
                      >
                        Stop Recording
                      </PrimaryAction>
                    )}

                    {!loading && hasDraftClip && (
                      <>
                        <SecondaryAction
                          onClick={(e) => {
                            e.preventDefault();
                            start();
                          }}
                        >
                          Record Again
                        </SecondaryAction>

                        <PrimaryAction
                          onClick={(e) => {
                            e.preventDefault();
                            uploadFile(file);
                          }}
                        >
                          Upload Video
                        </PrimaryAction>
                      </>
                    )}

                    {!loading && hasSavedClip && !hasDraftClip && (
                      <GhostAction
                        onClick={(e) => {
                          e.preventDefault();
                          replayCurrentVideo();
                        }}
                      >
                        Replay
                      </GhostAction>
                    )}
                  </ActionRow>
                </RecorderPanel>
              )}

              <NodeViewContent as={"figcaption"} className="imageCaption">
                {props.node.content.size === 0 && (
                  <span className="danteDefaultPlaceholder">
                    type a caption (optional)
                  </span>
                )}
              </NodeViewContent>
            </VideoBody>
          )}
        />
      </VideoContainer>
    </NodeViewWrapper>
  );
}

export const VideoRecorderBlockConfig = (options = {}) => {
  let config = {
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
      caption: { default: null },
      direction: { default: "center" },
      file: { default: null },
    },
    wrapper_class: "graf graf--video",
    selected_class: "is-selected",
    selectedFn: (_block) => {},
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image",
    },
    options: {
      upload_formName: "file",
      upload_handler: (file, ctx) => {
        console.log("UPLOADED FILE", file, ctx);
      },
      seconds_to_record: 10000,
    },
  };

  return Object.assign(config, options);
};

export function VideoRecorderRenderer({ blockKey, data, domain }) {
  const { caption, url } = data;

  return (
    <VideoContainer key={blockKey}>
      <VideoBody>
        <VideoStage>
          <VideoPlayer
            autoPlay
            controls
            muted
            playsInline
            src={getUrl(url, domain)}
          />
          <StageBackdrop />
        </VideoStage>

        {caption && <figcaption className="imageCaption">{caption}</figcaption>}
      </VideoBody>
    </VideoContainer>
  );
}
