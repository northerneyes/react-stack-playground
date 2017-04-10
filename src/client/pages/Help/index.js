import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

import * as helpActions from '../../../common/redux/help/help.actions';
import fetch from '../../fetch';

function mapStateToProps(state) {
  return {
    help: state.help,
  };
}

const fetchData = ({ dispatch }) =>
  dispatch(helpActions.loadHelp());

function Help(props) {
  return (
    <div>
      <h1>Help</h1>
      <p>{props.help}</p>
    </div>
  );
}

Help.propTypes = {
  help: string.isRequired,
};

const ConnectedComponent = connect(mapStateToProps)(Help);
export default fetch(fetchData)(ConnectedComponent);
