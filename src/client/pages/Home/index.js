import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

function Home(props) {
  return (
    <div>
      <h1>Home</h1>
      <p>{props.home}</p>
    </div>
  );
}

Home.propTypes = {
  home: string.isRequired,
};

export default connect(mapStateToProps)(Home);
