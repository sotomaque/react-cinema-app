import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import errorReducers from './errorReducers';
import hardwareReducers from './hardwareReducers';
import movieReducers from './movieReducers';
import pageReducers from './pageReducers';
import searchReducers from './searchReducers';

// Create Root Reducer
const rootReducer = combineReducers({
  errorReducers,
  hardwareReducers,
  movieReducers,
  pageReducers,
  searchReducers,
});

// Create Persisted Config
// Whitelisted Reducer State
// Will Be Store in Local Storage
// Under key: 'root'
const persistConfig = {
  key: 'root',
  storage,
};

// Create Persisted Reducer out of
// Root Reducer and Persisted Config
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

// Export Persisted Reducer
export default persistedReducer;
