/* @flow */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import NavigationContainer from './NavigationContainer';

const RootContainer = (props: Object) => {
  return (
    <Provider store={props.store}>
      <NavigationContainer />
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
