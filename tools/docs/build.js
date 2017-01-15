import { exec } from '../exec';
import { distRoot } from '../constants';

export default function BuildDistributable() {
  console.log('Building: '.cyan + 'docs'.green);

  return exec(`rimraf ${distRoot}`)
    .then(() => Promise.all([
      exec(`webpack --config ./webpack/docs.config.js --bail`)
    ]))
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}
