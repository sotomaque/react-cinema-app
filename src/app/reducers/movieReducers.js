import {
  SET_POPULAR_MOVIE_LIST,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_PAGE,
  SET_SLIDESHOW_PICTURES,
} from '../actions/types';

const initialState = {
  popular: [],
  now_playing: [],
  page: 1,
  totalPages: 0,
  heroImages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POPULAR_MOVIE_LIST:
      return { ...state, popular: action.payload };

    case SET_NOW_PLAYING_MOVIE_LIST:
      return { ...state, now_playing: action.payload };

    case SET_SLIDESHOW_PICTURES:
      return { ...state, heroImages: action.payload };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };

    default:
      return state;
  }
};
