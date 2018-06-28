/* @flow */

export type PushAction<T, U> = (routeName: T, params: U) => void;

export type PaletteListParams = {};

export type ColorListParams = { id: number, name: string };

export type ColorDetailsParams = { color: string };

export type NavigationProp<T> = {
  push:
    | PushAction<'PaletteList', PaletteListParams>
    | PushAction<'ColorList', ColorListParams>
    | PushAction<'ColorDetails', ColorDetailsParams>,
  goBack: () => void,
  state: {
    params: T,
  },
};
