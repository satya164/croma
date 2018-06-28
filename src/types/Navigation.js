/* @flow */

export type PushAction<T, U> = (routeName: T, params: U) => void;

export type PaletteListParams = void;

export type ColorListParams = {| id: number, name: string |};

export type ColorDetailsParams = {| color: string |};

export type NavigationProp<T> = {|
  push: (
    ...args:
      | ['PaletteList', PaletteListParams]
      | ['ColorList', ColorListParams]
      | ['ColorDetails', ColorDetailsParams]
  ) => void,
  goBack: () => void,
  state: {
    params: T,
  },
|};
