import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Switch from "./Switch";

type MenuProps = {
  name?: string;
  mode: string;
  setMode: () => void;
  version?: string;
};

const navigation = [
  { label: "Overview", href: "/" },
  { label: "Examples", href: "/#examples" },
  { label: "Docs", href: "/posts" },
];

export default function Menu({ name, mode, version, setMode }: MenuProps) {
  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-40 border-b border-black/5 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70"
    >
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-full border border-black/5 bg-white/80 px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 dark:bg-white">
                  <Image
                    src="/images/site/dante-editor-logo.png"
                    alt="Dante Editor"
                    width={20}
                    height={20}
                  />
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-950 dark:text-slate-100">
                    {name || "Dante"}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    v{version || "latest"}
                  </span>
                </span>
              </Link>
            </div>

            <nav className="hidden items-center gap-2 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900 hover:text-white dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Switch mode={mode} setMode={setMode} />
              <a
                href="https://github.com/michelson/Dante"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:border-white/10 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                GitHub
              </a>
            </div>

            <Disclosure.Button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/80 text-slate-700 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
              <span className="sr-only">Toggle navigation</span>
              {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="border-t border-black/5 px-4 pb-4 pt-2 md:hidden dark:border-white/10">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-black/5 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 rounded-2xl border border-black/5 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <Switch mode={mode} setMode={setMode} />
              </div>

              <a
                href="https://github.com/michelson/Dante"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-black/5 bg-slate-950 px-4 py-3 text-sm font-medium text-white dark:border-white/10 dark:bg-white dark:text-slate-950"
              >
                GitHub
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
