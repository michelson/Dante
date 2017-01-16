import baseConfig, { options } from './base.config';
import webpack from 'webpack';

var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('bower_components') >= 0 ||
         userRequest.indexOf('node_modules') >= 0 ||
         userRequest.indexOf('libraries') >= 0;
}

var plugins = [
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)

  new ExtractTextPlugin("[name].css"),

  new CommonsChunkPlugin({
    name: 'dante-vendors',
    minChunks: function(module) {
      return isExternal(module);
    }
  }),

  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })



], outputFile;



export default {
  ...baseConfig,

  entry: {
    'Dante2': './src/index.js',
  },

  output: {
    path: './dist',
    filename: options.optimizeMinimize ? '[name].min.js' : '[name].js',
    library: 'Dante2',
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
  plugins: plugins
};