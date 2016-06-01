/* @flow */

import { connect } from 'react-redux';
import ColorDetails from '../components/ColorDetails';
import { pop } from '../actions/NavigationActions';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    goBack: () => dispatch(pop()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorDetails);
