import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './pages/App';
import init from '../common/init';
import AsyncProvider from '../client/components/AsyncProvider';

init(window.location.pathname).then(({components, resolvers}) => {
  ReactDOM.render(
    <AsyncProvider components={components} resolvers={resolvers}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AsyncProvider>,
    document.getElementById('app')
  );
});
