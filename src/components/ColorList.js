/* @flow strict */

import * as React from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import ColorCard from './ColorCard';
import Header from './Header';
import FloatingActionButton from './FloatingActionButton';
import * as Colors from '../constants/Colors';
import type { NavigationProp, ColorListParams } from '../types/Navigation';

type Props = {
  navigation: NavigationProp<ColorListParams>,
  palette: string,
  colors: Array<{
    color: string,
  }>,
  showAddColor: (palette: string) => mixed,
  deleteColor: (palette: string, color: string) => mixed,
};

type State = {
  dataSource: ListView.DataSource,
};

export default class ColorList extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      dataSource: state.dataSource.cloneWithRows(props.colors),
    };
  }

  constructor(props: Props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.colors),
    };
  }

  _handlePress = (color: string) => {
    this.props.navigation.push('ColorDetails', { color });
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
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header
          title={navigation.state.params.name}
          onBackPress={() => navigation.goBack()}
        />
        <ListView
          {...this.props}
          style={styles.list}
          contentContainerStyle={styles.content}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <FloatingActionButton icon="add" onPress={this._handleShowAddColor} />
      </View>
    );
  }
}

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
