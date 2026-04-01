import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import styled from "@emotion/styled";
import { giphyLogo } from "../../icons";

import GiphyPicker from "./giphy";

const Wrapper = styled(NodeViewWrapper)`
  position: relative;
  display: block;
`;

const Card = styled.div<{ selected?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid
    ${(props) =>
      props.selected ? "rgba(125, 211, 252, 0.34)" : "rgba(255, 255, 255, 0.08)"};
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.14), transparent 32%),
    radial-gradient(circle at top right, rgba(96, 165, 250, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(8, 14, 30, 0.98), rgba(3, 7, 18, 1));
  box-shadow:
    0 26px 54px rgba(2, 6, 23, 0.28),
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
  gap: 8px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(134, 239, 172, 0.22);
  background: rgba(20, 83, 45, 0.24);
  color: #dcfce7;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(226, 232, 240, 0.84);
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
  color: rgba(241, 245, 249, 0.94);
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
  }
`;

const Hero = styled.div`
  display: grid;
  gap: 14px;
  padding: 22px 18px 0;
`;

const LogoBadge = styled.div`
  width: 62px;
  height: 62px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 28px rgba(2, 6, 23, 0.18);

  svg {
    width: 34px;
    height: 34px;
  }
`;

const Title = styled.h3`
  margin: 0;
  color: #f8fafc;
  font-size: 28px;
  line-height: 1.04;
  letter-spacing: -0.04em;
  font-weight: 700;
`;

const Copy = styled.p`
  margin: 0;
  max-width: 640px;
  color: rgba(226, 232, 240, 0.72);
  font-size: 15px;
  line-height: 1.65;
`;

const PickerPanel = styled.div`
  margin-top: 20px;
  padding: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
`;

const Attribution = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: rgba(226, 232, 240, 0.54);
  font-size: 12px;
`;

function getAspectRatio(rawWidth: any, rawHeight: any) {
  const maxWidth = 1000;
  const maxHeight = 1000;
  let width = Number(rawWidth) || 1000;
  let height = Number(rawHeight) || 1000;
  let ratio = 0;

  if (width > maxWidth) {
    ratio = maxWidth / width;
    height *= ratio;
    width *= ratio;
  } else if (height > maxHeight) {
    ratio = maxHeight / height;
    width *= ratio;
    height *= ratio;
  }

  return {
    width,
    height,
    ratio: (height / width) * 100,
  };
}

export default function GiphyBlock(props: any) {
  const apiKey =
    props.extension?.options?.key || props.extension?.config?.addOptions?.key || "";

  function selectImage(gif: any) {
    const original =
      gif?.images?.original ||
      gif?.images?.downsized_large ||
      gif?.images?.fixed_width ||
      gif?.images?.fixed_width_downsampled ||
      {};
    const url = original.url;

    if (!url) return;

    const imageNode = {
      type: "ImageBlock",
      attrs: {
        url,
        aspect_ratio: getAspectRatio(original.width, original.height),
        forceUpload: true,
      },
    };

    const pos = typeof props.getPos === "function" ? props.getPos() : null;
    const chain = props.editor.chain().focus();

    if (typeof pos === "number") {
      chain.insertContentAt({ from: pos, to: pos + props.node.nodeSize }, imageNode).run();
      return;
    }

    chain.insertContent(imageNode).run();
  }

  function selfDestroy() {
    props.deleteNode();
  }

  return (
    <Wrapper className="dante-giphy-wrapper">
      <Card selected={props.selected}>
        {props.editor.isEditable ? (
          <DeleteButton type="button" onClick={selfDestroy}>
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
            GIF Picker
          </HandlePill>
          <StatusPill>{apiKey ? "Giphy Connected" : "Missing API Key"}</StatusPill>
        </TopBar>

        <Hero>
          <LogoBadge>{giphyLogo()}</LogoBadge>
          <Title>Find the right GIF without leaving the editor.</Title>
          <Copy>
            Search the Giphy catalog, preview the results inline, and replace this block
            with the selected GIF as a regular image block.
          </Copy>
        </Hero>

        <PickerPanel contentEditable={false}>
          <GiphyPicker
            apiKey={apiKey}
            placeholder={props.extension?.options?.placeholder || "Search any GIF on Giphy"}
            handleSelected={selectImage}
          />

          <Attribution>
            <span>Powered by Giphy</span>
            <span>Pick one result to replace this block.</span>
          </Attribution>
        </PickerPanel>
      </Card>
    </Wrapper>
  );
}

export const GiphyBlockConfig = (options = {}) => {
  const config = {
    icon: giphyLogo,
    name: "GiphyBlock",
    tag: "giphy-block",
    component: GiphyBlock,
    atom: true,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "GiphyBlock",
    },
    options: {
      placeholder: "Search any GIF on Giphy",
      key: "97g39PuUZ6Q49VdTRBvMYXRoKZYd1ScZ",
    },
    attributes: {
      forceUpload: { default: false },
    },
  };

  return Object.assign(config, options);
};
