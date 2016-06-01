/* @flow */

import { connect } from 'react-redux';
import ColorList from '../components/ColorList';
import { push, pop } from '../actions/NavigationActions';
import { showAddColor, deleteColor } from '../actions/PaletteActions';

function getColors(palettes, id) {
  const palette = palettes.filter(p => p.id === id)[0];

  if (palette && palette.colors) {
    return palette.colors;
  } else {
    return [];
  }
}

function mapStateToProps(state, ownProps) {
  return {
    colors: getColors(state.palettes, ownProps.palette),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => dispatch(pop()),
    goToColor: (palette, color) => dispatch(push({
      name: 'color_details',
      key: 'color_' + palette + '_' + color,
      props: {
        color,
      },
    })),
    deleteColor: (palette, color) => dispatch(deleteColor(palette, color)),
    showAddColor: (palette) => dispatch(showAddColor(palette)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorList);
