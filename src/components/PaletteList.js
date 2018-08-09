/* @flow strict */

import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PaletteCard from './PaletteCard';
import FloatingActionButton from './FloatingActionButton';
import Header from './Header';
import * as Colors from '../constants/Colors';
import type { Palette } from '../types/Palette';
import type { NavigationProp, PaletteListParams } from '../types/Navigation';

type Props = {
  navigation: NavigationProp<PaletteListParams>,
  palettes: Array<Palette>,
  deletePalette: (id: string) => mixed,
  showAddPalette: () => mixed,
};

export default class PaletteList extends React.Component<Props> {
  _handlePress = (palette: Palette) => {
    this.props.navigation.push('ColorList', {
      id: palette.id,
      name: palette.name,
    });
  };

  _renderRow = ({ item }: { item: Palette }) => {
    return (
      <PaletteCard
        palette={item}
        deletePalette={this.props.deletePalette}
        onPress={() => this._handlePress(item)}
      />
    );
  };

  _keyExtractor = item => item.id;

  render() {
    const { navigation, showAddPalette } = this.props;

    return (
      <View style={styles.container}>
        <Header title="Pallets" navigation={navigation} />
        <FlatList
          {...this.props}
          style={styles.list}
          contentContainerStyle={styles.content}
          data={this.props.palettes}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
        />
        <FloatingActionButton icon="add" onPress={showAddPalette} />
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
