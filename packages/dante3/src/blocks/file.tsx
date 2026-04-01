import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import axios from "axios";
import styled from "@emotion/styled";
import { file as FileIcon } from "../icons.js";
import { exitBlockToParagraph, getUrl } from "./blockUtils";

const Wrapper = styled(NodeViewWrapper)`
  display: block;
`;

const Card = styled.div<{ selected?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid
    ${(props) =>
      props.selected ? "rgba(16, 185, 129, 0.28)" : "rgba(15, 23, 42, 0.08)"};
  background:
    radial-gradient(circle at top left, rgba(16, 185, 129, 0.1), transparent 28%),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 34%),
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
  border: 1px solid rgba(16, 185, 129, 0.18);
  background: rgba(220, 252, 231, 0.78);
  color: #047857;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StatusPill = styled.div<{ tone?: "default" | "accent" }>`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid
    ${(props) =>
      props.tone === "accent" ? "rgba(59, 130, 246, 0.18)" : "rgba(15, 23, 42, 0.08)"};
  background:
    ${(props) =>
      props.tone === "accent" ? "rgba(219, 234, 254, 0.82)" : "rgba(255, 255, 255, 0.72)"};
  color:
    ${(props) => (props.tone === "accent" ? "#1d4ed8" : "rgba(15, 23, 42, 0.66)")};
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

const Body = styled.div`
  display: grid;
  gap: 16px;
  padding: 18px;
`;

const FileLink = styled.a`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  text-decoration: none;
  padding: 16px;
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);

  @media (max-width: 640px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

const DocBadge = styled.div`
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(59, 130, 246, 0.16));
  color: #0f172a;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);

  svg {
    width: 28px;
    height: 28px;
  }
`;

const FileInfo = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

const FileType = styled.div`
  color: #047857;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const FileName = styled.div`
  color: #0f172a;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  word-break: break-word;
`;

const FileMeta = styled.div`
  color: rgba(15, 23, 42, 0.62);
  font-size: 13px;
  line-height: 1.45;
`;

const OpenPill = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  color: rgba(15, 23, 42, 0.68);
  font-size: 12px;
  font-weight: 700;

  @media (max-width: 640px) {
    display: none;
  }
`;

const ProgressTrack = styled.div`
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
`;

const ProgressValue = styled.div<{ progress: number }>`
  width: ${(props) => Math.max(0, Math.min(100, props.progress))}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  transition: width 180ms ease;
`;

const CaptionEditor = styled(NodeViewContent)`
  position: relative;
  min-height: 54px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.72);
  color: #0f172a;
  font-size: 14px;
  line-height: 1.6;
  outline: none;
`;

const CaptionText = styled.figcaption`
  min-height: 54px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.72);
  color: rgba(15, 23, 42, 0.76);
  font-size: 14px;
  line-height: 1.6;
`;

const CaptionShell = styled.div`
  position: relative;
`;

const CaptionGhost = styled.div`
  position: absolute;
  top: 14px;
  left: 16px;
  right: 16px;
  color: rgba(15, 23, 42, 0.42);
  pointer-events: none;
  font-size: 14px;
  line-height: 1.6;
`;

function getFileNameFromUrl(url: any) {
  if (!url || typeof url !== "string") return "Document";
  if (!url.includes("://")) return url.split("/").at(-1) || "Document";

  let urlObject: URL;

  try {
    urlObject = new URL(url);
  } catch (_error) {
    return url.split("/").at(-1) || "Document";
  }

  const pathname = urlObject.pathname;
  const blobRegex = /^\/([a-zA-Z0-9-_.]+\/){2}([a-zA-Z0-9-_.]+)$/;

  if (blobRegex.test(pathname)) {
    return urlObject.searchParams.get("filename") || "blob-file";
  }

  const segments = pathname.split("/");
  return segments[segments.length - 1] || "Document";
}

function fileExtension(fileName: string) {
  const extension = fileName.split(".").pop();
  return extension ? extension.toUpperCase().slice(0, 5) : "DOC";
}

function hostLabel(url?: string | null) {
  if (!url) return "Local document";

  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch (_error) {
    return "Local document";
  }
}

function renderFileSurface({
  url,
  fileName,
  caption,
  editable,
  loading,
  progress,
  showCaptionPlaceholder,
}: {
  url: string;
  fileName: string;
  caption?: string | null;
  editable: boolean;
  loading: boolean;
  progress: number;
  showCaptionPlaceholder: boolean;
}) {
  const extension = fileExtension(fileName);

  return (
    <Body>
      <FileLink href={url || "#"} target="_blank" rel="noreferrer" contentEditable={false}>
        <DocBadge>
          <FileIcon />
        </DocBadge>

        <FileInfo>
          <FileType>{extension} Document</FileType>
          <FileName>{fileName}</FileName>
          <FileMeta>{hostLabel(url)}</FileMeta>
        </FileInfo>

        <OpenPill>Open File</OpenPill>
      </FileLink>

      {loading ? (
        <ProgressTrack>
          <ProgressValue progress={progress} />
        </ProgressTrack>
      ) : null}

      {editable ? (
        <CaptionShell>
          {showCaptionPlaceholder ? (
            <CaptionGhost>Type a caption (optional)</CaptionGhost>
          ) : null}
          <CaptionEditor />
        </CaptionShell>
      ) : caption ? (
        <CaptionText>{caption || ""}</CaptionText>
      ) : null}
    </Body>
  );
}

