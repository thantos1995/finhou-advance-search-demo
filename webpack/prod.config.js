const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = (env) => merge(baseConfig(env), {
  entry: {
    'advance-search': './src/react-advance-search/index.jsx',
  },
  output: {
    filename: '[name].entry.js',
    path: path.resolve(__dirname, '..' , '..', 'wwwroot'),
    // path: path.resolve(__dirname, 'dist')
    publicPath: '/wwwroot',
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },

  plugins: [
    // Extract imported CSS into own file
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
});
