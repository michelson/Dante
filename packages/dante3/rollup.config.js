/* eslint-disable import/no-anonymous-default-export */
import fs from "fs";
import path from "path";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const dependencyNames = Object.keys({
  ...(packageJson.dependencies || {}),
  ...(packageJson.peerDependencies || {}),
});

const subpathExternals = [
  "@emotion/styled/base",
  "@tiptap/pm/state",
  "@tiptap/pm/view",
  "@tiptap/react/menus",
];

const globalOverrides = {
  react: "React",
  "react-dom": "ReactDOM",
  "@emotion/react": "EmotionReact",
  "@emotion/styled": "EmotionStyled",
  "@emotion/styled/base": "EmotionStyled",
  "@tiptap/core": "TiptapCore",
  "@tiptap/pm": "TiptapPm",
  "@tiptap/pm/state": "TiptapPmState",
  "@tiptap/pm/view": "TiptapPmView",
  "@tiptap/react": "TiptapReact",
  "@tiptap/react/menus": "TiptapReactMenus",
};

function toGlobalName(id) {
  return id
    .replace(/^@/, "")
    .split(/[/-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isExternal(id) {
  if (!id || id.startsWith(".") || id.startsWith("\0") || path.isAbsolute(id)) {
    return false;
  }

  return dependencyNames.some(
    (dependencyName) => id === dependencyName || id.startsWith(`${dependencyName}/`)
  );
}

const globals = [...new Set([...dependencyNames, ...subpathExternals])].reduce(
  (result, dependencyName) => {
    result[dependencyName] = globalOverrides[dependencyName] || toGlobalName(dependencyName);
    return result;
  },
  {}
);

function collectSourceEntries(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectSourceEntries(fullPath);
    }

    return /\.(js|ts|tsx)$/.test(entry.name) ? [fullPath] : [];
  });
}

const extensions = [".mjs", ".js", ".jsx", ".json", ".tsx", ".ts"];

function createPlugins() {
  return [
    postcss({}),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      babelrc: false,
      extensions,
      presets: [
        ["@babel/preset-env", { modules: false }],
        ["@babel/preset-react", { flow: true }],
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
        "@emotion/babel-plugin",
        "@babel/plugin-proposal-do-expressions",
      ],
    }),
    json(),
    resolve({
      browser: true,
      dedupe: ["react", "react-dom"],
      extensions,
      mainFields: ["module", "main"],
    }),
    commonjs(),
    typescript({
      sourceMap: true,
      tsconfig: "./tsconfig.json",
    }),
  ];
}

const pluginsConfig = createPlugins();

const sourceEntries = collectSourceEntries("src").map((entryPath) =>
  entryPath.replace(/\\/g, "/")
);

const sharedOutputConfig = {
  exports: "named",
};

export default [
  {
    input: "src/index.ts",
    output: [
      {
        name: "Dante",
        file: packageJson.browser,
        format: "umd",
        globals,
        sourcemap: true,
        ...sharedOutputConfig,
      },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        ...sharedOutputConfig,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        ...sharedOutputConfig,
      },
    ],
    plugins: pluginsConfig,
    external: isExternal,
  },

  {
    input: sourceEntries,
    output: {
      entryFileNames: "[name].js",
      format: "esm",
      dir: "package/esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
    plugins: pluginsConfig,
    external: isExternal,
  },
];
