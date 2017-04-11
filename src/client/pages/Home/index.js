import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Company from '../Company/CompanyAsync';

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

function Home(props) {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/home/company">Company</Link>
      <p>{props.home}</p>
      <Route path="/home/company" component={Company} />
    </div>
  );
}

Home.propTypes = {
  home: string.isRequired,
};

export default connect(mapStateToProps)(Home);
