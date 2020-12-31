import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { __prod__ } from '../const';
import persistedReducer from '../reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  !__prod__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware),
);

export const persistor = persistStore(store);
export default store;
