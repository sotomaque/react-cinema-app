import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import errorReducers from './errorReducers';
import hardwareReducers from './hardwareReducers';
import movieReducers from './movieReducers';
import pageReducers from './pageReducers';
import searchReducers from './searchReducers';

const rootReducer = combineReducers({
  pageReducers,
  movieReducers,
  searchReducers,
  hardwareReducers,
  errorReducers,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['movieReducers'],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export default persistedReducer;
