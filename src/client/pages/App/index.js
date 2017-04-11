import React from 'react';
import { Link, Route } from 'react-router-dom';
import Home from '../../pages/Home/HomeAsync';
import Help from '../../pages/Help/HelpAsync';
import Company from '../../pages/Company/CompanyAsync';

export default () =>
  <div>
    <Route path="/" render={() => <h1>Index</h1>} />
    <nav>
      <Link to="/">Index</Link>
      <Link to="/home">Home</Link>
      <Link to="/help">Help</Link>
    </nav>
    <Route path="/home" component={Home} />
    <Route path="/home/company" component={Company} />
    <Route path="/help" component={Help} />
  </div>;
