/* eslint-disable import/no-anonymous-default-export */
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import multiInput from "rollup-plugin-multi-input";
import autoExternal from "rollup-plugin-auto-external";
import packageJson from "./package.json" assert { type: "json" };

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const packageJson = require("./package.json");

const globals = {
  ...packageJson.devDependencies,
};

const pluginsConfig = [
  autoExternal({
    packagePath: [packageJson],
  }),
  peerDepsExternal(),
  postcss({}),
  babel({
    exclude: "node_modules/**",
    //runtimeHelpers: true,
    //babelHelpers: 'runtime',
    babelrc: false,
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
      '@emotion/babel-plugin',
      "@babel/plugin-proposal-do-expressions",
    ],
  }),
  json(),
  resolve({
    mainFields: ["module", "main"], // Default: ['module', 'main']
    jsnext: true, // Default: false
    main: true, // Default: true
    browser: true, // Default: false
    // not all files you want to resolve are .js files
    extensions: [".mjs", ".js", ".jsx", ".json", "tsx", "ts", "tsx"], // Default: [ '.mjs', '.js', '.json', '.node' ]
    dedupe: ["react", "react-dom"], // Default: []
    moduleDirectories: [],
    //customResolveOptions: {
    //  moduleDirectory: "js_modules",
    //},
  }),
  commonjs({
    exclude: "node_modules",
    ignoreGlobal: true,
  }),
  typescript({
    
    //useTsconfigDeclarationDir: true,
    //tsconfigOverride: {
    //  exclude: ["**/*.stories.*"],
    //},
  }),
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        name: "Dante",
        file: packageJson.browser,
        format: "umd",
        exports: "named" /** Disable warning for default imports */,
      },
      {
        file: packageJson.main,
        format: "cjs", // commonJS
        sourcemap: true,
        exports: "named" /** Disable warning for default imports */,
      },
      {
        file: packageJson.module,
        format: "esm", // ES Modules
        sourcemap: true,
        exports: "named" /** Disable warning for default imports */,
      },
    ],
    plugins: pluginsConfig,
    external: Object.keys(globals),
  },

  {
    input: [
      "src/editor/**/*.tsx",
      "src/blocks/**/*.tsx",
      "src/plugins/**/*.js",
      "src/popovers/**/*.tsx",
      "src/styled/**/*.tsx",
      "src/styled/**/*.js",
      "src/index.ts",
    ],
    /*output: {
    name: 'Dante',
    file: pkg.browser,
    format: 'umd'
  },*/

    output: {
      format: "esm",
      dir: "package/esm",
      sourcemap: false,
    },
    //@ts-ignore
    plugins: [multiInput.default(), ...pluginsConfig],
  },
];

