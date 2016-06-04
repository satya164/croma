/* @flow */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import NavigationRootContainer from './NavigationRootContainer';

const RootContainer = (props: Object) => {
  return (
    <Provider store={props.store}>
      <NavigationRootContainer />
    </Provider>
  );
};

RootContainer.propTypes = {
  store: React.PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    replaceReducer: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }),
};

export default RootContainer;
