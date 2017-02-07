import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from '../client/pages/App';
import Html from './Html';
import init from '../common/init';
import AsyncProvider from '../client/components/AsyncProvider';

const app = express();
app.use('/assets', express.static('dist', {maxAge: '200d'}));

function render(req, res) {
  init(req.url).then(({components, resolvers}) => {
    const html = ReactDOMServer.renderToString(
      <AsyncProvider components={components} resolvers={resolvers}>
        <StaticRouter location={req.url} context={{}}>
          <App/>
        </StaticRouter>
      </AsyncProvider>
    );
    const markup = ReactDOMServer.renderToString(<Html html={html}/>);
    res.status(200).send(`<!DOCTYPE html>${markup}`);
  });
}

app.get('*', render);

app.listen(8000, () => console.log('server started'));