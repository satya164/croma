/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import routeMapper from '../routeMapper';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 56,
    elevation: 4,
  },
  icon: {
    margin: 16,
    color: Colors.white,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    margin: 16,
  },
  content: {
    flex: 1,
  },
});

type Props = {
  scene: {
    index: number;
    navigationState: {
      name: string;
      title: string;
      appbar?: boolean;
      props?: Object;
    };
  };
  handleBackAction: Function;
  style?: any;
}

export default class Scene extends Component<void, Props, void> {
  render() {
    const {
      index,
      navigationState,
    } = this.props.scene;

    const routeDesc = routeMapper(navigationState);
    const SceneChild = routeDesc.component;

    return (
      <View style={[ styles.container, this.props.style ]}>
        <StatusBar backgroundColor={Colors.primaryDark} />
        {routeDesc.appbar !== false ?
          <View style={styles.appbar}>
            {index !== 0 ?
              <TouchableNativeFeedback onPress={this.props.handleBackAction}>
                <View>
                  <Icon
                    name='arrow-back'
                    size={24}
                    style={styles.icon}
                  />
                </View>
              </TouchableNativeFeedback> :
              null
            }
            {routeDesc.title ?
              <Text style={styles.title}>{routeDesc.title}</Text> :
              null
            }
          </View> :
          null
        }
        <View style={styles.content}>
          <SceneChild {...navigationState.props} />
        </View>
      </View>
    );
  }
}
