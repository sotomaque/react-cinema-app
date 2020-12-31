import { SET_FILTER_TEXT } from 'app/actions/types';

const initialState = {
  filterText: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_TEXT:
      return { filterText: action.payload };

    default:
      return state;
  }
};
