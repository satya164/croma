/* @flow strict */

import { Platform, StatusBar } from 'react-native';
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
    navigationOptions: {
      header: null,
      headerStyle:
        Platform.OS === 'android'
          ? {
              paddingTop: StatusBar.currentHeight,
              height: StatusBar.currentHeight + 56,
            }
          : null,
    },
  }
);
