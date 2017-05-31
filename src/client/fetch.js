/* global window */

import React from 'react';
import { object } from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default function (fn) {
  const fetch = props => store => fn(store, props);

  return (WrappedComponent) => {
    class FetchOnLoad extends React.Component {

      constructor(props, context) {
        super(props);
        if (context.fetches) {
          context.fetches.push(fetch(props));
        }
      }

      componentDidMount() {
        if (!window.__INITIAL_STATE__) { // eslint-disable-line no-underscore-dangle
          fn(this.context.store, this.props);
        }
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }

    FetchOnLoad.contextTypes = {
      store: object.isRequired,
      fetches: React.PropTypes.array,
    };

    FetchOnLoad.displayName = `Fetch(${getDisplayName(WrappedComponent)})`;

    return hoistStatics(FetchOnLoad, WrappedComponent);
  };
}
