import styled from "@emotion/styled";

const toneMap: Record<string, { bg: string; border: string; color: string }> = {
  idle: {
    bg: "rgba(103, 232, 249, 0.12)",
    border: "rgba(103, 232, 249, 0.25)",
    color: "#d8fbff",
  },
  recording: {
    bg: "rgba(255, 91, 102, 0.16)",
    border: "rgba(255, 91, 102, 0.35)",
    color: "#ffe0e3",
  },
  draft: {
    bg: "rgba(255, 198, 92, 0.16)",
    border: "rgba(255, 198, 92, 0.3)",
    color: "#fff0c8",
  },
  saved: {
    bg: "rgba(109, 226, 192, 0.16)",
    border: "rgba(109, 226, 192, 0.3)",
    color: "#dcfff2",
  },
  uploading: {
    bg: "rgba(145, 158, 255, 0.16)",
    border: "rgba(145, 158, 255, 0.3)",
    color: "#e4e7ff",
  },
  error: {
    bg: "rgba(255, 120, 117, 0.16)",
    border: "rgba(255, 120, 117, 0.34)",
    color: "#ffe2df",
  },
};

function toneValue(tone: string, key: "bg" | "border" | "color") {
  return toneMap[tone] ? toneMap[tone][key] : toneMap.idle[key];
}

export const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background:
    radial-gradient(circle at top left, rgba(103, 232, 249, 0.14), transparent 34%),
    radial-gradient(circle at top right, rgba(168, 85, 247, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(8, 15, 31, 0.98), rgba(4, 8, 20, 1));
  box-shadow:
    0 22px 54px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
`;

export const VideoBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VideoStage = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 320px;
  background:
    radial-gradient(circle at center, rgba(27, 39, 76, 0.48), transparent 55%),
    linear-gradient(180deg, rgba(7, 11, 24, 0.78), rgba(3, 6, 16, 0.94));
`;

export const StageBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(3, 6, 16, 0.06) 0%, rgba(3, 6, 16, 0.58) 100%),
    radial-gradient(circle at 20% 20%, rgba(103, 232, 249, 0.14), transparent 24%),
    radial-gradient(circle at 80% 22%, rgba(255, 91, 102, 0.18), transparent 28%);
`;

export const VideoPlayer = styled.video`
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  min-height: 320px;
  max-height: 72vh;
  background: #020617;
  object-fit: cover;
`;

export const StageTopBar = styled.div`
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

export const StageTopGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${(props: any) => toneValue(props.tone || "idle", "bg")};
  border: 1px solid ${(props: any) => toneValue(props.tone || "idle", "border")};
  color: ${(props: any) => toneValue(props.tone || "idle", "color")};
  backdrop-filter: blur(18px);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.2);
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.08);
  animation: ${(props: any) => (props.active ? "pulseDot 1.25s infinite" : "none")};

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

export const EmptyState = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 24px 48px;
`;

export const EmptyStateCard = styled.div`
  width: min(100%, 520px);
  padding: 26px 26px 24px;
  border-radius: 24px;
  border: 1px solid rgba(103, 232, 249, 0.18);
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.7), rgba(2, 6, 23, 0.9));
  box-shadow:
    0 24px 48px rgba(2, 6, 23, 0.35),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
  text-align: left;
  color: #e5f6ff;
`;

export const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 20px;
  background:
    linear-gradient(135deg, rgba(103, 232, 249, 0.2), rgba(168, 85, 247, 0.18));
  box-shadow: 0 16px 28px rgba(2, 6, 23, 0.26);

  svg {
    width: 34px;
    height: 34px;
  }

  svg path {
    fill: rgba(232, 248, 255, 0.94);
  }
`;

export const EmptyEyebrow = styled.div`
  color: rgba(103, 232, 249, 0.88);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const EmptyTitle = styled.h3`
  margin: 10px 0 8px;
  color: #f8fbff;
  font-size: 28px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

export const EmptyText = styled.p`
  margin: 0;
  color: rgba(226, 237, 255, 0.72);
  font-size: 15px;
  line-height: 1.55;
`;

export const ProgressRail = styled.div`
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

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(props: any) => `${props.value || 0}%`};
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      ${(props: any) =>
        props.tone === "recording"
          ? "#ff5b66"
          : props.tone === "uploading"
            ? "#8b9cff"
            : "#6de2c0"},
      ${(props: any) =>
        props.tone === "recording"
          ? "#ff8a7a"
          : props.tone === "uploading"
            ? "#65e4ff"
            : "#8af6d8"}
    );
  transition: width 180ms ease;
`;

export const RecorderPanel = styled.div`
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

export const PanelCopy = styled.div`
  flex: 1 1 280px;
  min-width: 0;
`;

export const PanelEyebrow = styled.div`
  color: rgba(103, 232, 249, 0.84);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const PanelTitle = styled.h4`
  margin: 8px 0 6px;
  color: #f8fbff;
  font-size: 22px;
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;
`;

export const PanelText = styled.p`
  margin: 0;
  color: rgba(226, 237, 255, 0.72);
  font-size: 14px;
  line-height: 1.55;
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
`;

export const MetaItem = styled.div`
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

export const ActionRow = styled.div`
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

export const PrimaryAction = styled.button`
  ${baseButton}
  color: #06111d;
  background: ${(props: any) =>
    props.tone === "danger"
      ? "linear-gradient(135deg, #ff6b74, #ff8f67)"
      : "linear-gradient(135deg, #7ff3ff, #83ffd5)"};
  box-shadow:
    0 16px 28px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.35) inset;

  &:hover:not(:disabled) {
    box-shadow:
      0 22px 32px rgba(2, 6, 23, 0.32),
      0 1px 0 rgba(255, 255, 255, 0.4) inset;
  }
`;

export const SecondaryAction = styled.button`
  ${baseButton}
  color: #ecf9ff;
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.18);
`;

export const GhostAction = styled.button`
  ${baseButton}
  color: rgba(226, 237, 255, 0.88);
  background: transparent;
  border-color: rgba(255, 255, 255, 0.14);
`;

export const UploadOverlay = styled.div`
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

export const UploadCard = styled.div`
  width: min(100%, 360px);
  padding: 22px 22px 18px;
  border-radius: 20px;
  border: 1px solid rgba(145, 158, 255, 0.28);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(3, 6, 16, 0.94));
  text-align: center;
  box-shadow: 0 24px 48px rgba(2, 6, 23, 0.34);
`;

export const UploadTitle = styled.div`
  color: #f8fbff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const UploadText = styled.div`
  margin-top: 8px;
  color: rgba(226, 237, 255, 0.72);
  font-size: 14px;
  line-height: 1.5;
`;

export const UploadSpinner = styled.div`
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
