/* @flow */

import {
  ADD_PALETTE,
  DELETE_PALETTE,
  DELETE_COLOR,
} from '../constants/ActionTypes';

type Palette = {
  id: number;
  colors: Array<{
    color: string;
  }>;
}

type Action = {
  type: string;
  payload?: any;
}

type PaletteState = Array<Palette>

export default (currentState : PaletteState = [], action: Action): PaletteState => {
  switch (action.type) {
  case ADD_PALETTE:
    if (action.payload && action.payload.id && action.payload.name && action.payload.colors) {
      const {
        id,
        name,
        createTime,
        colors,
      } = action.payload;
      let i = createTime;
      return [ {
        id,
        createTime,
        name,
        colors: colors.map(c => ({
          color: c,
          createTime: i++,
        })),
      } ].concat(currentState);
    }
    return currentState;
  case DELETE_PALETTE:
    if (action.payload && action.payload.id) {
      const { id } = action.payload;
      return currentState.filter(palette => palette.id !== id);
    }
    return currentState;
  case DELETE_COLOR:
    if (action.payload) {
      const {
        palette,
        color,
      } = action.payload;
      if (palette && color) {
        return currentState.map(p => {
          if (p.id === palette) {
            const colors = p.colors.filter(c => c.color !== color);
            return { ...p, colors };
          }

          return p;
        });
      }
    }
    return currentState;
  default:
    return currentState;
  }
};
