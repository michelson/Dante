import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import styled from "@emotion/styled";
import { speech } from "../icons";

type SpeechToTextProps = {
  editor: any;
  deleteNode: () => void;
  getPos: () => number;
  node: any;
  extension: any;
  selected?: boolean;
};

type StatusTone = "idle" | "recording" | "draft" | "error" | "unsupported";

const DictationCard = styled(NodeViewWrapper)`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background:
    radial-gradient(circle at top left, rgba(251, 191, 36, 0.18), transparent 30%),
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.14), transparent 28%),
    linear-gradient(180deg, rgba(25, 16, 6, 0.98), rgba(14, 9, 3, 1));
  box-shadow:
    0 22px 54px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
`;

const Stage = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 300px;
  padding: 24px;
  background:
    radial-gradient(circle at center, rgba(82, 35, 6, 0.3), transparent 48%),
    linear-gradient(180deg, rgba(34, 20, 7, 0.72), rgba(12, 8, 3, 0.98));
`;

const StageBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(20, 11, 4, 0.06) 0%, rgba(20, 11, 4, 0.68) 100%),
    radial-gradient(circle at 16% 22%, rgba(251, 191, 36, 0.18), transparent 24%),
    radial-gradient(circle at 82% 24%, rgba(249, 115, 22, 0.16), transparent 24%);
`;

const TopBar = styled.div`
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

const TopGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const toneStyles: Record<StatusTone, { bg: string; border: string; color: string }> = {
  idle: {
    bg: "rgba(251, 191, 36, 0.14)",
    border: "rgba(251, 191, 36, 0.28)",
    color: "#fff1c2",
  },
  recording: {
    bg: "rgba(255, 91, 102, 0.16)",
    border: "rgba(255, 91, 102, 0.35)",
    color: "#ffe0e3",
  },
  draft: {
    bg: "rgba(109, 226, 192, 0.16)",
    border: "rgba(109, 226, 192, 0.30)",
    color: "#dcfff2",
  },
  error: {
    bg: "rgba(255, 120, 117, 0.16)",
    border: "rgba(255, 120, 117, 0.34)",
    color: "#ffe2df",
  },
  unsupported: {
    bg: "rgba(148, 163, 184, 0.18)",
    border: "rgba(148, 163, 184, 0.28)",
    color: "#e5ecf8",
  },
};

const StatusPill = styled.div<{ tone: StatusTone }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${(props) => toneStyles[props.tone].bg};
  border: 1px solid ${(props) => toneStyles[props.tone].border};
  color: ${(props) => toneStyles[props.tone].color};
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
  animation: ${(props) => (props.active ? "pulseDot 1.2s infinite" : "none")};

  @keyframes pulseDot {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.35);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 18px;
  top: 18px;
  z-index: 3;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 245, 230, 0.9);
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: background-color 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
  }
`;

const Center = styled.div`
  position: relative;
  z-index: 1;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterCard = styled.div`
  width: min(100%, 620px);
  padding: 26px 26px 24px;
  border-radius: 24px;
  border: 1px solid rgba(251, 191, 36, 0.18);
  background:
    linear-gradient(180deg, rgba(39, 23, 8, 0.74), rgba(16, 10, 4, 0.94));
  box-shadow:
    0 24px 48px rgba(2, 6, 23, 0.35),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
  text-align: left;
  color: #fff4dc;
`;

const IconBadge = styled.div`
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 18px;
  background:
    linear-gradient(135deg, rgba(251, 191, 36, 0.22), rgba(249, 115, 22, 0.18));
  box-shadow: 0 16px 28px rgba(2, 6, 23, 0.26);

  svg {
    width: 34px;
    height: 34px;
  }

  svg path {
    fill: rgba(255, 249, 237, 0.96);
  }
`;

const Eyebrow = styled.div`
  color: rgba(251, 191, 36, 0.9);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin: 10px 0 8px;
  color: #fff9ef;
  font-size: 28px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

const Copy = styled.p`
  margin: 0;
  color: rgba(255, 240, 214, 0.74);
  font-size: 15px;
  line-height: 1.55;
`;

