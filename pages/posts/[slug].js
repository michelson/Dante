import fs from "fs";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import CustomLink from "../../components/CustomLink";
import Layout from "../../components/Layout";
//import Live from '../../components/Live'
import {
  postFilePaths2 as postFilePaths,
  POSTS_PATH2 as POSTS_PATH,
} from "../../utils/mdxUtils";
import Sidebar from "../../components/Sidebar";
import pkg from "../../packages/dante3/package.json";
const {version} = pkg
//import Dante2 from 'Dante2'
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Dante: dynamic(() => import("Dante2"), {
    ssr: false,
  }),
  code: dynamic(() => import("../../components/LiveDante3")),
  TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

export default function PostPage({ source, frontMatter, posts }) {
  const content = hydrate(source, { components });
  return (
    <Layout version={version}>
      <div className="flex">
        <Sidebar posts={posts} path={""} />

        <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <main className="sm:p-10 p-2 bg-gray-200">
            <div className="bg-white p-4 lg:p-10  shadow-md">
              <h1>
                <span className="lg:py-6 block text-base text-center text-green-600 font-semibold tracking-wide uppercase">
                  {frontMatter.title}
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {frontMatter.description}
                </span>
              </h1>

              <div className="prose-lg">{content}</div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return {
    props: {
      posts: posts,
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
