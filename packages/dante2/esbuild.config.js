const esbuild = require('esbuild')

const options = {
  target: 'node12',
  platform: 'node',
  jsxFactory: 'h',
  jsxFragment: 'hh',
  bundle: true,
  outfile: 'out.js',
  sourcemap: 'inline',
  loader: {
    '.js': 'jsx',
    '.css': 'text',
  },
  entryPoints: ['/index.js'],
}

await service.build(options)