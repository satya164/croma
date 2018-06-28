/* @flow strict */

import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';
import * as Colors from '../constants/Colors';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  children: React.Node,
  style?: ViewStyleProp,
};

export default class Card extends React.Component<Props> {
  render() {
    return (
      <Animated.View {...this.props} style={[styles.inner, this.props.style]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  inner: {
    backgroundColor: Colors.white,
    marginVertical: 4,
    elevation: 1,
  },
});
