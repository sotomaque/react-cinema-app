import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { __prod__ } from '../const';
import persistedReducer from '../reducers';

const initialState = {};
const middleware = [thunk];

// Create Store with Persisted Reducer
const store = createStore(
  persistedReducer,
  initialState,
  !__prod__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware),
);

// Export Persistor
export const persistor = persistStore(store);
// Export Store
export default store;
