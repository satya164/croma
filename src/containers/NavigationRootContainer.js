/* @flow */

import { connect } from 'react-redux';
import NavigationRoot from '../components/NavigationRoot';
import { push, pop } from '../actions/NavigationActions';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationRoot);
