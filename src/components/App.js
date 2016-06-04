/* @flow */

import React, { Component } from 'react';
import Splash from './Splash';
import NavigationRootContainer from '../containers/NavigationRootContainer';

type Props = {
  loading: boolean;
  loadSavedData: Function;
}

export default class App extends Component<void, Props, void> {
  componentDidMount() {
    this.props.loadSavedData();
  }

  render() {
    if (this.props.loading) {
      return <Splash />;
    }

    return <NavigationRootContainer />;
  }
}
