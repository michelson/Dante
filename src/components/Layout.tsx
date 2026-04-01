import React, { ReactNode } from "react";
import Menu from "./Menu";

type LayoutProps = {
  children: ReactNode;
  name?: string;
  mode: string;
  version?: string;
  setMode: () => void;
};

export default function Layout({
  children,
  name,
  mode,
  version,
  setMode,
}: LayoutProps) {
  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-[#f7f1e6] text-slate-950 transition-colors dark:bg-[#020617] dark:text-slate-100">
        <div className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.14),transparent_28%)]" />
        <Menu mode={mode} name={name} setMode={setMode} version={version} />
        <main className="relative">{children}</main>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:wght@200..900&family=Space+Grotesk:wght@300..700&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: "Space Grotesk", "Avenir Next", "Segoe UI", sans-serif;
        }

        .font-display {
          font-family: "Source Serif 4", Georgia, serif;
        }

        code,
        pre,
        .font-mono {
          font-family: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
        }

        .prose :where(pre):not(:where([class~="not-prose"] *)) {
          border-radius: 1.25rem;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: #0f172a;
          color: #e2e8f0;
          padding: 1rem 1.25rem;
        }

        .dark .prose :where(pre):not(:where([class~="not-prose"] *)) {
          border-color: rgba(255, 255, 255, 0.08);
          background: rgba(15, 23, 42, 0.92);
        }

        .prose :where(code):not(:where(pre code, [class~="not-prose"] *)) {
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.08);
          padding: 0.15rem 0.5rem;
          font-size: 0.9em;
          font-weight: 600;
        }

        .dark .prose :where(code):not(:where(pre code, [class~="not-prose"] *)) {
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}
