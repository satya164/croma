/* @flow */

import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  inner: {
    backgroundColor: Colors.white,
    marginVertical: 4,
    elevation: 1,
  },
});

type Props = {
  style?: any;
  children?: React.Element;
}

export default class Card extends Component<void, Props, void> {
  render() {
    return (
      <Animated.View {...this.props} style={[ styles.inner, this.props.style ]}>
          {this.props.children}
      </Animated.View>
    );
  }
}
