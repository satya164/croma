/* @flow */

import { connect } from 'react-redux';
import App from '../components/App';
import { loadSavedData } from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSavedData: () => dispatch(loadSavedData()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
