/* @flow strict */

import type { Action } from '../types/Action';
import type { Palette } from '../types/Palette';

export default (currentState: Palette[] = [], action: Action): Palette[] => {
  switch (action.type) {
    case 'ADD_PALETTE': {
      const { id, name, createdAt, colors } = action.payload;

      return [
        {
          id,
          createdAt,
          name,
          colors: colors.map(c => ({
            color: c,
          })),
        },
      ].concat(currentState);
    }
    case 'DELETE_PALETTE': {
      const { id } = action.payload;

      return currentState.filter(palette => palette.id !== id);
    }
    case 'DELETE_COLOR': {
      const { palette, color } = action.payload;

      return currentState.map(p => {
        if (p.id === palette) {
          const colors = p.colors.filter(c => c.color !== color);
          return { ...p, colors };
        }

        return p;
      });
    }
    default:
      return currentState;
  }
};
