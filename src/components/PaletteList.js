/* @flow */

import * as React from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import PaletteCard from './PaletteCard';
import FloatingActionButton from './FloatingActionButton';
import * as Colors from '../constants/Colors';
import type { NavigationProp, PaletteListParams } from '../types';

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

type Palette = {
  id: number,
  name: string,
  colors: Array<Object>,
};

type Props = {
  navigation: NavigationProp<PaletteListParams>,
  palettes: Array<Palette>,
  deletePalette: (id: number) => mixed,
  showAddPalette: () => mixed,
};

type State = {
  dataSource: ListView.DataSource,
};

export default class PaletteList extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Palettes',
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      dataSource: state.dataSource.cloneWithRows(props.palettes),
    };
  }

  constructor(props: Props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.palettes),
    };
  }

  _handlePress = (palette: Palette) => {
    this.props.navigation.push('ColorList', {
      id: palette.id,
      name: palette.name,
    });
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
      <View style={styles.container}>
        <ListView
          {...this.props}
          style={styles.list}
          enableEmptySections={false}
          contentContainerStyle={styles.content}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <FloatingActionButton icon="add" onPress={this.props.showAddPalette} />
      </View>
    );
  }
}
