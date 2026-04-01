import React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import styled from "@emotion/styled";
import axios from "axios";
import { useCountdownTimer } from "use-countdown-timer";
import { CheckIcon, DeleteIcon, MicIcon } from "../icons";
import { getUrl } from "./blockUtils";

const DEFAULT_RECORDING_TIME = 120000;

function formatTime(ms: number) {
  const safeMs = Number.isFinite(Number(ms)) ? Math.max(0, Number(ms)) : 0;
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function permissionMessage(reason?: string) {
  switch (reason) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "Allow microphone access to record audio directly in the editor.";
    case "NotFoundError":
    case "DevicesNotFoundError":
      return "No microphone was found on this device.";
    case "NotReadableError":
    case "TrackStartError":
      return "The microphone is busy in another app or could not be started.";
    default:
      return "The microphone could not be initialized. Check browser permissions and try again.";
  }
}

const AudioCard = styled(NodeViewWrapper)`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background:
    radial-gradient(circle at top left, rgba(34, 211, 238, 0.16), transparent 32%),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 30%),
    linear-gradient(180deg, rgba(7, 12, 24, 0.98), rgba(3, 6, 14, 1));
  box-shadow:
    0 22px 54px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
`;

const AudioStage = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 250px;
  padding: 24px;
  background:
    radial-gradient(circle at center, rgba(17, 24, 39, 0.44), transparent 52%),
    linear-gradient(180deg, rgba(7, 11, 24, 0.76), rgba(2, 6, 16, 0.96));
`;

const AudioBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(3, 6, 16, 0.08) 0%, rgba(3, 6, 16, 0.66) 100%),
    radial-gradient(circle at 18% 22%, rgba(34, 211, 238, 0.18), transparent 22%),
    radial-gradient(circle at 82% 24%, rgba(96, 165, 250, 0.16), transparent 24%);
`;

const StageTopBar = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  z-index: 2;
  pointer-events: none;
`;

const StageTopGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StatusPill = styled.div<{ tone?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${(props) =>
    props.tone === "recording"
      ? "rgba(255, 91, 102, 0.16)"
      : props.tone === "draft"
        ? "rgba(255, 198, 92, 0.16)"
        : props.tone === "saved"
          ? "rgba(109, 226, 192, 0.16)"
          : props.tone === "uploading"
            ? "rgba(145, 158, 255, 0.16)"
            : props.tone === "error"
              ? "rgba(255, 120, 117, 0.16)"
              : "rgba(103, 232, 249, 0.12)"};
  border: 1px solid
    ${(props) =>
      props.tone === "recording"
        ? "rgba(255, 91, 102, 0.35)"
        : props.tone === "draft"
          ? "rgba(255, 198, 92, 0.30)"
          : props.tone === "saved"
            ? "rgba(109, 226, 192, 0.30)"
            : props.tone === "uploading"
              ? "rgba(145, 158, 255, 0.30)"
              : props.tone === "error"
                ? "rgba(255, 120, 117, 0.34)"
                : "rgba(103, 232, 249, 0.25)"};
  color: ${(props) =>
    props.tone === "recording"
      ? "#ffe0e3"
      : props.tone === "draft"
        ? "#fff0c8"
        : props.tone === "saved"
          ? "#dcfff2"
          : props.tone === "uploading"
            ? "#e4e7ff"
            : props.tone === "error"
              ? "#ffe2df"
              : "#d8fbff"};
  backdrop-filter: blur(18px);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.2);
`;

const StatusDot = styled.span<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08);
  animation: ${(props) => (props.active ? "pulseDot 1.25s infinite" : "none")};

  @keyframes pulseDot {
    0% {
      transform: scale(1);
      opacity: 0.82;
    }
    50% {
      transform: scale(1.35);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.82;
    }
  }
`;

const AudioCenter = styled.div`
  position: relative;
  z-index: 1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AudioCenterCard = styled.div`
  width: min(100%, 560px);
  padding: 26px 26px 24px;
  border-radius: 24px;
  border: 1px solid rgba(103, 232, 249, 0.18);
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.72), rgba(2, 6, 23, 0.92));
  box-shadow:
    0 24px 48px rgba(2, 6, 23, 0.35),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
  text-align: left;
  color: #e5f6ff;
`;

const AudioBadge = styled.div`
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 18px;
  background:
    linear-gradient(135deg, rgba(34, 211, 238, 0.22), rgba(59, 130, 246, 0.18));
  box-shadow: 0 16px 28px rgba(2, 6, 23, 0.26);

  svg {
    width: 34px;
    height: 34px;
  }
`;

