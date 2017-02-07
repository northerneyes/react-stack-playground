import React, {PropTypes} from 'react';
import {Route, matchPath, withRouter} from 'react-router-dom';

class AsyncRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  getComponent() {
    const match = matchPath(this.props.location.pathname, this.props.path);
    const existing = this.context.components[this.props.path];

    if (!match || existing) {
      return Promise.resolve();
    }

    return this.props.getComponent()
      .then(component => component.default)
      .then(component => {
        this.context.components[this.props.path] = component;
        if (this.mounted) this.setState({loaded: true});
        return component;
      });
  }

  componentWillMount() {
    this.context.resolvers[this.props.path] = this.getComponent.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.getComponent();
  }

  componentDidUpdate() {
    this.getComponent();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const component = this.context.components[this.props.path];

    if (component) {
      return <Route path={this.props.path} component={component}/>
    } else {
      return null;
    }
  }
}

AsyncRoute.contextTypes = {
  components: PropTypes.object,
  resolvers: PropTypes.object
};

AsyncRoute.propTypes = {
  path: PropTypes.string.isRequired,
  getComponent: PropTypes.func,
  component: PropTypes.func
};

export default withRouter(AsyncRoute);