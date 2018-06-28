/* @flow */

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  Clipboard,
} from 'react-native';
import Color from 'pigment/full';
import { white, grey, darkGrey } from '../constants/Colors';
import type { NavigationProp, ColorDetailsParams } from '../types/Navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  color: {
    height: 160,
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .04)',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  key: {
    fontSize: 12,
    fontWeight: 'bold',
    color: grey,
  },
  value: {
    color: darkGrey,
  },
  snackbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: darkGrey,
  },
  hint: {
    color: white,
    margin: 16,
  },
});

type Props = {
  navigation: NavigationProp<ColorDetailsParams>,
};

type State = {
  copied: boolean,
};

export default class ColorDetails extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationProp<ColorDetailsParams>,
  }) => ({
    title: navigation.state.params.color.toUpperCase(),
  });

  state: State = {
    copied: false,
  };

  _copyTimeout: ?any;

  _getItems = (c: Color) => {
    return [
      { key: 'RGB', value: c.torgb() },
      { key: 'HSL', value: c.tohsl() },
      { key: 'HSV', value: c.tohsv() },
      { key: 'HWB', value: c.tohwb() },
      { key: 'CMYK', value: c.tocmyk() },
      { key: 'CIELAB', value: c.tolab() },
      { key: 'Luminance', value: (c.luminance() * 100).toFixed(2) + '%' },
      { key: 'Darkness', value: (c.darkness() * 100).toFixed(2) + '%' },
    ];
  };

  _copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);

    this.setState({ copied: true });

    if (this._copyTimeout) {
      clearTimeout(this._copyTimeout);
    }

    this._copyTimeout = setTimeout(
      () => this.setState({ copied: false }),
      1500
    );
  };

  render() {
    const c = new Color(this.props.navigation.state.params.color);
    const hex = c.tohex();

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.color, { backgroundColor: hex }]} />
          {this._getItems(c).map(item => (
            <TouchableNativeFeedback
              key={item.key}
              onPress={() => this._copyToClipboard(item.value)}
            >
              <View style={styles.info}>
                <Text style={styles.key}>{item.key} </Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView>

        {this.state.copied ? (
          <View style={styles.snackbar}>
            <Text style={styles.hint}>Copied to clipboard!</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
