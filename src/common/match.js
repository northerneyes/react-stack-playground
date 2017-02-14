import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux'

import App from '../client/pages/App';
import AsyncProvider from '../client/components/AsyncProvider';

export default function match(location, store) {
  const resolvers = {};
  const components = {};

  // First render pass.
  // We need it to collect all component resolvers.
  ReactDOMServer.renderToString(
    <Provider store={store}>
      <AsyncProvider components={components} resolvers={resolvers}>
        <StaticRouter location={location} context={{}}>
          <App/>
        </StaticRouter>
      </AsyncProvider>
    </Provider>
  );

  return Promise
    .all(Object.keys(resolvers).map(key => resolvers[key]()))
    .then(() => ({components, resolvers}));
}