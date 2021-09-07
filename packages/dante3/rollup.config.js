/* eslint-disable import/no-anonymous-default-export */
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import multiInput from "rollup-plugin-multi-input";
import autoExternal from "rollup-plugin-auto-external";
import pkg from "./package.json";

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json");

const globals = {
  ...packageJson.devDependencies,
};

const pluginsConfig = [
  autoExternal({
    packagePath: [pkg],
  }),
  peerDepsExternal(),
  postcss({}),
  babel({
    exclude: "node_modules/**",
    runtimeHelpers: true,
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
    customResolveOptions: {
      moduleDirectory: "js_modules",
    },
  }),
  commonjs({
    exclude: "node_modules",
    ignoreGlobal: true,
  }),
  typescript({
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      exclude: ["**/*.stories.*"],
    },
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
      "src/popovers/**/*.js",
      "src/popovers/**/*.ts",
    ],
    /*output: {
    name: 'Dante',
    file: pkg.browser,
    format: 'umd'
  },*/

    output: {
      format: "esm",
      dir: "package/esm",
    },
    plugins: [multiInput(), ...pluginsConfig],
  },
];

/*
const pluginsConfig = [
      postcss({}),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true ,
        babelrc: false,
        presets: [
          ["@babel/preset-env", { modules: false }],
          ["@babel/preset-react", {flow:true}]
        ],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-logical-assignment-operators",
          ["@babel/plugin-proposal-optional-chaining", { loose: false }],
          ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
          ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
          "@babel/plugin-proposal-do-expressions",
        ]
      }),
      resolve({

        // the fields to scan in a package.json to determine the entry point
        // if this list contains "browser", overrides specified in "pkg.browser"
        // will be used
        mainFields: ['module', 'main'], // Default: ['module', 'main']

        // DEPRECATED: use "mainFields" instead
        // use "module" field for ES6 module if possible
        module: true, // Default: true

        // DEPRECATED: use "mainFields" instead
        // use "jsnext:main" if possible
        // legacy field pointing to ES6 module in third-party libraries,
        // deprecated in favor of "pkg.module":
        // - see: https://github.com/rollup/rollup/wiki/pkg.module
        jsnext: true,  // Default: false

        // DEPRECATED: use "mainFields" instead
        // use "main" field or index.js, even if it's not an ES6 module
        // (needs to be converted from CommonJS to ES6)
        // – see https://github.com/rollup/rollup-plugin-commonjs
        main: true,  // Default: true

        // some package.json files have a "browser" field which specifies
        // alternative files to load for people bundling for the browser. If
        // that's you, either use this option or add "browser" to the
        // "mainfields" option, otherwise pkg.browser will be ignored
        browser: true,  // Default: false

        // not all files you want to resolve are .js files
        extensions: ['.mjs', '.js', '.jsx', '.json', 'tsx', 'ts', 'tsx'],  // Default: [ '.mjs', '.js', '.json', '.node' ]

        // whether to prefer built-in modules (e.g. `fs`, `path`) or
        // local ones with the same names
        preferBuiltins: false,  // Default: true

        // Lock the module search in this path (like a chroot). Module defined
        // outside this path will be marked as external
        jail: '/my/jail/path', // Default: '/'

        // Set to an array of strings and/or regexps to lock the module search
        // to modules that match at least one entry. Modules not matching any
        // entry will be marked as external
        only: ['some_module', /^@some_scope\/.*$/], // Default: null

        // If true, inspect resolved files to check that they are
        // ES2015 modules
        modulesOnly: true, // Default: false

        // Force resolving for these modules to root's node_modules that helps
        // to prevent bundling the same package multiple times if package is
        // imported from dependencies.
        dedupe: ['react', 'react-dom'], // Default: []

        // Any additional options that should be passed through
        // to node-resolve
        customResolveOptions: {
          moduleDirectory: 'js_modules'
        }
      }), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      //tsPathsResolve()
    ]

export default [
  // browser-friendly UMD build
  {
    input: 'src/indexPre.js',
    output: {
      name: 'Dante',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: pluginsConfig
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)

  {
    input: 'src/indexPre.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: pluginsConfig
  }
];
*/