const AudioEyebrow = styled.div`
  color: rgba(103, 232, 249, 0.88);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const AudioTitle = styled.h3`
  margin: 10px 0 8px;
  color: #f8fbff;
  font-size: 28px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

const AudioText = styled.p`
  margin: 0;
  color: rgba(226, 237, 255, 0.72);
  font-size: 15px;
  line-height: 1.55;
`;

const Waveform = styled.div<{ active?: boolean }>`
  margin-top: 22px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 64px;

  span {
    display: block;
    width: 10px;
    border-radius: 999px;
    background: linear-gradient(180deg, #7ff3ff, #83ffd5);
    box-shadow: 0 10px 20px rgba(127, 243, 255, 0.18);
    animation: ${(props) => (props.active ? "waveBounce 1.15s ease-in-out infinite" : "none")};
    transform-origin: bottom center;
  }

  span:nth-of-type(1) { height: 20px; animation-delay: 0.00s; }
  span:nth-of-type(2) { height: 44px; animation-delay: 0.08s; }
  span:nth-of-type(3) { height: 28px; animation-delay: 0.16s; }
  span:nth-of-type(4) { height: 58px; animation-delay: 0.24s; }
  span:nth-of-type(5) { height: 34px; animation-delay: 0.32s; }
  span:nth-of-type(6) { height: 50px; animation-delay: 0.40s; }
  span:nth-of-type(7) { height: 24px; animation-delay: 0.48s; }
  span:nth-of-type(8) { height: 40px; animation-delay: 0.56s; }

  @keyframes waveBounce {
    0%, 100% {
      transform: scaleY(0.7);
      opacity: 0.65;
    }
    50% {
      transform: scaleY(1.15);
      opacity: 1;
    }
  }
`;

const StageAudio = styled.audio`
  width: 100%;
  margin-top: 22px;
  filter: saturate(0.95) brightness(1.05);
`;

const UploadOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(2, 6, 23, 0.54);
  backdrop-filter: blur(10px);
`;

const UploadCard = styled.div`
  width: min(100%, 360px);
  padding: 22px 22px 18px;
  border-radius: 20px;
  border: 1px solid rgba(145, 158, 255, 0.28);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(3, 6, 16, 0.94));
  text-align: center;
  box-shadow: 0 24px 48px rgba(2, 6, 23, 0.34);
`;

const UploadSpinner = styled.div`
  width: 44px;
  height: 44px;
  margin: 0 auto 14px;
  border-radius: 999px;
  border: 3px solid rgba(255, 255, 255, 0.16);
  border-top-color: #7ff3ff;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const UploadTitle = styled.div`
  color: #f8fbff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const UploadText = styled.div`
  margin-top: 8px;
  color: rgba(226, 237, 255, 0.72);
  font-size: 14px;
  line-height: 1.5;
`;

const ProgressRail = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 16px;
  z-index: 2;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
`;

const ProgressFill = styled.div<{ tone?: string; value?: number }>`
  height: 100%;
  width: ${(props) => `${props.value || 0}%`};
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      ${(props) => (props.tone === "recording" ? "#ff5b66" : props.tone === "uploading" ? "#8b9cff" : "#6de2c0")},
      ${(props) => (props.tone === "recording" ? "#ff8a7a" : props.tone === "uploading" ? "#65e4ff" : "#8af6d8")}
    );
  transition: width 180ms ease;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: flex-end;
  justify-content: space-between;
  padding: 18px 20px 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const PanelCopy = styled.div`
  flex: 1 1 280px;
  min-width: 0;
`;

const PanelEyebrow = styled.div`
  color: rgba(103, 232, 249, 0.84);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const PanelTitle = styled.h4`
  margin: 8px 0 6px;
  color: #f8fbff;
  font-size: 22px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;
`;

const PanelText = styled.p`
  margin: 0;
  color: rgba(226, 237, 255, 0.72);
  font-size: 14px;
  line-height: 1.55;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(240, 248, 255, 0.88);
  font-size: 12px;
  font-weight: 600;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;

const baseButton = `
  min-height: 46px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const PrimaryAction = styled.button<{ tone?: string }>`
  ${baseButton}
  color: #06111d;
  background: ${(props) =>
    props.tone === "danger"
      ? "linear-gradient(135deg, #ff6b74, #ff8f67)"
      : "linear-gradient(135deg, #7ff3ff, #83ffd5)"};
  box-shadow:
    0 16px 28px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.35) inset;
`;

const SecondaryAction = styled.button`
  ${baseButton}
  color: #ecf9ff;
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.18);
`;

