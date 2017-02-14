import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux'
import express from 'express';
import {trigger} from 'redial';

import App from '../client/pages/App';
import Html from './Html';
import match from '../common/match';
import createStore from '../common/redux/store';
import AsyncProvider from '../client/components/AsyncProvider';

const app = express();
app.use('/assets', express.static('dist', {maxAge: '200d'}));

function render(req, res) {
  const location = req.url;
  const store = createStore();

  match(location, store).then(({components, resolvers}) => {
    return trigger('fetch', Object.keys(components).map(key => components[key]), {dispatch: store.dispatch}).then(() => {
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <AsyncProvider components={components} resolvers={resolvers}>
            <StaticRouter location={req.url} context={{}}>
              <App/>
            </StaticRouter>
          </AsyncProvider>
        </Provider>
      );
      const markup = ReactDOMServer.renderToString(<Html html={html} state={store.getState()}/>);
      res.status(200).send(`<!DOCTYPE html>${markup}`);
    });
  });
}

app.get('*', render);

app.listen(8000, () => console.log('server started'));