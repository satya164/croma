/* @flow */

import {
  LOAD_SAVED_DATA,
  PUSH_ROUTE,
  POP_ROUTE,
} from '../constants/ActionTypes';

const initialState = {
  index: 0,
  key: 'root',
  routes: [
    {
      key: 'palettes',
      name: 'palettes',
      title: 'Palettes',
    },
  ],
};

type Route = {
  key: string;
  name: string;
  title: string;
}

type NavigationState = {
  index: number;
  key: string;
  routes: Array<Route>;
}

type Action = {
  type: string;
  payload?: Route;
}

export default (currentState : NavigationState = initialState, action: Action): NavigationState => {
  const {
    index,
    routes,
  } = currentState;

  switch (action.type) {
  case LOAD_SAVED_DATA:
    if (action.payload && action.payload.navigation) {
      return action.payload.navigation;
    }
    return currentState;
  case PUSH_ROUTE:
    if (action.payload) {
      return {
        ...currentState,
        routes: [
          ...routes,
          action.payload,
        ],
        index: index + 1,
      };
    } else {
      return currentState;
    }
  case POP_ROUTE:
    if (index > 0) {
      return {
        ...currentState,
        routes: routes.slice(0, routes.length - 1),
        index: index - 1,
      };
    } else {
      return currentState;
    }
  default:
    return currentState;
  }
};
