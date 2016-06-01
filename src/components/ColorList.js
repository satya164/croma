/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
} from 'react-native';
import ColorCard from './ColorCard';
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

type Props = {
  palette: string;
  colors: Array<{
    color: string;
  }>;
  deleteColor: Function;
  goToColor: Function;
}

type State = {
  dataSource: ListView.DataSource
}

export default class ColorList extends Component<void, Props, State> {
  state: State = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  };

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.colors),
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.colors),
    });
  }

  _handlePress = (color: string) => {
    this.props.goToColor(this.props.palette, color);
  };

  _handleDelete = (color: string) => {
    this.props.deleteColor(this.props.palette, color);
  };

  _renderRow = (color: { color: string }) => {
    return (
      <ColorCard
        color={color}
        key={color.color}
        deleteColor={this._handleDelete}
        onPress={() => this._handlePress(color.color)}
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
