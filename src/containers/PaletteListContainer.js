/* @flow */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PaletteList from '../components/PaletteList';
import { showAddPalette, deletePalette } from '../actions/PaletteActions';
import type { State } from '../types/State';

const mapStateToProps = (state: State) => ({
  palettes: state.palettes,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      deletePalette,
      showAddPalette,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteList);