const PulseRow = styled.div<{ active?: boolean }>`
  margin-top: 22px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 64px;

  span {
    display: block;
    width: 10px;
    border-radius: 999px;
    background: linear-gradient(180deg, #fbbf24, #fb923c);
    box-shadow: 0 10px 20px rgba(251, 191, 36, 0.18);
    animation: ${(props) => (props.active ? "pulseWave 1s ease-in-out infinite" : "none")};
    transform-origin: bottom center;
  }

  span:nth-of-type(1) { height: 20px; animation-delay: 0s; }
  span:nth-of-type(2) { height: 42px; animation-delay: 0.08s; }
  span:nth-of-type(3) { height: 28px; animation-delay: 0.16s; }
  span:nth-of-type(4) { height: 58px; animation-delay: 0.24s; }
  span:nth-of-type(5) { height: 34px; animation-delay: 0.32s; }
  span:nth-of-type(6) { height: 50px; animation-delay: 0.40s; }
  span:nth-of-type(7) { height: 26px; animation-delay: 0.48s; }
  span:nth-of-type(8) { height: 40px; animation-delay: 0.56s; }

  @keyframes pulseWave {
    0%, 100% {
      transform: scaleY(0.72);
      opacity: 0.66;
    }
    50% {
      transform: scaleY(1.12);
      opacity: 1;
    }
  }
`;

const TranscriptPanel = styled.div`
  margin-top: 22px;
  max-height: 240px;
  overflow: auto;
  padding: 18px 18px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.12) inset;
`;

const TranscriptText = styled.div`
  color: rgba(255, 250, 240, 0.94);
  font-size: 15px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

const InterimText = styled.span`
  color: rgba(255, 225, 165, 0.7);
  font-style: italic;
`;

const PlaceholderText = styled.div`
  color: rgba(255, 230, 188, 0.48);
  font-size: 15px;
  line-height: 1.65;
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
  flex: 1 1 300px;
  min-width: 0;
`;

const PanelEyebrow = styled.div`
  color: rgba(251, 191, 36, 0.9);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const PanelTitle = styled.h4`
  margin: 8px 0 6px;
  color: #fff9ef;
  font-size: 22px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;
`;

const PanelText = styled.p`
  margin: 0;
  color: rgba(255, 240, 214, 0.74);
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
  color: rgba(255, 247, 229, 0.9);
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

const buttonBase = `
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

const PrimaryAction = styled.button<{ tone?: "danger" | "default" }>`
  ${buttonBase}
  color: #271400;
  background: ${(props) =>
    props.tone === "danger"
      ? "linear-gradient(135deg, #ff6b74, #ff8f67)"
      : "linear-gradient(135deg, #ffd86b, #fb923c)"};
  box-shadow:
    0 16px 28px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.35) inset;
`;

const SecondaryAction = styled.button`
  ${buttonBase}
  color: #fff7e6;
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.18);
`;

const GhostAction = styled.button`
  ${buttonBase}
  color: rgba(255, 242, 216, 0.88);
  background: transparent;
  border-color: rgba(255, 255, 255, 0.14);
`;

function getRecognitionConstructor() {
  if (typeof window === "undefined") return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

function normalizeTranscript(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function splitIntoParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => normalizeTranscript(paragraph))
    .filter(Boolean);
}

