import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux'
import express from 'express';
import {flushServerSideRequirePaths} from 'react-loadable/lib';

import Html from './Html';
import App from '../client/pages/App';
import createStore from '../common/redux/store';

const app = express();
app.use('/assets', express.static('dist', {maxAge: '200d'}));

const webpackStats = require('../../stats.json');

const babelInterop = obj => {
  return obj && obj.__esModule ? obj.default : obj;
};

const modules = {};
const bundles = {};

(webpackStats.modules || []).forEach(module => {
  modules[module.identifier] = module.chunks;
});

(webpackStats.chunks || []).forEach(chunk => {
  bundles[chunk.id] = chunk.files;
});

function renderApp(store, req) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <App/>
      </StaticRouter>
    </Provider>
  );
}

async function render(req, res) {
  const store = createStore();

  // First render to get modules paths
  renderApp(store, req);

  const requires = flushServerSideRequirePaths();
  const scripts = [];

  requires.forEach(file => {
    const matchedBundles = modules[file + '.js'];
    matchedBundles.forEach(bundle => {
      bundles[bundle].forEach(script => {
        scripts.unshift(script);
      });
    });
  });

  await Promise.all(
    requires
      .map(file => babelInterop(require(file)))
      .filter(component => Boolean(component && component.fetch))
      .map(component => component.fetch(store))
  );

  const html = renderApp(store, req);
  const markup = ReactDOMServer.renderToString(
    <Html
      html={html}
      state={store.getState()}
      scripts={scripts}
    />
  );

  res.status(200).send(`<!DOCTYPE html>${markup}`);
}

app.get('*', render);

app.listen(8000, () => console.log('server started'));