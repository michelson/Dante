import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import styled from "@emotion/styled";

const Wrapper = styled(NodeViewWrapper)`
  display: block;
`;

const Card = styled.div<{ selected?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid
    ${(props) =>
      props.selected ? "rgba(96, 165, 250, 0.3)" : "rgba(15, 23, 42, 0.08)"};
  background:
    radial-gradient(circle at top left, rgba(59, 130, 246, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 32%),
    linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(241, 245, 249, 1));
  box-shadow:
    0 18px 42px rgba(15, 23, 42, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.7) inset;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 0;
`;

const KindPill = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: rgba(219, 234, 254, 0.75);
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const DeleteButton = styled.button`
  width: 34px;
  height: 34px;
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
  gap: 10px;
  padding: 18px;
`;

const Title = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 28px;
  line-height: 1.04;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

const Copy = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(15, 23, 42, 0.68);
  font-size: 15px;
  line-height: 1.65;
`;

const InputShell = styled.div`
  position: relative;
  margin-top: 8px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);

  .editable-content {
    display: block;
    min-height: 28px;
    outline: none;
    color: #0f172a;
    font-size: 16px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const InputGhost = styled.div`
  position: absolute;
  top: 14px;
  left: 16px;
  right: 16px;
  color: rgba(71, 85, 105, 0.48);
  pointer-events: none;
  font-size: 16px;
  line-height: 1.6;
`;

const HintRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

const HintPill = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.68);
  color: rgba(15, 23, 42, 0.64);
  font-size: 12px;
  font-weight: 600;
`;

function formatBlockLabel(name?: string) {
  if (!name) return "Media";

  return name
    .replace(/Block$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function titleForBlock(label: string) {
  if (label === "Video") return "Paste a video URL to generate the embed.";
  if (label === "Embed") return "Paste any supported URL to build the preview.";
  return "Paste the source to generate this block.";
}

export default function PlaceholderBlock(props: any) {
  const blockKind = props.node.attrs.blockKind || {};
  const placeholder = blockKind.options?.placeholder || "Paste the source URL and press Enter";
  const blockLabel = formatBlockLabel(blockKind.name);

  return (
    <Wrapper>
      <Card selected={props.selected}>
        <TopBar>
          <KindPill>{blockLabel}</KindPill>
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
        </TopBar>

        <Body>
          <Title>{titleForBlock(blockLabel)}</Title>
          <Copy>
            Dante will resolve the link and swap this placeholder for the real block as
            soon as you press Enter.
          </Copy>

          <InputShell>
            {props.node.content.size === 0 ? <InputGhost>{placeholder}</InputGhost> : null}
            <NodeViewContent className="editable-content" />
          </InputShell>

          <HintRow>
            <HintPill>Paste link</HintPill>
            <HintPill>Press Enter to resolve</HintPill>
          </HintRow>
        </Body>
      </Card>
    </Wrapper>
  );
}

export const PlaceholderBlockConfig = (options = {}) => {
  const config = {
    name: "PlaceholderBlock",
    tag: "placeholder-block",
    component: PlaceholderBlock,
    priority: 20,
    keyboardShortcuts: (editor: any) => {
      return {
        Enter: () => {
          if (editor.isActive("PlaceholderBlock")) {
            const parentComp = editor.state.selection.$anchor.parent;
            const comp = parentComp.attrs.blockKind;
            const text = parentComp.textContent;

            if (!comp?.name) return;

            editor
              .chain()
              .toggleNode(comp.name, comp.name, { provisory_text: text })
              .run();
          }

          return false;
        },
      };
    },
    attributes: {
      blockKind: {
        default: {},
      },
    },
  };

  return Object.assign(config, options);
};
