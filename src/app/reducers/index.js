import { combineReducers } from 'redux';

import errorReducers from './errorReducers';
import movieReducers from './movieReducers';

const rootReducer = combineReducers({
  errors: errorReducers,
  movieReducers,
});

export default rootReducer;
