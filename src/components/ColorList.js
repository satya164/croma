/* @flow */

import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import ColorCard from './ColorCard';
import FloatingActionButton from './FloatingActionButton';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  content: {
    paddingVertical: 4,
    paddingBottom: 88,
  },
});

type Props = {
  palette: string;
  colors: Array<{
    color: string;
  }>;
  showAddColor: Function;
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

  _handleShowAddColor = () => {
    this.props.showAddColor(this.props.palette);
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
      <View style={styles.container}>
        <ListView
          {...this.props}
          style={styles.list}
          contentContainerStyle={styles.content}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <FloatingActionButton icon='add' onPress={this._handleShowAddColor} />
      </View>
    );
  }
}
