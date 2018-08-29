import path from 'path';

export const repoRoot = path.resolve(__dirname, '../');

export const srcRoot = path.join(repoRoot, 'src/editor');
export const distRoot = path.join(repoRoot, 'package/dist/');
export const libRoot = path.join(repoRoot, 'package/lib/');
export const esRoot = path.join(repoRoot, 'package/es/');
export const bowerRoot = path.join(repoRoot, 'package/amd/');