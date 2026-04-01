import fs from "fs";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { useState } from "react";
import CustomLink from "../../components/CustomLink";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import {
  filePathToSlug,
  postFilePaths,
  POSTS_PATH,
  resolvePostFilePath,
  slugToSegments,
} from "../../utils/mdxUtils";
import pkg from "../../../packages/dante3/package.json";

const { version, name } = pkg;

const components = {
  a: CustomLink,
  code: dynamic(() => import("../../components/LiveDante3")),
  TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

function sortPosts(posts) {
  return [...posts].sort((left, right) => {
    const leftOrder = left.data.order || 999;
    const rightOrder = right.data.order || 999;

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    return (left.data.title || left.slug).localeCompare(right.data.title || right.slug);
  });
}

export default function PostPage({ source, frontMatter, posts }) {
  const content = hydrate(source, { components });
  const [mode, setMode] = useState("light");

  return (
    <Layout version={version} name={name} mode={mode} setMode={() => setMode(mode === "light" ? "dark" : "light")}>
      <section className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-black/5 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
              Dante 3 Documentation
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="font-display text-5xl leading-none text-slate-950 dark:text-slate-50 sm:text-6xl">
                  {frontMatter.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {frontMatter.description ||
                    "Working examples and integration notes for the current Dante editor surface."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-black/5 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
                >
                  Back to demo
                </Link>
                <a
                  href="https://github.com/michelson/Dante"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  Repository
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-8">
            <Sidebar posts={posts} currentSlug={frontMatter.slug} />

            <div className="min-w-0 flex-auto">
              <article className="prose prose-slate max-w-none rounded-[2.5rem] border border-black/5 bg-white/85 p-6 shadow-sm backdrop-blur dark:prose-invert dark:border-white/10 dark:bg-[#07111f]/85 sm:p-10 lg:p-14">
                {content}
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const resolvedFilePath = resolvePostFilePath(params?.slug || []);

  if (!resolvedFilePath) {
    return {
      notFound: true,
    };
  }

  const absolutePostPath = path.join(POSTS_PATH, resolvedFilePath);
  const source = fs.readFileSync(absolutePostPath, "utf8");
  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  const posts = sortPosts(
    postFilePaths.map((filePath) => {
      const fileSource = fs.readFileSync(path.join(POSTS_PATH, filePath), "utf8");
      const { data: fileData } = matter(fileSource);

      return {
        data: fileData,
        filePath,
        slug: filePathToSlug(filePath),
      };
    })
  );

  return {
    props: {
      posts,
      source: mdxSource,
      frontMatter: {
        ...data,
        slug: filePathToSlug(resolvedFilePath),
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths.flatMap((filePath) => {
    const slug = filePathToSlug(filePath);

    if (slug === "index") {
      return [{ params: { slug: [] } }, { params: { slug: ["index"] } }];
    }

    return [{ params: { slug: slugToSegments(slug) } }];
  });

  return {
    paths,
    fallback: false,
  };
};
