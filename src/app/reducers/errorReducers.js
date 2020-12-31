import { SET_ERROR } from 'app/actions/types';

const initialState = {
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
