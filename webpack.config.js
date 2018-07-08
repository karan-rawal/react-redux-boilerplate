const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

const config = {
  mode: 'development',
  entry: `${SRC_PATH}/js/index.jsx`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: DIST_PATH,
    publicPath: '/',
  },
  devServer: {
    hot: true,
    open: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=assets/fonts/',
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=assets/images/',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_PATH}/index.html`,
      filename: 'index.html',
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
