/* @flow */

import { createStackNavigator } from 'react-navigation';
import PaletteListContainer from '../containers/PaletteListContainer';
import ColorListContainer from '../containers/ColorListContainer';
import ColorDetailsContainer from '../containers/ColorDetailsContainer';

export default createStackNavigator(
  {
    PaletteList: { screen: PaletteListContainer },
    ColorList: { screen: ColorListContainer },
    ColorDetails: { screen: ColorDetailsContainer },
  },
  {
    initialRouteName: 'PaletteList',
  }
);
