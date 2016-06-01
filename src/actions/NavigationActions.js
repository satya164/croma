/* @flow */

import { PUSH_ROUTE, POP_ROUTE } from '../constants/ActionTypes';

type Action = {
  type: string
}

type Route = {
  key: string
}

export function push(route: Route): Action {
  return {
    type: PUSH_ROUTE,
    payload: route,
  };
}

export function pop(): Action {
  return {
    type: POP_ROUTE,
  };
}
