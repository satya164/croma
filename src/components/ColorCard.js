/* @flow */

import * as React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native';
import Card from './Card';
import CardAction from './CardAction';
import * as Colors from '../constants/Colors';

type Props = {
  color: {
    color: string,
  },
  onPress: Function,
  deleteColor: Function,
};

export default class ColorCard extends React.Component<Props> {
  _handleDelete = () => {
    this.props.deleteColor(this.props.color.color);
  };

  render() {
    return (
      <Card>
        <TouchableNativeFeedback onPress={this.props.onPress}>
          <View>
            <View
              style={[
                styles.color,
                { backgroundColor: this.props.color.color },
              ]}
            />
            <View style={styles.bottom}>
              <Text style={styles.label}>{this.props.color.color}</Text>
              <CardAction name="delete" onPress={this._handleDelete} />
            </View>
          </View>
        </TouchableNativeFeedback>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  color: {
    height: 100,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    marginHorizontal: 16,
    color: Colors.darkGrey,
  },
});
