import {
  SET_POPULAR_MOVIE_LIST,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_TOP_RATED_MOVIE_LIST,
  SET_PAGE,
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
} from '../actions/types';

const initialState = {
  popularMovies: [],
  nowPlayingMovies: [],
  topRatedMovies: [],
  page: 1,
  totalPages: 0,
  popularSlideShow: [],
  nowPlayingSlideShow: [],
  topRatedSlideShow: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POPULAR_MOVIE_LIST:
      return { ...state, popularMovies: action.payload };

    case SET_NOW_PLAYING_MOVIE_LIST:
      return { ...state, nowPlayingMovies: action.payload };

    case SET_TOP_RATED_MOVIE_LIST:
      return { ...state, topRatedMovies: action.payload };

    case SET_POPULAR_SLIDESHOW_PICTURES:
      return { ...state, popularSlideShow: action.payload };

    case SET_NOW_PLAYING_SLIDESHOW_PICTURES:
      return {
        ...state,
        nowPlayingSlideShow: action.payload,
      };

    case SET_TOP_RATED_SLIDESHOW_PICTURES:
      return {
        ...state,
        topRatedSlideShow: action.payload,
      };

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
