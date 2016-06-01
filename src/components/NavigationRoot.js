/* @flow */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import Scene from './Scene';

const {
  NavigationExperimental,
  BackAndroid,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

type Route = {
  name: string;
  title: string;
  appbar?: boolean;
  props?: Object;
}

type SceneRendererProps = {
  scene: {
    index: number;
    navigationState: Route;
  };
}

type Props = {
  pushRoute: Function;
  popRoute: Function;
  navigation: {
    index: number;
    children: Array<Route>;
  };
}

export default class Croma extends Component<void, Props, void> {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  _renderScene = (props: SceneRendererProps) => {
    return <Scene {...props} handleBackAction={this._handleBackAction} />;
  };

  _handleBackAction = () => {
    if (this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  };

  _handleNavigate = (action: { type: 'push' | 'pop' | 'back'; payload?: Object }): boolean => {
    switch (action && action.type) {
    case 'push':
      this.props.pushRoute(action.payload);
      return true;
    case 'back':
    case 'pop':
      return this._handleBackAction();
    default:
      return false;
    }
  };

  render() {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate}
        renderScene={this._renderScene}
        style={styles.container}
      />
    );
  }
}
