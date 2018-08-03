/* eslint-disable */

const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js")
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map"
  },

  devtool: "#source-map",

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2017' , 'stage-0']
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: "style-loader!css-loader!postcss-loader!sass-loader",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader",
        include: path.join(__dirname, "assets", "img")
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    inline: true,
    hot: true,
    stats: "errors-only"
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new Uglify(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      hash: true
    })
  ] : [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),

    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
}