/* @flow */

import ReactNative from 'react-native';
import { PUSH_ROUTE, POP_ROUTE } from '../constants/ActionTypes';

const {
  NavigationExperimental,
} = ReactNative;

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  index: 0,
  key: 'root',
  children: [
    {
      key: 'palettes',
      name: 'palettes',
      title: 'Palettes',
    },
  ],
};

type NavigationState = {
  index: number;
  key: string;
  children: Array<{
    key: string;
    name: string;
    title: string;
  }>;
}

type Action = {
  type: string;
  payload?: Object;
}

export default (currentState : NavigationState = initialState, action: Action) => {
  switch (action.type) {
  case PUSH_ROUTE:
    return NavigationStateUtils.push(currentState, action.payload);
  case POP_ROUTE:
    return currentState.index > 0 ?
        NavigationStateUtils.pop(currentState) :
        currentState;
  default:
    return currentState;
  }
};
