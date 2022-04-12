const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';

const SRC_DIR = path.resolve(__dirname, 'demo');
const DIST_DIR = path.resolve(__dirname, 'docs');

module.exports = {
  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
  entry: `${SRC_DIR}/index.tsx`,
  output: {
    path: DIST_DIR,
    filename: '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.tsx?/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.demo.json',
          },
        },
      },
      {
        test: /\.(svg|jpg|jpeg|png)[?]?.*$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
  devServer: {
    compress: true,
    hot: true,
    open: true,
  },
};
