import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import {trigger} from 'redial';

import App from './pages/App';
import match from '../common/match';
import createStore from '../common/redux/store';
import AsyncProvider from '../client/components/AsyncProvider';

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);
const history = createBrowserHistory();

history.listen(location => {
  match(location, store).then(({components}) => {
    trigger('fetch', Object.keys(components).map(key => components[key]), {dispatch: store.dispatch});
  });
});

match(history.location, store).then(({components, resolvers}) => {
  ReactDOM.render(
    <Provider store={store}>
      <AsyncProvider components={components} resolvers={resolvers}>
        <Router history={history}>
          <App/>
        </Router>
      </AsyncProvider>
    </Provider>,
    document.getElementById('app')
  );
});
