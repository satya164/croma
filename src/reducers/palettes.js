/* @flow */

import type { Action } from '../types/Action';
import type { Palette } from '../types/Palette';

export default (currentState: Palette[] = [], action: Action): Palette[] => {
  switch (action.type) {
    case 'LOAD_SAVED_DATA_SUCCESS':
      if (action.payload && action.payload.palettes) {
        return action.payload.palettes;
      }
      return currentState;
    case 'ADD_PALETTE':
      if (
        action.payload &&
        action.payload.id &&
        action.payload.name &&
        action.payload.colors
      ) {
        const { id, name, createTime, colors } = action.payload;
        let i = createTime;
        return [
          {
            id,
            createTime,
            name,
            colors: colors.map(c => ({
              color: c,
              createTime: i++,
            })),
          },
        ].concat(currentState);
      }
      return currentState;
    case 'DELETE_PALETTE':
      if (action.payload && action.payload.id) {
        const { id } = action.payload;
        return currentState.filter(palette => palette.id !== id);
      }
      return currentState;
    case 'DELETE_COLOR':
      if (action.payload) {
        const { palette, color } = action.payload;
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
