import { SET_LOADING, SET_THEME } from '../actions/types';

const initialState = {
  loading: false,
  theme: 'light',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: !!action.payload };

    case SET_THEME:
      return { ...state, theme: `${action.payload}` };

    default:
      return state;
  }
};
