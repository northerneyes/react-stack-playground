import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import {trigger} from 'redial';

import App from './pages/App';
import createStore from '../common/redux/store';
import rootSaga from '../common/redux/sagas';

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);
const history = createBrowserHistory();

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
