import baseConfig, { options } from './base.config';

export default {
  ...baseConfig,

  entry: {
    'Dante2': './src/index.js',
  },

  output: {
    path: './dist',
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'ReactBootstrap',
    libraryTarget: 'umd',
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
};