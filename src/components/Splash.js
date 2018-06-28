/* @flow */

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { primary } from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
  },
});

export default class Splash extends React.Component<*> {
  render() {
    return <View style={styles.container} />;
  }
}
