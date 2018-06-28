/* @flow */

import { connect } from 'react-redux';
import PaletteList from '../components/PaletteList';
import { showAddPalette, deletePalette } from '../actions/PaletteActions';

function mapStateToProps(state) {
  return {
    palettes: state.palettes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePalette: id => dispatch(deletePalette(id)),
    showAddPalette: () => dispatch(showAddPalette()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteList);
