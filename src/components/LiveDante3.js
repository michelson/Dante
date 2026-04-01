import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DanteEditor, {
  ImageBlockConfig,
  EmbedBlockConfig,
  VideoBlockConfig,
  PlaceholderBlockConfig,
  VideoRecorderBlockConfig,
  AudioRecorderBlockConfig,
  FileBlockConfig,
  extensionFactory,
  Icons,
  MenuBarConfig,
  AddButtonConfig,
  CodeBlockConfig,
  Renderer,
} from "../../packages/dante3/src";
import { State, Toggle } from "react-powerplug";
import { siteExamples } from "../../data/siteContent";

function DemoButton() {
  return <p>Demo button</p>;
}

export default function LiveDante3({ children, live, render }) {
  const language = "js";

  if (live) {
    return (
      <div className="not-prose my-8 overflow-hidden rounded-[2rem] border border-black/5 bg-[#f8fafc] shadow-sm dark:border-white/10 dark:bg-[#020617]">
        <LiveProvider
          code={children.trim()}
          scope={{
            StarterKit,
            DanteEditor,
            ImageBlockConfig,
            EmbedBlockConfig,
            VideoBlockConfig,
            FileBlockConfig,
            PlaceholderBlockConfig,
            VideoRecorderBlockConfig,
            AudioRecorderBlockConfig,
            extensionFactory,
            generateJSON,
            MenuBarConfig,
            AddButtonConfig,
            Icons,
            CodeBlockConfig,
            DemoButton,
            State,
            Toggle,
            Renderer,
            contentJSON: siteExamples[0].content,
          }}
        >
          <div className="border-b border-black/5 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            Live example
          </div>

          <div className="bg-white px-4 py-6 dark:bg-[#07111f] sm:px-8">
            <LivePreview />
          </div>

          <div className="border-t border-black/5 bg-slate-950 px-4 py-5 text-sm text-slate-100 dark:border-white/10 sm:px-8">
            <LiveEditor />
          </div>

          <LiveError className="border-t border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200" />
        </LiveProvider>
      </div>
    );
  }

  if (render) {
    return (
      <div className="not-prose mt-10 rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <LiveProvider code={children}>
          <LivePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: "1.25rem", borderRadius: "1.25rem" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