const GhostAction = styled.button`
  ${baseButton}
  color: rgba(226, 237, 255, 0.88);
  background: transparent;
  border-color: rgba(255, 255, 255, 0.14);
`;

export default function AudioRecorderBlock(props: any) {
  const maxDurationMs = Number(
    (props.extension.options.seconds_to_record || 120) * 1000
  );

  const [recording, setRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(
    props.node.attrs.url || null
  );
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [permissionError, setPermissionError] = React.useState("");
  const [uploadError, setUploadError] = React.useState("");

  const stream = React.useRef<MediaStream | null>(null);
  const mediaRecorder = React.useRef<any>(null);
  const audioElement = React.useRef<HTMLAudioElement | null>(null);
  const draftUrl = React.useRef<string | null>(null);

  const { countdown, start, reset } = useCountdownTimer({
    timer: maxDurationMs,
    onExpire: () => stopRecording(),
  });

  React.useEffect(() => {
    if (props.node.attrs?.url) {
      setAudioUrl(props.node.attrs.url);
    }
  }, [props?.node?.attrs?.url]);

  React.useEffect(() => {
    return () => {
      cleanupStream();
      clearDraftUrl();
    };
  }, []);

  function clearDraftUrl() {
    if (!draftUrl.current) return;
    URL.revokeObjectURL(draftUrl.current);
    draftUrl.current = null;
  }

  function cleanupStream() {
    stream.current?.getTracks?.().forEach((track) => track.stop());
    stream.current = null;
    mediaRecorder.current = null;
  }

  function setAudioSource(url: string | null) {
    if (!audioElement.current) return;
    if (!url) {
      audioElement.current.removeAttribute("src");
      audioElement.current.load();
      return;
    }
    audioElement.current.src = url;
    audioElement.current.load();
  }

  async function startRecording() {
    setPermissionError("");
    setUploadError("");
    setLoading(false);
    setLoadingProgress(0);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("unsupported-media-devices");
      }

      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = userStream;
      setAudioBlob(null);
      setAudioUrl(null);
      clearDraftUrl();

      const recorder = new MediaRecorder(userStream);
      const chunks: BlobPart[] = [];

      recorder.addEventListener("dataavailable", (event: any) => {
        if (event.data && event.data.size > 0) {
          chunks.push(event.data);
        }
      });

      recorder.addEventListener("stop", () => {
        const mimeType = recorder.mimeType || "audio/webm";
        const nextAudioBlob = new Blob(chunks, { type: mimeType });
        clearDraftUrl();
        draftUrl.current = URL.createObjectURL(nextAudioBlob);
        setAudioBlob(nextAudioBlob);
        setAudioUrl(draftUrl.current);
        setAudioSource(draftUrl.current);
        cleanupStream();
      });

      mediaRecorder.current = recorder;
      recorder.start();
      setRecording(true);
      start();
    } catch (error: any) {
      setPermissionError(
        error?.message === "unsupported-media-devices"
          ? "This browser does not support in-editor audio recording."
          : permissionMessage(error?.name)
      );
      setAudioUrl(props.node.attrs.url || audioUrl || null);
      cleanupStream();
    }
  }

  function stopRecording() {
    if (!mediaRecorder.current) return;
    if (mediaRecorder.current.state === "inactive") return;

    mediaRecorder.current.stop();
    setRecording(false);
    reset();
  }

  function discardDraft() {
    clearDraftUrl();
    setAudioBlob(null);
    setAudioUrl(props.node.attrs.url || null);
    setUploadError("");
    setPermissionError("");
  }

  function replayAudio() {
    if (!audioElement.current) return;
    audioElement.current.currentTime = 0;
    audioElement.current.play?.().catch(() => {});
  }

  function stopLoader() {
    setLoading(false);
  }

  function updateProgressBar(e: any) {
    if (!e.lengthComputable) return;
    setLoadingProgress((e.loaded / e.total) * 100);
  }

  function getUploadUrl() {
    const url = props.extension.options.upload_url;
    return typeof url === "function" ? url() : url;
  }

  function getUploadHeaders() {
    return props.extension.options.upload_headers || {};
  }

  function uploadFailed(error?: any) {
    stopLoader();
    setUploadError(
      error?.message ||
        "The audio upload failed. You can try again without losing the current take."
    );
  }

  function uploadCompleted(url: string, cb?: Function) {
    props.updateAttributes({ url });
    stopLoader();
    setLoadingProgress(100);
    setAudioBlob(null);
    setAudioUrl(url);
    setAudioSource(url);
    setUploadError("");
    cb && cb();
  }

  async function uploadRecording() {
    if (!audioBlob) return;

    let file: any = audioBlob;
    if (!file.name) {
      const extension =
        audioBlob.type.includes("mpeg")
          ? "mp3"
          : audioBlob.type.includes("mp4")
            ? "m4a"
            : "webm";
      file = new File([audioBlob], `audio-note.${extension}`, {
        type: audioBlob.type || "audio/webm",
      });
    }

    setLoading(true);
    setLoadingProgress(0);
    setUploadError("");

    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(file, props, {
        uploadCompleted,
        updateProgressBar,
        uploadFailed,
      });
    }

    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }

    const formData = new FormData();
    const formName = props.extension.options.upload_formName || "file";
    formData.append(formName, file);

    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formData,
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

  const hasDraftAudio = Boolean(audioBlob && audioUrl);
  const hasSavedAudio = Boolean(props.node.attrs.url);
  const showEmptyState = !recording && !hasDraftAudio && !hasSavedAudio;
  const progressTone = loading ? "uploading" : recording ? "recording" : "saved";
  const progressValue = loading
    ? loadingProgress
    : recording
      ? ((maxDurationMs - Math.max(0, countdown)) / maxDurationMs) * 100
      : hasDraftAudio || hasSavedAudio
        ? 100
        : 0;

  const panelTone = permissionError
    ? "error"
    : uploadError
      ? "error"
      : loading
        ? "uploading"
        : recording
          ? "recording"
          : hasDraftAudio
            ? "draft"
            : hasSavedAudio
              ? "saved"
              : "idle";

  const panelEyebrow = permissionError
    ? "Mic blocked"
    : uploadError
      ? "Upload failed"
      : loading
        ? "Uploading"
        : recording
          ? "Recording live"
          : hasDraftAudio
            ? "Preview ready"
            : hasSavedAudio
              ? "Saved clip"
              : "Voice note";

  const panelTitle = permissionError
    ? "This block needs microphone access before it can record"
    : uploadError
      ? "The take is still here, but it was not saved"
      : loading
        ? "Sending the current audio clip"
        : recording
          ? "Speak naturally and stop when the note is done"
          : hasDraftAudio
            ? "Review this take before you commit it"
            : hasSavedAudio
              ? "This audio note is already attached to the document"
              : "Capture a quick audio note without breaking the writing flow";

  const panelText = permissionError
    ? permissionError
    : uploadError
      ? uploadError
      : loading
        ? "Keep the editor open while the upload finishes."
        : recording
          ? "The clip stays local until you upload it, so you can retry without friction."
          : hasDraftAudio
            ? "Upload it now or discard it and record again."
            : hasSavedAudio
              ? "Replay it or replace it with a fresh take."
              : `Capture up to ${formatTime(maxDurationMs)} directly inside this block.`;

  return (
    <AudioCard as="figure" selected={props.selected}>
      <AudioStage contentEditable={false} data-drag-handle="true">
        <AudioBackdrop />

        <StageTopBar>
          <StageTopGroup>
            <StatusPill tone={panelTone}>
              <StatusDot active={recording} />
              {panelEyebrow}
            </StatusPill>

            {(recording || hasDraftAudio || hasSavedAudio) && (
              <StatusPill tone={recording ? "recording" : hasDraftAudio ? "draft" : "saved"}>
                {recording ? "Live Input" : hasDraftAudio ? "Draft Clip" : "Attached Audio"}
              </StatusPill>
            )}
          </StageTopGroup>

          <StageTopGroup>
            <StatusPill tone={loading ? "uploading" : recording ? "recording" : "idle"}>
              {loading ? `${Math.round(loadingProgress)}%` : formatTime(recording ? countdown : maxDurationMs)}
            </StatusPill>
          </StageTopGroup>
        </StageTopBar>

        <AudioCenter>
            <AudioCenterCard>
              <AudioBadge>
                <MicIcon width={30} height={30} />
              </AudioBadge>
            <AudioEyebrow>{panelEyebrow}</AudioEyebrow>
            <AudioTitle>{panelTitle}</AudioTitle>
            <AudioText>{panelText}</AudioText>

            {recording && (
              <Waveform active={true}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </Waveform>
            )}

            {showEmptyState && (
              <Waveform active={false}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </Waveform>
            )}

            {(hasDraftAudio || hasSavedAudio) && (
              <StageAudio controls ref={audioElement} src={audioUrl || undefined} />
            )}
          </AudioCenterCard>
        </AudioCenter>

        {(recording || hasDraftAudio || hasSavedAudio || loading) && (
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
                  ? "Processing the uploaded audio"
                  : "Uploading the current take"}
              </UploadTitle>
              <UploadText>
                {loadingProgress >= 100
                  ? "The transfer is done. Waiting for the final URL."
                  : `Uploaded ${Math.round(loadingProgress)}% so far.`}
              </UploadText>
            </UploadCard>
          </UploadOverlay>
        )}
      </AudioStage>

      {props.editor.isEditable && (
        <ControlPanel contentEditable={false}>
          <PanelCopy>
            <PanelEyebrow>{panelEyebrow}</PanelEyebrow>
            <PanelTitle>{panelTitle}</PanelTitle>
            <PanelText>{panelText}</PanelText>

            <MetaRow>
              <MetaItem>Max {formatTime(maxDurationMs)}</MetaItem>
              <MetaItem>
                {recording
                  ? `${formatTime(countdown)} left`
                  : hasDraftAudio
                    ? "Unsaved preview"
                    : hasSavedAudio
                      ? "Saved on this block"
                      : "Ready when you are"}
              </MetaItem>
            </MetaRow>
          </PanelCopy>

          <ActionRow>
            {!loading && !recording && !hasDraftAudio && (
              <PrimaryAction
                onClick={(e) => {
                  e.preventDefault();
                  startRecording();
                }}
              >
                {permissionError
                  ? "Retry Microphone Access"
                  : hasSavedAudio
                    ? "Record New Take"
                    : "Start Recording"}
              </PrimaryAction>
            )}

            {!loading && recording && (
              <PrimaryAction
                tone="danger"
                onClick={(e) => {
                  e.preventDefault();
                  stopRecording();
                }}
              >
                Stop Recording
              </PrimaryAction>
            )}

            {!loading && hasDraftAudio && (
              <>
                <SecondaryAction
                  onClick={(e) => {
                    e.preventDefault();
                    discardDraft();
                    startRecording();
                  }}
                >
                  Record Again
                </SecondaryAction>

                <GhostAction
                  onClick={(e) => {
                    e.preventDefault();
                    discardDraft();
                  }}
                >
                  <DeleteIcon width={16} height={16} style={{ marginRight: 8 }} />
                  Discard
                </GhostAction>

                <PrimaryAction
                  onClick={(e) => {
                    e.preventDefault();
                    uploadRecording();
                  }}
                >
                  <CheckIcon width={16} height={16} style={{ marginRight: 8 }} />
                  Upload Audio
                </PrimaryAction>
              </>
            )}

            {!loading && hasSavedAudio && !hasDraftAudio && (
              <GhostAction
                onClick={(e) => {
                  e.preventDefault();
                  replayAudio();
                }}
              >
                Replay
              </GhostAction>
            )}
          </ActionRow>
        </ControlPanel>
      )}

      <NodeViewContent as={"figcaption"} className="imageCaption">
        {props.node.content.size === 0 && (
          <span className="danteDefaultPlaceholder">
            type a caption (optional)
          </span>
        )}
      </NodeViewContent>
    </AudioCard>
  );
}

