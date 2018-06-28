/* @flow strict */

import * as React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native';
import Card from './Card';
import CardAction from './CardAction';
import * as Colors from '../constants/Colors';
import type { Palette } from '../types/Palette';

type Props = {
  palette: Palette,
  deletePalette: (id: string) => mixed,
  onPress: () => mixed,
};

export default class PaletteCard extends React.Component<Props> {
  _handleDelete = () => {
    this.props.deletePalette(this.props.palette.id);
  };

  render() {
    const { palette } = this.props;

    return (
      <Card {...this.props}>
        <TouchableNativeFeedback onPress={this.props.onPress}>
          <View>
            <View style={styles.palette}>
              {palette.colors.map(item => (
                <View
                  style={[styles.color, { backgroundColor: item.color }]}
                  key={item.color}
                />
              ))}
            </View>
            <View style={styles.bottom}>
              <Text style={styles.label}>{this.props.palette.name}</Text>
              <CardAction name="create" />
              <CardAction name="delete" onPress={this._handleDelete} />
            </View>
          </View>
        </TouchableNativeFeedback>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  palette: {
    alignItems: 'stretch',
    flexDirection: 'row',
    height: 100,
  },
  color: {
    flex: 1,
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
