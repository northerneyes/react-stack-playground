import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {provideHooks} from 'redial';

import * as helpActions from '../../../common/redux/help/help.actions';

function mapStateToProps(state) {
  return {
    help: state.help
  }
}

const hooks = {
  fetch: ({dispatch}) => dispatch(helpActions.loadHelp())
};

class Help extends React.Component {
  render() {
    return (
      <div>
        <h1>Help</h1>
        <p>{this.props.help}</p>
      </div>
    );
  }
}

Help.propTypes = {
  help: PropTypes.string.isRequired
};

const ConnectedComponent = connect(mapStateToProps)(Help);
export default provideHooks(hooks)(ConnectedComponent);
