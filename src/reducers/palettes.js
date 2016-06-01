/* @flow */

import { DELETE_PALETTE, DELETE_COLOR } from '../constants/ActionTypes';

type Palette = {
  id: number;
  colors: Array<{
    color: string;
  }>;
}

type Action = {
  type: string;
  payload?: {
    id?: string;
    palette?: number;
    color?: string;
  };
}

type PaletteState = Array<Palette>

export default (currentState : PaletteState = [], action: Action) => {
  switch (action.type) {
  case DELETE_PALETTE:
    if (action.payload && action.payload.id) {
      const id = action.payload.id;
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
