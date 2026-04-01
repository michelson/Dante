import React from "react";
import axios from "axios";
import { video } from "../icons.js";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";

const Wrapper = styled(NodeViewWrapper)`
  display: block;
`;

const Card = styled.div<{ selected?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid
    ${(props) =>
      props.selected ? "rgba(244, 114, 182, 0.26)" : "rgba(15, 23, 42, 0.08)"};
  background:
    radial-gradient(circle at top left, rgba(244, 114, 182, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(251, 191, 36, 0.12), transparent 32%),
    linear-gradient(180deg, rgba(12, 18, 35, 0.98), rgba(2, 6, 23, 1));
  box-shadow:
    0 24px 52px rgba(2, 6, 23, 0.28),
    0 1px 0 rgba(255, 255, 255, 0.06) inset;
`;

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 18px 0;
`;

const HandlePill = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(251, 191, 36, 0.2);
  background: rgba(146, 64, 14, 0.28);
  color: #fde68a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StatusPill = styled.div<{ tone?: "default" | "danger" | "accent" }>`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid
    ${(props) =>
      props.tone === "danger"
        ? "rgba(252, 165, 165, 0.18)"
        : props.tone === "accent"
          ? "rgba(251, 191, 36, 0.22)"
          : "rgba(255, 255, 255, 0.08)"};
  background:
    ${(props) =>
      props.tone === "danger"
        ? "rgba(127, 29, 29, 0.28)"
        : props.tone === "accent"
          ? "rgba(120, 53, 15, 0.28)"
          : "rgba(255, 255, 255, 0.05)"};
  color:
    ${(props) =>
      props.tone === "danger"
        ? "#fee2e2"
        : props.tone === "accent"
          ? "#fef3c7"
          : "rgba(226, 232, 240, 0.82)"};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(248, 250, 252, 0.94);
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
  }
`;

const Stage = styled.div`
  padding: 18px;
`;

const PlayerShell = styled.div`
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.86), rgba(2, 6, 23, 1));
  box-shadow: 0 22px 42px rgba(2, 6, 23, 0.24);

  iframe,
  video,
  embed,
  object {
    display: block;
    width: 100%;
    min-height: 380px;
    border: 0;
  }

  @media (max-width: 720px) {
    iframe,
    video,
    embed,
    object {
      min-height: 240px;
    }
  }
`;

const StatePanel = styled.div<{ tone?: "default" | "danger" }>`
  display: grid;
  gap: 10px;
  place-items: center;
  min-height: 320px;
  padding: 28px;
  border-radius: 22px;
  border: 1px dashed
    ${(props) =>
      props.tone === "danger" ? "rgba(252, 165, 165, 0.24)" : "rgba(251, 191, 36, 0.16)"};
  background:
    ${(props) =>
      props.tone === "danger"
        ? "rgba(127, 29, 29, 0.26)"
        : "rgba(120, 53, 15, 0.22)"};
  text-align: center;
`;

const StateTitle = styled.div`
  color: #f8fafc;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const StateCopy = styled.div`
  max-width: 520px;
  color: rgba(226, 232, 240, 0.74);
  font-size: 15px;
  line-height: 1.65;
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 18px 20px;
`;

const FooterCopy = styled.div`
  flex: 1 1 260px;
  min-width: 0;
  display: grid;
  gap: 8px;
`;

const Eyebrow = styled.div`
  color: rgba(251, 191, 36, 0.82);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin: 0;
  color: #f8fafc;
  font-size: 24px;
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0;
  color: rgba(226, 232, 240, 0.7);
  font-size: 15px;
  line-height: 1.6;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(226, 232, 240, 0.82);
  font-size: 12px;
  font-weight: 600;
`;

const CaptionEditor = styled(NodeViewContent)`
  position: relative;
  flex: 1 1 240px;
  min-height: 56px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #f8fafc;
  font-size: 14px;
  line-height: 1.6;
  outline: none;
`;

const CaptionText = styled.figcaption`
  flex: 1 1 240px;
  min-height: 56px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(226, 232, 240, 0.84);
  font-size: 14px;
  line-height: 1.6;
`;

const CaptionShell = styled.div`
  position: relative;
  flex: 1 1 240px;
`;

const CaptionGhost = styled.div`
  position: absolute;
  top: 14px;
  left: 16px;
  right: 16px;
  color: rgba(226, 232, 240, 0.42);
  pointer-events: none;
  font-size: 14px;
  line-height: 1.6;
