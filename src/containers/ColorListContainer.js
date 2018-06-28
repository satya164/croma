/* @flow */

import { connect } from 'react-redux';
import ColorList from '../components/ColorList';
import { showAddColor, deleteColor } from '../actions/PaletteActions';

function getColors(palettes, id) {
  const palette = palettes.find(p => p.id === id);

  if (palette && palette.colors) {
    return palette.colors;
  } else {
    return [];
  }
}

function mapStateToProps(state, ownProps) {
  return {
    colors: getColors(state.palettes, ownProps.navigation.state.params.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteColor: (palette, color) => dispatch(deleteColor(palette, color)),
    showAddColor: palette => dispatch(showAddColor(palette)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorList);
