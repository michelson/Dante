import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import styled from "@emotion/styled";
import axios from "axios";
import { embed } from "../icons";

const Wrapper = styled(NodeViewWrapper)`
  display: block;
`;

const Card = styled.div<{ selected?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid
    ${(props) =>
      props.selected ? "rgba(125, 211, 252, 0.28)" : "rgba(15, 23, 42, 0.08)"};
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(45, 212, 191, 0.12), transparent 32%),
    linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 1));
  box-shadow:
    0 18px 42px rgba(15, 23, 42, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.72) inset;
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
  border: 1px solid rgba(14, 165, 233, 0.16);
  background: rgba(224, 242, 254, 0.78);
  color: #0369a1;
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
        ? "rgba(248, 113, 113, 0.18)"
        : props.tone === "accent"
          ? "rgba(16, 185, 129, 0.2)"
          : "rgba(15, 23, 42, 0.08)"};
  background:
    ${(props) =>
      props.tone === "danger"
        ? "rgba(254, 226, 226, 0.8)"
        : props.tone === "accent"
          ? "rgba(220, 252, 231, 0.82)"
          : "rgba(255, 255, 255, 0.7)"};
  color:
    ${(props) =>
      props.tone === "danger"
        ? "#b91c1c"
        : props.tone === "accent"
          ? "#047857"
          : "rgba(15, 23, 42, 0.7)"};
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
  background: rgba(15, 23, 42, 0.06);
  color: rgba(15, 23, 42, 0.72);
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(15, 23, 42, 0.12);
    transform: translateY(-1px);
  }
`;

const CardBody = styled.div`
  display: grid;
  gap: 18px;
  padding: 18px;
`;

const PreviewLink = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 230px) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  text-decoration: none;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewThumb = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 196px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.08));
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: rgba(2, 132, 199, 0.8);

  svg {
    width: 48px;
    height: 48px;
  }
`;

const PreviewContent = styled.div`
  display: grid;
  gap: 10px;
  align-content: center;
  min-width: 0;
`;

const Eyebrow = styled.div`
  color: #0284c7;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 26px;
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0;
  color: rgba(15, 23, 42, 0.68);
  font-size: 15px;
  line-height: 1.65;
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
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(15, 23, 42, 0.66);
  font-size: 12px;
  font-weight: 600;
`;

const StatePanel = styled.div<{ tone?: "default" | "danger" }>`
  display: grid;
  gap: 10px;
  padding: 22px;
  border-radius: 20px;
  border: 1px dashed
    ${(props) =>
      props.tone === "danger" ? "rgba(248, 113, 113, 0.28)" : "rgba(14, 165, 233, 0.18)"};
  background:
    ${(props) =>
      props.tone === "danger"
        ? "rgba(254, 242, 242, 0.8)"
        : "rgba(240, 249, 255, 0.82)"};
`;

const StateTitle = styled.div`
  color: #0f172a;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const StateCopy = styled.div`
  color: rgba(15, 23, 42, 0.68);
  font-size: 15px;
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

function previewImage(embedData: any) {
  if (embedData.images && embedData.images.length > 0) {
    return embedData.images[0].url;
  }

  return embedData.thumbnail_url || embedData.image || null;
}

function hostLabel(url?: string | null) {
  if (!url) return "Embedded link";

  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch (_error) {
    return url;
  }
}

function providerLabel(embedData: any) {
  return (
    embedData.provider_name ||
    embedData.author_name ||
    hostLabel(embedData.provider_url || embedData.url) ||
    "Embed"
  );
}

function renderPreviewCard({
  embedData,
  error,
  loading,
}: {
  embedData: any;
  error: string;
  loading: boolean;
}) {
  if (loading) {
    return (
      <StatePanel>
        <StateTitle>Resolving the embed preview</StateTitle>
        <StateCopy>
          Dante is fetching the metadata and thumbnail for this link.
        </StateCopy>
      </StatePanel>
    );
  }

  if (error) {
    return (
      <StatePanel tone="danger">
        <StateTitle>This link could not be previewed</StateTitle>
        <StateCopy>{error}</StateCopy>
      </StatePanel>
    );
  }

  const image = previewImage(embedData);
  const title = embedData.title || hostLabel(embedData.url);
  const description = embedData.description;

  return (
    <PreviewLink
      href={embedData.url || "#"}
      target="_blank"
      rel="noreferrer"
      contentEditable={false}
    >
      <PreviewThumb>
        {image ? (
          <ThumbImage alt={title} src={image} loading="lazy" />
        ) : (
          <ThumbFallback>{embed()}</ThumbFallback>
        )}
      </PreviewThumb>

      <PreviewContent>
        <Eyebrow>{providerLabel(embedData)}</Eyebrow>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : null}
        <MetaRow>
          <MetaItem>{hostLabel(embedData.url)}</MetaItem>
          {embedData.author_name ? <MetaItem>{embedData.author_name}</MetaItem> : null}
        </MetaRow>
      </PreviewContent>
    </PreviewLink>
  );
}

export default function EmbedBlock(props: any) {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
            "The provider did not return preview data for this link."
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

  return (
    <Wrapper>
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
            Link Preview
          </HandlePill>
          <StatusPill tone={error ? "danger" : loading ? "accent" : "default"}>
            {error ? "Needs Attention" : loading ? "Loading" : "Ready"}
          </StatusPill>
        </TopBar>

        <CardBody>{renderPreviewCard({ embedData, error, loading: loading || shouldResolve })}</CardBody>
      </Card>
    </Wrapper>
  );
}

export const EmbedBlockConfig = (options = {}) => {
  const config = {
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
    dataSerializer: (data: any) => {
      return {
        ...data,
        embed_data: JSON.stringify(data.embed_data),
      };
    },
  };

  return Object.assign(config, options);
};

export function EmbedBlockRenderer({
  blockKey,
  data,
}: {
  blockKey: any;
  data: any;
}) {
  const embedData = parseEmbedData(data.embed_data);

  return (
    <figure key={blockKey} className="graf graf--mixtapeEmbed">
      <Card>{renderPreviewCard({ embedData, error: "", loading: false })}</Card>
    </figure>
  );
}
