import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { __prod__ } from '../const';
import rootReducer from '../reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  !__prod__
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware),
);

export default store;