export const AudioRecorderBlockConfig = (options = {}) => {
  let config = {
    icon: MicIcon,
    name: "AudioRecorderBlock",
    tag: "audio-recorder",
    component: AudioRecorderBlock,
    atom: false,
    draggable: true,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "audio-recorder",
    },
    options: {
      seconds_to_record: 120,
      upload_formName: "file",
      upload_handler: (file: any, ctx: any) => {
        console.log("UPLOADED FILE", file, ctx);
      },
    },
    attributes: {
      url: { default: null },
    },
  };

  return Object.assign(config, options);
};

export function AudioRecorderRenderer({
  blockKey,
  data,
  domain,
}: {
  blockKey: any;
  data: any;
  domain?: any;
}) {
  const { url, caption } = data;

  return (
    <figure key={blockKey} className={`graf graf--figure`}>
      <AudioCard as="div">
        <AudioStage>
          <AudioBackdrop />
          <AudioCenter>
            <AudioCenterCard>
              <AudioBadge>
                <MicIcon width={30} height={30} />
              </AudioBadge>
              <AudioEyebrow>Audio Note</AudioEyebrow>
              <AudioTitle>Attached audio clip</AudioTitle>
              <AudioText>Play the note inline without opening another screen.</AudioText>
              {url && <StageAudio controls src={getUrl(url, domain)} />}
            </AudioCenterCard>
          </AudioCenter>
        </AudioStage>
      </AudioCard>

      {caption && caption !== "type a caption (optional)" && (
        <figcaption className="imageCaption">
          <span>
            <span data-text="true">{caption}</span>
          </span>
        </figcaption>
      )}
    </figure>
  );
}
