/* @flow */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { loadSavedData } from '../actions/AppActions';
import type { State } from '../types/State';

const mapStateToProps = (state: State) => ({
  loading: state.loading,
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      loadSavedData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
