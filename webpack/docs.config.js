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
    template: 'demo/assets/index.html',
    scripts: [
      {
        src: '/initialize.js',
        type: 'module'
      }
    ],
  }),

  new HtmlWebpackPlugin({
    title: 'Dante Demo',
    template: 'demo/assets/license.html',
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
    template: 'demo/assets/options.html',
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

  entry: {
    'app': './demo/demo.js',
    'dante': './demo/initialize.js',
  },

  devtool: 'cheap-module-source-map',
  output: {
    path:  path.resolve('./docs'),
    filename: '[name].js',
    chunkFilename: "[id].js"
    //filename: outputFile,
    //library: libraryName,
    //libraryTarget: 'umd',
    //umdNamedDefine: true
  },
  resolve: {

    modules: [
         path.resolve('./src'),
         //path.join(__dirname, "src"),
         "node_modules"
       ],
    extensions: ['.js', '.jsx', '.es6', '.cjsx', '.coffee', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.es6)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015'],
          "plugins": ["transform-react-jsx"]
        }
      },

      { test: path.resolve("./src/components/dante_editor.js"), 
        loaders: ["expose-loader?DanteEditor", "babel-loader?presets[]=es2015"]},
      { test: path.resolve("./src/components/dante.js"), 
        loaders: ["expose-loader?Dante", "babel-loader?presets[]=es2015"]},
      
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader:'file-loader?limit=1024&name=images/[name].[ext]'
      }
    ]
  },
  plugins: plugins
};

module.exports = config;