import { SET_MOVIE_LIST } from '../actions/types';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE_LIST:
      return { ...state, list: action.payload };

    default:
      return state;
  }
};
