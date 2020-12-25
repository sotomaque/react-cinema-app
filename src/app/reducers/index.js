import { combineReducers } from 'redux';

import errorReducers from './errorReducers';
import movieReducers from './movieReducers';

const rootReducer = combineReducers({
  errors: errorReducers,
  movies: movieReducers,
});

export default rootReducer;
