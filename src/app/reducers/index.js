import { combineReducers } from 'redux';

import errorReducers from './errorReducers';
import hardwareReducers from './hardwareReducers';
import movieReducers from './movieReducers';
import pageReducers from './pageReducers';

const rootReducer = combineReducers({
  pageReducers,
  movieReducers,
  hardwareReducers,
  errorReducers,
});

export default rootReducer;
