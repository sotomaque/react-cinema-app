import { SET_PAGE, SET_QUERY } from 'app/actions/types';

const initialState = {
  currentPage: 'home',
  previousPage: '',
  query: 'popular',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        previousPage: state.currentPage,
        currentPage: `${action.payload}`,
      };

    case SET_QUERY:
      return {
        ...state,
        query: `${action.payload}`,
      };

    default:
      return state;
  }
};
