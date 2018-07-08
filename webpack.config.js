const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

const config = {
  mode: 'development',
  entry: `${SRC_PATH}/js/index.jsx`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_PATH}/index.html`,
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
