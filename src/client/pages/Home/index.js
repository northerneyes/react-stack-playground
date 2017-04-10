import React from 'react';
import {string, func} from 'prop-types';
import {connect} from 'react-redux';

import {loadHomeNewData} from '../../../common/redux/home/home.actions';

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.props.home}</p>
        <button onClick={this.props.loadHomeNewData}>Load home new data</button>
      </div>
    )
  }
}

Home.propTypes = {
  home: string.isRequired,
  loadHomeNewData: func.isRequired
};

export default connect(mapStateToProps, {loadHomeNewData})(Home);