export default function FileBlock(props: any) {
  const fileUrl = props.node.attrs.url || props.node.attrs.src || "";
  const loading = Boolean(props.node.attrs.loading);
  const loadingProgress = Number(props.node.attrs.loading_progress || 0);

  React.useEffect(() => {
    replaceFile();
  }, []);

  function setFileUrl(url: any) {
    props.updateAttributes({
      url,
    });
  }

  function replaceFile() {
    if (!fileUrl) return;

    if (!fileUrl.includes("blob:") && !props.node.attrs.forceUpload) {
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
    startLoader();
    uploadFile();
  }

  function formatData() {
    const formData = new FormData();

    if (props.node.attrs.file) {
      const formName = props.extension.options.upload_formName || "file";
      formData.append(formName, props.node.attrs.file);
      return formData;
    }

    formData.append("url", props.node.attrs.src);
    return formData;
  }

  function uploadFile() {
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(props.node.attrs.file, props);
    }

    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }

    function getUploadUrl() {
      const uploadUrl = props.extension.options.upload_url;
      return typeof uploadUrl === "function" ? uploadUrl() : uploadUrl;
    }

    function getUploadHeaders() {
      return props.extension.options.upload_headers || {};
    }

    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(),
      onUploadProgress: (event) => {
        updateProgressBar(event);
      },
    })
      .then((result) => {
        uploadCompleted(result.data.url);

        if (props.extension.options.upload_callback) {
          return props.extension.options.upload_callback(result, props);
        }
      })
      .catch((error) => {
        if (props.extension.options.upload_error_callback) {
          return props.extension.options.upload_error_callback(error, props);
        }
      });

    return (jsonResponse: any) => {
      return uploadCompleted(jsonResponse.url);
    };
  }

  function uploadCompleted(url: any) {
    setFileUrl(url);
    stopLoader();
  }

  function updateProgressBar(event: any) {
    if (!event.lengthComputable) return;

    const complete = (event.loaded / event.total) * 100;
    props.updateAttributes({ loading_progress: complete });
  }

  return (
    <Wrapper as="figure">
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
            Document
          </HandlePill>
          <StatusPill tone={loading ? "accent" : "default"}>
            {loading ? `${Math.round(loadingProgress)}% Uploaded` : fileExtension(getFileNameFromUrl(fileUrl))}
          </StatusPill>
        </TopBar>

        {renderFileSurface({
          url: fileUrl,
          fileName: getFileNameFromUrl(fileUrl),
          caption: props.node.textContent,
          editable: props.editor.isEditable,
          loading,
          progress: loadingProgress,
          showCaptionPlaceholder: props.node.content.size === 0,
        })}
      </Card>
    </Wrapper>
  );
}

export const FileBlockConfig = (options = {}) => {
  const config = {
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
      forceUpload: { default: false },
      aspect_ratio: {
        default: {
          width: 200,
          height: 200,
          ratio: 100,
        },
      },
    },
    dataSerializer: (data: any) => {
      return {
        ...data,
        src: data.url,
        aspect_ratio: JSON.stringify(data.aspect_ratio),
        file: null,
      };
    },
    options: {
      upload_handler: (file: any, ctx: any) => {
        console.log("UPLOADED FILE", file, ctx);
      },
    },
    parseHTML: [
      {
        tag: "file-block[url]",
      },
    ],
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "upload",
      insert_block: "FileBlock",
      file_types: "*",
    },
    keyboardShortcuts: (editor: any) => {
      return {
        Enter: ({ editor }: { editor: any }) => {
          if (editor.isActive("FileBlock")) {
            return exitBlockToParagraph(editor);
          }
        },
      };
    },
  };

  return Object.assign(config, options);
};

export function FileBlockRenderer({
  blockKey,
  data,
  domain,
}: {
  blockKey: any;
  data: any;
  domain?: any;
}) {
  const url = getUrl(data.url, domain);

  return (
    <figure key={blockKey} className="graf graf--figure">
      <Card>
        <TopBar>
          <HandlePill>Document</HandlePill>
          <StatusPill>{fileExtension(getFileNameFromUrl(url))}</StatusPill>
        </TopBar>

        {renderFileSurface({
          url,
          fileName: getFileNameFromUrl(url),
          caption: data.caption,
          editable: false,
          loading: false,
          progress: 0,
          showCaptionPlaceholder: false,
        })}
      </Card>
    </figure>
  );
}
