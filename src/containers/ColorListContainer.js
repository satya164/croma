/* @flow strict */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ColorList from '../components/ColorList';
import { showAddColor, deleteColor } from '../actions/PaletteActions';
import type { State } from '../types/State';

const getColors = (palettes, id) => {
  const palette = palettes.find(p => p.id === id);

  if (palette && palette.colors) {
    return palette.colors;
  } else {
    return [];
  }
};

const mapStateToProps = (state: State, ownProps: *) => ({
  colors: getColors(state.palettes, ownProps.navigation.state.params.id),
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      deleteColor,
      showAddColor,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorList);
