/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { primary } from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
  },
});

export default class Splash extends Component<void, any, void> {
  render() {
    return <View style={styles.container} />;
  }
}
