var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");


var libraryName = 'Dante2';

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

  new HtmlWebpackPlugin({
    title: 'Dante Demo',
    template: 'app/assets/index.html',
    scripts: [
      {
        src: '/initialize.js',
        type: 'module'
      }
    ],
  }),

  new HtmlWebpackPlugin({
    title: 'Dante Demo',
    template: 'app/assets/license.html',
    filename: 'license.html',
    scripts: [
      {
        src: '/initialize.js',
        type: 'module'
      }
    ],
  }),

  new HtmlWebpackPlugin({
    title: 'Dante Demo',
    template: 'app/assets/options.html',
    filename: 'doc.html',
    scripts: [
      {
        src: '/initialize.js',
        type: 'module'
      }
    ],
  }),

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

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  //entry: __dirname + '/app/initialize.js',

  entry: {
    'app': './app/demo.js',
    'dante': './app/initialize.js',
  },

  devtool: 'cheap-module-source-map',
  output: {
    path: __dirname + '/docs',
    filename: '[name].js',
    chunkFilename: "[id].js"
    //filename: outputFile,
    //library: libraryName,
    //libraryTarget: 'umd',
    //umdNamedDefine: true
  },
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js', '.jsx', '.es6', '.cjsx', '.coffee', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.cjsx$/,
        loaders: ['coffee', 'cjsx'],
        exclude: /(node_modules|bower_components)/
      },
      { test: /\.coffee$/,
        loader: 'coffee',
        exclude: /(node_modules|bower_components)/ },
      {
        test: /(\.jsx|\.js|\.es6)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015'],
          "plugins": ["transform-react-jsx"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader:'file?limit=1024&name=images/[name].[ext]'
      }
    ]
  },
  plugins: plugins
};

module.exports = config;