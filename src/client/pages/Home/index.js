import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import * as homeActions from '../../../common/redux/home/home.actions';

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

const hooks = {
  fetch: ({dispatch}) => dispatch(homeActions.loadHome())
};

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.props.home}</p>
      </div>
    )
  }
}

Home.propTypes = {
  home: PropTypes.string.isRequired
};

const ConnectedComponent = connect(mapStateToProps)(Home);
export default provideHooks(hooks)(ConnectedComponent);