const SpeechToTextBlock = ({
  editor,
  deleteNode,
  getPos,
  node,
  extension,
}: SpeechToTextProps) => {
  const [error, setError] = useState("");
  const [unsupported, setUnsupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [ready, setReady] = useState(false);
  const [finalSegments, setFinalSegments] = useState<string[]>([]);
  const [interimSegment, setInterimSegment] = useState("");
  const [recognitionLang, setRecognitionLang] = useState("default");

  const recognitionRef = useRef<any>(null);
  const shouldContinueRef = useRef(false);
  const restartTimeoutRef = useRef<number | null>(null);
  const committedSegmentsRef = useRef<string[]>([]);
  const sessionFinalSegmentsRef = useRef<string[]>([]);
  const interimSegmentRef = useRef("");

  function clearRestartTimeout() {
    if (!restartTimeoutRef.current) return;
    window.clearTimeout(restartTimeoutRef.current);
    restartTimeoutRef.current = null;
  }

  function syncDraft(finals: string[], interim: string) {
    sessionFinalSegmentsRef.current = finals;
    interimSegmentRef.current = interim;
    setFinalSegments([...committedSegmentsRef.current, ...finals]);
    setInterimSegment(interim);
  }

  function finalizeSessionDraft(promoteInterim = false) {
    const nextCommitted = [
      ...committedSegmentsRef.current,
      ...sessionFinalSegmentsRef.current,
    ];
    const interim = normalizeTranscript(interimSegmentRef.current);

    if (promoteInterim && interim) {
      nextCommitted.push(interim);
    }

    committedSegmentsRef.current = nextCommitted;
    sessionFinalSegmentsRef.current = [];
    setFinalSegments(nextCommitted);

    if (promoteInterim) {
      interimSegmentRef.current = "";
      setInterimSegment("");
      return;
    }

    setInterimSegment(interimSegmentRef.current);
  }

  useEffect(() => {
    const RecognitionCtor = getRecognitionConstructor();

    if (!RecognitionCtor) {
      setUnsupported(true);
      setError("This browser does not support live dictation in the editor.");
      return;
    }

    const recognition = new RecognitionCtor();
    const lang =
      extension?.options?.lang ||
      (typeof navigator !== "undefined" ? navigator.language : "en-US");

    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setRecording(true);
      setError("");
    };

    recognition.onresult = (event: any) => {
      const nextFinals: string[] = [];
      let nextInterim = "";

      for (let i = 0; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = normalizeTranscript(result[0]?.transcript || "");
        if (!text) continue;

        if (result.isFinal) {
          nextFinals.push(text);
        } else {
          nextInterim = `${nextInterim} ${text}`.trim();
        }
      }

      syncDraft(nextFinals, nextInterim);
    };

    recognition.onerror = (event: any) => {
      if (event?.error === "aborted") return;

      shouldContinueRef.current = false;
      setRecording(false);

      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        setError("Microphone access was blocked. Allow it in the browser and try again.");
        return;
      }

      if (event?.error === "audio-capture") {
        setError("No microphone was found or the audio input is unavailable.");
        return;
      }

      if (event?.error === "network") {
        setError("Speech recognition hit a network issue. Try again in a moment.");
        return;
      }

      if (event?.error === "no-speech") {
        setError("No speech was detected. Try again and speak a bit closer to the microphone.");
        return;
      }

      setError("Dictation stopped unexpectedly. You can resume without losing the draft.");
    };

    recognition.onend = () => {
      finalizeSessionDraft(!shouldContinueRef.current);

      if (shouldContinueRef.current) {
        clearRestartTimeout();
        restartTimeoutRef.current = window.setTimeout(() => {
          if (!shouldContinueRef.current) return;
          try {
            recognition.start();
          } catch (err) {
            shouldContinueRef.current = false;
            setRecording(false);
          }
        }, 180);
        return;
      }

      setRecording(false);
    };

    recognitionRef.current = recognition;
    setRecognitionLang(lang);
    setReady(true);

    return () => {
      shouldContinueRef.current = false;
      clearRestartTimeout();
      try {
        recognition.stop();
      } catch (err) {
        null;
      }
      recognitionRef.current = null;
    };
  }, [extension?.options?.lang]);

  const finalText = useMemo(() => finalSegments.join(" ").trim(), [finalSegments]);
  const combinedTranscript = useMemo(
    () => normalizeTranscript([finalText, interimSegment].filter(Boolean).join(" ")),
    [finalText, interimSegment]
  );

  const wordCount = useMemo(() => {
    if (!combinedTranscript) return 0;
    return combinedTranscript.split(/\s+/).filter(Boolean).length;
  }, [combinedTranscript]);

  const statusTone: StatusTone = unsupported
    ? "unsupported"
    : error
      ? "error"
      : recording
        ? "recording"
        : combinedTranscript
          ? "draft"
          : "idle";

  const statusLabel = unsupported
    ? "Unsupported"
    : error
      ? "Attention"
      : recording
        ? "Listening"
        : combinedTranscript
          ? "Draft Ready"
          : "Voice Draft";

  const panelTitle = unsupported
    ? "This browser cannot run live dictation inside the editor"
    : error
      ? "The draft is safe, but dictation needs your attention"
      : recording
        ? "Keep speaking and the transcript will build in real time"
        : combinedTranscript
          ? "Review the draft, then insert it into the document"
          : "Capture spoken notes and turn them into text without leaving the editor";

  const panelText = unsupported
    ? "Try this block in a browser with Web Speech support, or remove it and keep writing manually."
    : error
      ? error
      : recording
        ? "You can stop at any time. The draft stays here until you confirm it."
        : combinedTranscript
          ? "Resume dictation to keep adding text, insert the transcript now, or clear the draft."
          : "Start dictation, watch the live preview, and confirm when the wording looks right.";

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    shouldContinueRef.current = false;
    clearRestartTimeout();
    recognitionRef.current?.stop?.();
    deleteNode();
  }

  function startDictation(e: React.MouseEvent) {
    e.preventDefault();
    if (!recognitionRef.current || unsupported) return;

    setError("");
    shouldContinueRef.current = true;
    clearRestartTimeout();

    try {
      recognitionRef.current.start();
    } catch (err: any) {
      if (String(err?.message || "").includes("start")) {
        return;
      }
      setError("Dictation could not be started. Try again in a moment.");
      shouldContinueRef.current = false;
      setRecording(false);
    }
  }

  function stopDictation(e: React.MouseEvent) {
    e.preventDefault();
    shouldContinueRef.current = false;
    clearRestartTimeout();
    recognitionRef.current?.stop?.();
    setRecording(false);
  }

  function clearDraft(e: React.MouseEvent) {
    e.preventDefault();
    shouldContinueRef.current = false;
    clearRestartTimeout();
    recognitionRef.current?.stop?.();
    committedSegmentsRef.current = [];
    sessionFinalSegmentsRef.current = [];
    interimSegmentRef.current = "";
    setFinalSegments([]);
    setInterimSegment("");
    setError("");
    setRecording(false);
  }

  function confirmDraft(e: React.MouseEvent) {
    e.preventDefault();

    const transcript = combinedTranscript;
    if (!transcript) return;

    shouldContinueRef.current = false;
    clearRestartTimeout();
    recognitionRef.current?.stop?.();

    const pos = typeof getPos === "function" ? getPos() : null;
    if (typeof pos !== "number") return;

    const paragraphs = splitIntoParagraphs(transcript).map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }],
    }));

    if (!paragraphs.length) return;

    editor
      .chain()
      .focus()
      .insertContentAt({ from: pos, to: pos + node.nodeSize }, paragraphs)
      .run();
  }

  return (
    <DictationCard as="figure">
      {editor.isEditable ? (
        <DeleteButton type="button" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </DeleteButton>
      ) : null}

      <Stage contentEditable={false} data-drag-handle="true">
        <StageBackdrop />

        <TopBar>
          <TopGroup>
            <StatusPill tone={statusTone}>
              <StatusDot active={recording} />
              {statusLabel}
            </StatusPill>
            {recording ? <StatusPill tone="recording">Live Transcript</StatusPill> : null}
          </TopGroup>

          <TopGroup>
            <StatusPill tone={recording ? "recording" : statusTone}>
              {recording ? "Mic Open" : combinedTranscript ? `${wordCount} words` : "Ready"}
            </StatusPill>
          </TopGroup>
        </TopBar>

        <Center>
          <CenterCard>
            <IconBadge>{speech()}</IconBadge>
            <Eyebrow>Speech To Text</Eyebrow>
            <Title>{panelTitle}</Title>
            <Copy>{panelText}</Copy>

            {!combinedTranscript ? (
              <PulseRow active={recording}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </PulseRow>
            ) : null}

            <TranscriptPanel>
              {combinedTranscript ? (
                <TranscriptText>
                  {finalText}
                  {interimSegment ? (
                    <>
                      {finalText ? " " : ""}
                      <InterimText>{interimSegment}</InterimText>
                    </>
                  ) : null}
                </TranscriptText>
              ) : (
                <PlaceholderText>
                  {recording
                    ? "Listening for your voice..."
                    : "Your dictated text will appear here as a live draft."}
                </PlaceholderText>
              )}
            </TranscriptPanel>
          </CenterCard>
        </Center>
      </Stage>

      {editor.isEditable ? (
        <ControlPanel contentEditable={false}>
          <PanelCopy>
            <PanelEyebrow>{statusLabel}</PanelEyebrow>
            <PanelTitle>{panelTitle}</PanelTitle>
            <PanelText>{panelText}</PanelText>

            <MetaRow>
              <MetaItem>{recognitionLang || "default language"}</MetaItem>
              <MetaItem>{wordCount} words</MetaItem>
              <MetaItem>{ready ? "Recognition ready" : "Initializing"}</MetaItem>
            </MetaRow>
          </PanelCopy>

          <ActionRow>
            {!recording ? (
              <PrimaryAction
                onClick={startDictation}
                disabled={unsupported || !ready}
              >
                {combinedTranscript ? "Resume Dictation" : "Start Dictation"}
              </PrimaryAction>
            ) : (
              <PrimaryAction tone="danger" onClick={stopDictation}>
                Stop Dictation
              </PrimaryAction>
            )}

            {combinedTranscript ? (
              <>
                <SecondaryAction onClick={confirmDraft}>Insert Text</SecondaryAction>
                <GhostAction onClick={clearDraft}>Clear Draft</GhostAction>
              </>
            ) : null}
          </ActionRow>
        </ControlPanel>
      ) : null}
    </DictationCard>
  );
};

export default SpeechToTextBlock;

export const SpeechToTextBlockConfig = (options = {}) => {
  let config = {
    icon: speech,
    name: "SpeechToText",
    tag: "speech-to-text",
    component: SpeechToTextBlock,
    atom: true,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "SpeechToText",
    },
    options: {},
    attributes: {},
  };

  return Object.assign(config, options);
};
