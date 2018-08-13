import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss'

const pluginsConfig = [
      postcss({}),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true ,
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false }], ["react-app", {flow:true}]],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-logical-assignment-operators",
          ["@babel/plugin-proposal-optional-chaining", { loose: false }],
          ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
          ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
          "@babel/plugin-proposal-do-expressions"
        ]
      }),
      //resolve(), // so Rollup can find `ms`
      commonjs() // so Rollup can convert `ms` to an ES module
    ]

export default [
  // browser-friendly UMD build
  {
    input: 'src/editor/components/Dante/Dante.js',
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
    input: 'src/editor/components/Dante/Dante.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: pluginsConfig
  }
];