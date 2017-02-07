import React from 'react';
import {Link, Route} from 'react-router-dom';
import AsyncRoute from '../../components/AsyncRoute';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" render={() => <h1>Index</h1>}/>
        <nav>
          <Link to="/">Index</Link>
          <Link to="/home">Home</Link>
          <Link to="/help">Help</Link>
        </nav>
        <AsyncRoute path="/home" getComponent={() => import('../Home')}/>
        <AsyncRoute path="/help" getComponent={() => import('../Help')}/>
      </div>
    )
  }
}