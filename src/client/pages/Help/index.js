import React from 'react';
import {string} from 'prop-types';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    help: state.help
  }
}

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
  help: string.isRequired
};

export default connect(mapStateToProps)(Help);
