import webpack from 'webpack';
import yargs from 'yargs';

var path = require('path');

var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");


export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export const jsLoader = 'babel?cacheDirectory';

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx', '.es6', '.css', '.scss']
  },  

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },

      { test: path.resolve("./src/components/dante_editor.js"), 
        loaders: ["expose?DanteEditor", "babel-loader?presets[]=es2015"]},
      { test: path.resolve("./src/components/dante.js"), 
        loaders: ["expose?Dante", "babel-loader?presets[]=es2015"]},

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

  plugins: [

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
  
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;