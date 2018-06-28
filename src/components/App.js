/* @flow */

import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import PaletteListContainer from '../containers/PaletteListContainer';
import ColorListContainer from '../containers/ColorListContainer';
import ColorDetailsContainer from '../containers/ColorDetailsContainer';
import Splash from './Splash';

const Root = createStackNavigator(
  {
    PaletteList: { screen: PaletteListContainer },
    ColorList: { screen: ColorListContainer },
    ColorDetails: { screen: ColorDetailsContainer },
  },
  {
    initialRouteName: 'PaletteList',
  }
);

type Props = {
  loading: boolean,
  loadSavedData: Function,
};

export default class App extends React.Component<Props> {
  componentDidMount() {
    this.props.loadSavedData();
  }

  render() {
    if (this.props.loading) {
      return <Splash />;
    }

    return <Root />;
  }
}
