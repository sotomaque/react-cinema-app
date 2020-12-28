import { combineReducers } from 'redux';

import errorReducers from './errorReducers';
import hardwareReducers from './hardwareReducers';
import pageReducers from './pageReducers';
import movieReducers from './movieReducers';

const rootReducer = combineReducers({
  pageReducers,
  movieReducers,
  hardwareReducers,
  errorReducers,
});

export default rootReducer;
