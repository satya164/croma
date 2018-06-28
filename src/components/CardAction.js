/* @flow */

import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '../constants/Colors';

type Props = {
  name: string,
};

export default class CardAction extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity {...this.props}>
        <Icon name={this.props.name} style={styles.icon} size={20} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    margin: 14,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.grey,
  },
});
