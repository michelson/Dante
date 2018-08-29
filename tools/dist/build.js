import { exec } from '../exec';
import { distRoot } from '../constants';

export default function BuildDistributable() {
  console.log('Building: '.cyan + 'distributable'.green);

  return exec(`rimraf ${distRoot}`)
    .then(() => Promise.all([
      exec(`WEBPACK_ENV=build ./node_modules/.bin/webpack --config config/webpack.build.js`)
      //exec(`WEBPACK_ENV=build webpack --config ./webpack/build.config.js`)
    ]))
    .catch((err)=> console.log(err))
    .then(() => console.log('Built: '.cyan + 'distributable'.green));
}

      //exec(`webpack --bail`),
      //exec(`webpack --bail -p`)
