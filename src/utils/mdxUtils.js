import fs from "fs";
import path from "path";

export const POSTS_PATH = path.join(process.cwd(), "packages/dante3/docs");

function collectPostFilePaths(directory, baseDirectory = directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectPostFilePaths(fullPath, baseDirectory);
    }

    const relativePath = path.relative(baseDirectory, fullPath);
    return /\.mdx?$/.test(relativePath) ? [relativePath] : [];
  });
}

export const postFilePaths = collectPostFilePaths(POSTS_PATH);

export function normalizePostSlug(slug) {
  const joinedSlug = Array.isArray(slug) ? slug.filter(Boolean).join("/") : slug || "";
  return joinedSlug || "index";
}

export function filePathToSlug(filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const slug = normalizedPath.replace(/\.mdx?$/, "").replace(/\/index$/, "");
  return slug || "index";
}

export function slugToSegments(slug) {
  return slug === "index" ? [] : slug.split("/").filter(Boolean);
}

export function postPathToHref(slugOrFilePath) {
  const slug = slugOrFilePath.includes(".md") ? filePathToSlug(slugOrFilePath) : slugOrFilePath;
  return slug === "index" ? "/posts" : `/posts/${slug}`;
}

export function resolvePostFilePath(slug) {
  const normalizedSlug = normalizePostSlug(slug);
  const candidates = normalizedSlug === "index"
    ? ["index.mdx", "index.md"]
    : [
        `${normalizedSlug}.mdx`,
        `${normalizedSlug}.md`,
        path.join(normalizedSlug, "index.mdx"),
        path.join(normalizedSlug, "index.md"),
      ];

  return candidates.find((candidate) => fs.existsSync(path.join(POSTS_PATH, candidate))) || null;
}
