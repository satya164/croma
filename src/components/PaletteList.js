/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
} from 'react-native';
import PaletteCard from './PaletteCard';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  content: {
    paddingVertical: 4,
  },
});

type Palette = {
  id: number;
  name: string;
  colors: Array<Object>
}

type Props = {
  palettes: Array<Palette>;
  goToPalette: Function;
  deletePalette: Function;
}

type State = {
  dataSource: ListView.DataSource
}

export default class PaletteList extends Component<void, Props, State> {
  state: State = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  };

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.palettes),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.palettes),
    });
  }

  _handlePress = (palette: Palette) => {
    this.props.goToPalette(palette.id, palette.name);
  };

  _renderRow = (palette: Palette) => {
    return (
      <PaletteCard
        key={palette.id}
        palette={palette}
        deletePalette={this.props.deletePalette}
        onPress={() => this._handlePress(palette)}
      />
    );
  };

  render() {
    return (
      <ListView
        {...this.props}
        style={styles.container}
        contentContainerStyle={styles.content}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }
}
