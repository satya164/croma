/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import type { State } from '../types/State';
import type { Store } from '../types/Store';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(
  initialState: ?$Shape<State>
): { store: Store, persistor: any } {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  const persistor = persistStore(store);

  if (module.hot) {
    /* $FlowFixMe */
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
}
