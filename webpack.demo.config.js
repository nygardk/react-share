const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  entry: [
    !PRODUCTION && 'react-hot-loader/patch',
    './demo'
  ].filter(e => !!e),
  output: {
    filename: '[name].[hash].bundle.js',
    // publicPath: '',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          forceEnv: PRODUCTION ? 'commonjs' : 'with_react_hot_loader',
        },
        exclude: /node_modules/
      },
      {
        test: /\.(svg|jpg|jpeg|png)[\?]?.*$/,
        loader: 'url-loader?limit=1',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {'react-share': path.resolve('./src')},
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      title: 'react-share demo | Social media share buttons and share counts for React.',
    }),
    PRODUCTION && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: true
    })
  ].filter(p => !!p)
};
