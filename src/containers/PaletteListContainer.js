/* @flow */

import { connect } from 'react-redux';
import PaletteList from '../components/PaletteList';
import { push } from '../actions/NavigationActions';
import { deletePalette } from '../actions/PaletteActions';

function mapStateToProps(state) {
  return {
    palettes: state.palettes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToPalette: (id, title) => dispatch(push({
      name: 'colors',
      key: 'palette_' + id,
      props: {
        title,
        palette: id,
      },
    })),
    deletePalette: (id) => dispatch(deletePalette(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaletteList);
