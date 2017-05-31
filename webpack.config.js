const webpack = require('webpack');
const path = require('path');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicAssets = require('./assets');

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
    ],
    app: './src/client/index.js'
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'syntax-dynamic-import'
              ],
              presets: [
                'react',
                ['env', {
                  targets: {browsers: ['last 2 versions']},
                  modules: false
                }]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    webpackIsomorphicToolsPlugin.development(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
};