import 'colors';
import { exec } from '../exec';
import fsp from 'fs-promise';
import { srcRoot, esRoot } from '../constants';
import buildBabel from '../buildBabel';

export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green);

  return exec(`rimraf ${esRoot}`)
    .then(() => fsp.mkdirs(esRoot))
    .then(() => buildBabel(srcRoot, esRoot, {
      babelrc: false,
      presets: [["react-app", {"flow":true}]],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-logical-assignment-operators",
        ["@babel/plugin-proposal-optional-chaining", { loose: false }],
        ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
        ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
        "@babel/plugin-proposal-do-expressions"
      ]
    }))
    .then(() => console.log('Built: '.cyan + 'es module'.green));
}
