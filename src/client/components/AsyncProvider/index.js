import React, {PropTypes} from 'react';

export default class AsyncProvider extends React.Component {
  getChildContext() {
    return {
      components: this.props.components,
      resolvers: this.props.resolvers
    };
  }

  render() {
    return this.props.children;
  }
}

AsyncProvider.propTypes = {
  children: PropTypes.node.isRequired,
  components: PropTypes.object.isRequired,
  resolvers: PropTypes.object.isRequired
};

AsyncProvider.childContextTypes = {
  components: PropTypes.object,
  resolvers: PropTypes.object
};