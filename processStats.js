const webpack = require('webpack');
const fs = require('fs');
const config = require('./webpack.config');

webpack(config, (err, stats) => {
  const jsonStats = stats.toJson({
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: true,
    chunkModules: false,
    chunkOrigins: false,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    // Doesn't work
    // Waiting for https://github.com/webpack/webpack/issues/4141
    exclude: [/node_modules/],
    hash: false,
    modules: true,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: false,
    warnings: false
  });

  const modules = jsonStats.modules
    // Waiting for https://github.com/webpack/webpack/issues/4141
    .filter(({identifier}) => !/node_modules/.test(identifier.split('!').pop()))
    .map(({chunks, identifier}) => ({identifier: identifier.split('!').pop(), chunks}));

  const chunks = jsonStats.chunks
    .map(({id, files}) => ({id, files}));

  fs.writeFileSync('./stats.json', JSON.stringify({modules, chunks}))
});