import { combineReducers } from 'redux';

import errorReducers from './errorReducers';
import pageReducers from './pageReducers';
import movieReducers from './movieReducers';

const rootReducer = combineReducers({
  errors: errorReducers,
  movieReducers,
  pageReducers,
});

export default rootReducer;
