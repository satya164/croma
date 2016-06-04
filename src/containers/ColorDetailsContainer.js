/* @flow */

import { connect } from 'react-redux';
import ColorDetails from '../components/ColorDetails';
import { pop } from '../actions/NavigationActions';

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => dispatch(pop()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ColorDetails);
