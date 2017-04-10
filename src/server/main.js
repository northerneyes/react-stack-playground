import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux'
import express from 'express';
import {flushServerSideRequirePaths} from 'react-loadable/lib';

import App from '../client/pages/App';
import createStore from '../common/redux/store';

const app = express();
app.use('/assets', express.static('dist', {maxAge: '200d'}));

const webpackStats = require('../../stats.json');

const modules = {};
const bundles = {};

(webpackStats.modules || []).forEach(module => {
  modules[module.identifier] = module.chunks;
});

(webpackStats.chunks || []).forEach(chunk => {
  bundles[chunk.id] = chunk.files;
});

function render(req, res) {
  const store = createStore();

  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  const requires = flushServerSideRequirePaths();
  const scripts = [];

  requires.forEach(file => {
    let matchedBundles = modules[file + '.js'];
    matchedBundles.forEach(bundle => {
      bundles[bundle].forEach(script => {
        scripts.unshift(script);
      });
    });
  });

  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>react-loadable-example</title>
      </head>
      <body>
        <div id="app">${app}</div>
        <script type="text/javascript" src="assets/manifest.js"></script>        
        <script type="text/javascript" src="assets/vendor.js"></script>
        ${scripts.map(script => {
          return `<script type="text/javascript" src="assets/${script}"></script>`
        }).join('\n')}
        <script type="text/javascript" src="assets/app.js"></script>
      </body>
    </html>
  `);
}

app.get('*', render);

app.listen(8000, () => console.log('server started'));