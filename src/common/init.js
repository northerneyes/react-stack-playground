import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import App from '../client/pages/App';
import AsyncProvider from '../client/components/AsyncProvider';

const resolvers = {};
const components = {};

export default function(location) {
  // First render pass.
  // We need it to collect all component resolvers.
  ReactDOMServer.renderToString(
    <AsyncProvider components={components} resolvers={resolvers}>
      <StaticRouter location={location} context={{}}>
        <App/>
      </StaticRouter>
    </AsyncProvider>
  );

  return Promise
    .all(Object.keys(resolvers).map(key => resolvers[key]()))
    .then(() => ({components, resolvers}));
}