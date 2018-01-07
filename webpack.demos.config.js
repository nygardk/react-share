var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: '#inline-source-map',
  entry: {
    demo0: [
      'react-hot-loader/patch',
      './demos/demo0/index.jsx'
    ],
  },
  output: {
    filename: '[name]/bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'demos')
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
          forceEnv: 'with_react_hot_loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(svg|jpg|jpeg|png)[\?]?.*$/,
        loader: 'url-loader?limit=1',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {'react-share': path.resolve('./src')},
    extensions: ['.js', '.jsx']
  }
};