`;

function parseEmbedData(rawData: any) {
  if (typeof rawData === "string") {
    try {
      return JSON.parse(rawData);
    } catch (_error) {
      return {};
    }
  }

  return rawData || {};
}

function embedHtml(embedData: any) {
  return embedData.media ? embedData.media.html : embedData.html;
}

function providerLabel(embedData: any) {
  return embedData.provider_name || embedData.author_name || "Video Embed";
}

function hostLabel(url?: string | null) {
  if (!url) return "Embedded video";

  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch (_error) {
    return url;
  }
}

function renderVideoStage({
  html,
  error,
  loading,
}: {
  html: string;
  error: string;
  loading: boolean;
}) {
  if (loading) {
    return (
      <StatePanel>
        <StateTitle>Preparing the video preview</StateTitle>
        <StateCopy>
          Dante is resolving the embed data and sizing the player.
        </StateCopy>
      </StatePanel>
    );
  }

  if (error) {
    return (
      <StatePanel tone="danger">
        <StateTitle>This video could not be embedded</StateTitle>
        <StateCopy>{error}</StateCopy>
      </StatePanel>
    );
  }

  if (!html) {
    return (
      <StatePanel>
        <StateTitle>Paste a supported video URL</StateTitle>
        <StateCopy>
          This block will render YouTube, Vimeo, and other providers supported by
          the embed endpoint.
        </StateCopy>
      </StatePanel>
    );
  }

  return <PlayerShell dangerouslySetInnerHTML={{ __html: html }} />;
}

function renderVideoMeta({
  embedData,
  caption,
  editable,
  captionPlaceholder,
  showCaptionPlaceholder,
}: {
  embedData: any;
  caption?: string | null;
  editable: boolean;
  captionPlaceholder: string;
  showCaptionPlaceholder: boolean;
}) {
  const title = embedData.title || "Embedded video";
  const description = embedData.description;
  const sourceUrl = embedData.url;

  return (
    <Footer>
      <FooterCopy>
        <Eyebrow>{providerLabel(embedData)}</Eyebrow>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : null}
        <MetaRow>
          <MetaItem>{hostLabel(sourceUrl)}</MetaItem>
          {embedData.author_name ? <MetaItem>{embedData.author_name}</MetaItem> : null}
        </MetaRow>
      </FooterCopy>

      {editable ? (
        <CaptionShell>
          {showCaptionPlaceholder ? <CaptionGhost>{captionPlaceholder}</CaptionGhost> : null}
          <CaptionEditor />
        </CaptionShell>
      ) : caption ? (
        <CaptionText>{caption || ""}</CaptionText>
      ) : null}
    </Footer>
  );
}

export default function VideoBlock(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const embedData = React.useMemo(
    () => parseEmbedData(props.node.attrs.embed_data),
    [props.node.attrs.embed_data]
  );
  const shouldResolve =
    Boolean(props.node.attrs.provisory_text) &&
    Object.keys(embedData || {}).length === 0 &&
    !error;

  React.useEffect(() => {
    let isActive = true;

    if (!props.node.attrs.provisory_text || Object.keys(embedData || {}).length > 0) {
      setLoading(false);
      return () => {
        isActive = false;
      };
    }

    setLoading(true);
    setError("");

    axios({
      method: "get",
      url: `${props.extension.options.endpoint}${props.node.attrs.provisory_text}&scheme=https`,
    })
      .then((result) => {
        if (!isActive) return;
        props.updateAttributes({
          embed_data: result.data,
        });
      })
      .catch((requestError) => {
        if (!isActive) return;
        setError(
          requestError?.response?.data?.error_message ||
            "The provider did not return a valid embed for this URL."
        );
      })
      .finally(() => {
        if (!isActive) return;
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [
    embedData,
    props.extension.options.endpoint,
    props.node.attrs.provisory_text,
    props.node.attrs.embed_data,
    props.updateAttributes,
  ]);

  const html = embedHtml(embedData);

  return (
    <Wrapper as="figure" className="graf--figure graf--iframe graf--first">
      <Card selected={props.selected}>
        {props.editor.isEditable ? (
          <DeleteButton type="button" onClick={() => props.deleteNode()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </DeleteButton>
        ) : null}

        <TopBar>
          <HandlePill contentEditable={false} data-drag-handle="true">
            Video Embed
          </HandlePill>
          <StatusPill tone={error ? "danger" : loading ? "accent" : "default"}>
            {error ? "Needs Attention" : loading ? "Loading" : "Ready"}
          </StatusPill>
        </TopBar>

        <Stage contentEditable={false}>
          {renderVideoStage({ html, error, loading: loading || shouldResolve })}
        </Stage>

        {renderVideoMeta({
          embedData,
          caption: props.node.textContent,
          editable: props.editor.isEditable,
          captionPlaceholder: props.extension.options.caption,
          showCaptionPlaceholder: props.node.content.size === 0,
        })}
      </Card>
    </Wrapper>
  );
}

export const VideoBlockConfig = (options = {}) => {
  const config = {
    icon: video,
    name: "VideoBlock",
    tag: "video-block",
    component: VideoBlock,
    atom: false,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "video",
    },
    options: {
      endpoint: "//noembed.com/embed?url=",
      placeholder:
        "Paste a YouTube, Vine, Vimeo, or other video link, and press Enter",
      caption: "Type caption for embed (optional)",
    },
    attributes: {
      embed_data: {
        default: {},
      },
      provisory_text: { default: null },
    },
    dataSerializer: (data: any) => {
      return {
        ...data,
        embed_data: JSON.stringify(data.embed_data),
      };
    },
  };

  return Object.assign(config, options);
};

export function VideoBlockRenderer({
  blockKey,
  data,
}: {
  blockKey: any;
  data: any;
}) {
  const embedData = parseEmbedData(data.embed_data);
  const html = embedHtml(embedData);

  return (
    <figure key={blockKey} className="graf--figure graf--iframe graf--first">
      <Card>
        <TopBar>
          <HandlePill>Video Embed</HandlePill>
          <StatusPill>{providerLabel(embedData)}</StatusPill>
        </TopBar>

        <Stage>{renderVideoStage({ html, error: "", loading: false })}</Stage>

        {renderVideoMeta({
          embedData,
          caption: data.caption,
          editable: false,
          captionPlaceholder: "",
          showCaptionPlaceholder: false,
        })}
      </Card>
    </figure>
  );
}
