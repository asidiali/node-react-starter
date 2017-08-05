const webpack = require('webpack');

module.exports = {
  name: 'client',
  debug: true,
  devServer: {
    port: 8081,
    stats: {
      chunks: false,
    },
  },
  stats: {
    chunks: false,
  },
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    './src/core/App.js',
  ],
  output: {
    path: '/',
    filename: 'index.bundle.js',
    publicPath: '/static/js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot','babel-loader'],
        exclude: /node_modules/,
        progress: true,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false }
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: {
    console: true,
    fs: null,
    net: null,
    tls: null,
  },
};
