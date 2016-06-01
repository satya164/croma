/* @flow */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback,
    Clipboard,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from 'pigment/full';
import { white, black, grey, darkGrey } from '../constants/Colors';

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
  back: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
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
  color: string;
  goBack: Function;
}

type State = {
  copied: boolean
}

export default class ColorDetails extends Component<void, Props, State> {
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
      { key: 'LAB', value: `lab(${c.lab[0].toFixed(2)}, ${c.lab[1].toFixed(2)}, ${c.lab[2].toFixed(2)})` },
      { key: 'Luminance', value: (c.luminance() * 100).toFixed(2) + '%' },
      { key: 'Darkness', value: (c.darkness() * 100).toFixed(2) + '%' },
    ];
  }

  _copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);

    this.setState({ copied: true });

    if (this._copyTimeout) {
      clearTimeout(this._copyTimeout);
    }

    this._copyTimeout = setTimeout(() => this.setState({ copied: false }), 1500);
  };

  render() {
    const c = new Color(this.props.color);
    const hex = c.tohex();
    const isDark = c.darkness() > 0.4;

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor={c.mix('black', 0.2).tohex()} />
          <View style={[ styles.color, { backgroundColor: hex } ]}>
            <TouchableNativeFeedback onPress={this.props.goBack}>
              <View>
                <Icon
                  name='arrow-back'
                  size={24}
                  style={[ isDark ? { color: white } : { color: black, opacity: 0.7 }, styles.back ]}
                />
              </View>
            </TouchableNativeFeedback>
            <Text style={[ styles.title, isDark ? { color: white } : { color: black, opacity: 0.7 } ]}>{hex.toUpperCase()}</Text>
          </View>
          {this._getItems(c).map(item =>
            <TouchableNativeFeedback key={item.key} onPress={() => this._copyToClipboard(item.value)}>
                <View style={styles.info}>
                    <Text style={styles.key}>{item.key} </Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            </TouchableNativeFeedback>
          )}
        </ScrollView>

        {this.state.copied ?
          <View style={styles.snackbar}>
            <Text style={styles.hint}>Copied to clipboard!</Text>
          </View> :
          null
        }
      </View>
    );
  }
}
