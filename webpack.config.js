const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './assets/'
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
              plugins: ['syntax-dynamic-import'],
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
  }
};