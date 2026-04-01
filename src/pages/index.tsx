'use client'

import Link from "next/link";
import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import {
  darkTheme,
  defaultTheme,
  defaultPlugins,
} from "../../packages/dante3/src/";
import Dante from "../../packages/dante3/src/DanteEditor";
import pkg from "../../packages/dante3/package.json";
import {
  docsHighlights,
  featureHighlights,
  platformHighlights,
  siteExamples,
} from "../../data/siteContent";

const { version, name } = pkg;

export default function HomePage() {
  const [mode, setMode] = useState("light");
  const [readOnly, setReadOnly] = useState(false);
  const [activeExample, setActiveExample] = useState<string>(siteExamples[0].id);

  const theme = mode === "light" ? defaultTheme : darkTheme;
  const selectedExample = useMemo(
    () => siteExamples.find((example) => example.id === activeExample) || siteExamples[0],
    [activeExample]
  );

  return (
    <Layout
      version={version}
      name={name}
      mode={mode}
      setMode={() => setMode(mode === "light" ? "dark" : "light")}
    >
      <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200">
                Dante 3 for modern publishing surfaces
              </div>

              <div className="space-y-5">
                <h1 className="font-display text-6xl leading-[0.92] text-slate-950 dark:text-slate-50 sm:text-7xl">
                  Block editing without dragging a legacy site behind it.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  The public Dante site now focuses on one editor: the current TipTap +
                  ProseMirror stack, live examples, and documentation that matches the
                  product you actually ship.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="#editor"
                  className="inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  Try the live editor
                </Link>
                <Link
                  href="/posts/index"
                  className="inline-flex items-center rounded-full border border-black/5 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
                >
                  Read the docs
                </Link>
                <a
                  href="https://github.com/michelson/Dante"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-black/5 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white dark:border-white/10 dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950"
                >
                  Open repository
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {platformHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                      {item.title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {item.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-black/5 bg-slate-950 p-6 text-white shadow-[0_25px_70px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-[#07111f] sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    Install
                  </div>
                  <h2 className="mt-3 font-display text-4xl leading-none">
                    Drop Dante into your React app.
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  v{version}
                </div>
              </div>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  npm
                </div>
                <pre className="mt-3 overflow-x-auto text-sm text-emerald-200">
                  <code>npm install dante3</code>
                </pre>
              </div>

              <div className="mt-5 rounded-[2rem] border border-white/10 bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Minimal setup
                </div>
                <pre className="mt-3 overflow-x-auto text-sm text-sky-100">
                  <code>{`import DanteEditor from "dante3"\n\n<DanteEditor bodyPlaceholder="Write the next section" />`}</code>
                </pre>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {featureHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.8rem] border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="examples" className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                Example Presets
              </div>
              <h2 className="mt-3 font-display text-5xl leading-none text-slate-950 dark:text-slate-50">
                Start from a realistic editing scenario.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              These presets swap the demo content inside the live editor below, so you can
              test a writing flow, a product spec, or a docs-oriented draft without leaving
              the page.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {siteExamples.map((example) => {
              const active = selectedExample.id === example.id;

              return (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => setActiveExample(example.id)}
                  className={`rounded-[2rem] border p-6 text-left transition ${
                    active
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg dark:border-white dark:bg-white dark:text-slate-950"
                      : "border-black/5 bg-white/80 text-slate-950 shadow-sm hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                    {example.eyebrow}
                  </div>
                  <div className="mt-4 text-2xl font-semibold leading-tight">
                    {example.title}
                  </div>
                  <p className="mt-4 text-sm leading-6 opacity-80">{example.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="editor" className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
            <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
              <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
                  Live demo
                </div>
                <h2 className="mt-3 font-display text-4xl leading-none text-slate-950 dark:text-slate-50">
                  {selectedExample.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {selectedExample.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setReadOnly(false)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      !readOnly
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                        : "border border-black/5 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    }`}
                  >
                    Editable
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadOnly(true)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      readOnly
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                        : "border border-black/5 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    }`}
                  >
                    Read only
                  </button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                  Docs shortcuts
                </div>
                <div className="mt-4 space-y-3">
                  {docsHighlights.map((doc) => (
                    <Link
                      key={doc.slug}
                      href={doc.slug === "index" ? "/posts" : `/posts/${doc.slug}`}
                      className="block rounded-[1.5rem] border border-black/5 bg-white/90 px-4 py-4 transition hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white dark:hover:text-slate-950"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                        {doc.eyebrow}
                      </div>
                      <div className="mt-2 text-sm font-semibold">{doc.title}</div>
                      <div className="mt-2 text-sm leading-6 opacity-80">{doc.copy}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#07111f]/80 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] border border-black/5 bg-[#fbf8f2] px-4 py-3 dark:border-white/10 dark:bg-black/20">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Active preset
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {selectedExample.eyebrow}
                  </div>
                </div>
                <div className="rounded-full border border-black/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:border-white/10 dark:text-slate-300">
                  {readOnly ? "Preview mode" : "Editable mode"}
                </div>
              </div>

              <Dante
                key={`${selectedExample.id}-${readOnly ? "readonly" : "editable"}-${mode}`}
                widgets={defaultPlugins}
                theme={theme}
                content={selectedExample.content}
                bodyPlaceholder="Start writing, paste a URL, or drop a file"
                autofocus={false}
                readOnly={readOnly}
                editorProps={{
                  attributes: {
                    class: "mx-auto w-full",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
