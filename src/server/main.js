import React from 'react';
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import express from 'express';
import winston from 'winston';
import { flushServerSideRequirePaths } from 'react-loadable/lib';

import Html from './Html';
import App from '../client/pages/App';
import createStore from '../common/redux/store';
import FetchProvider from '../client/FetchProvider';

const app = express();
app.use('/assets', express.static('dist', { maxAge: '200d' }));

const webpackStats = require('../../stats.json');

const modules = {};
const bundles = {};

(webpackStats.modules || []).forEach((module) => {
  modules[module.identifier] = module.chunks;
});

(webpackStats.chunks || []).forEach((chunk) => {
  bundles[chunk.id] = chunk.files;
});

function renderApp(store, req, fetches) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <FetchProvider fetches={fetches}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </FetchProvider>
    </Provider>,
  );
}

async function render(req, res) {
  const store = createStore();

  // First render to collect all fetches
  const fetches = [];
  renderApp(store, req, fetches);

  const promises = fetches.map(fetch => fetch(store));
  await Promise.all(promises);

  const requires = flushServerSideRequirePaths();
  const scripts = [];

  requires.forEach((file) => {
    const matchedBundles = modules[`${file}.js`];
    matchedBundles.forEach((bundle) => {
      bundles[bundle].forEach((script) => {
        scripts.unshift(script);
      });
    });
  });

  const html = renderApp(store, req);
  const markup = ReactDOMServer.renderToString(
    <Html
      html={html}
      state={store.getState()}
      scripts={scripts}
    />,
  );

  res.status(200).send(`<!DOCTYPE html>${markup}`);
}

app.get('*', render);

app.listen(8000, () => winston.info('server started'));
