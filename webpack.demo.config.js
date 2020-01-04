const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  entry: ['./demo'].filter(e => !!e),
  output: {
    filename: '[name].[hash].bundle.js',
    // publicPath: '',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.demo.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|jpg|jpeg|png)[\?]?.*$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: { 'react-share': path.resolve('./src') },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      title: 'react-share demo | Social media share buttons and share counts for React.',
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
