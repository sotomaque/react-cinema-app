import {
  LOAD_MORE_NOW_PLAYING_MOVIES,
  LOAD_MORE_POPULAR_MOVIES,
  LOAD_MORE_TOP_RATED_MOVIES,
  LOAD_MORE_UPCOMING_MOVIES,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_NOW_PLAYING_PAGE,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES,
  SET_POPULAR_MOVIE_LIST,
  SET_POPULAR_PAGE,
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_TOP_RATED_MOVIE_LIST,
  SET_TOP_RATED_PAGE,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
  SET_UPCOMING_MOVIE_LIST,
  SET_UPCOMING_PAGE,
  SET_UPCOMING_SLIDESHOW_PICTURES,
} from 'app/actions/types';

const initialState = {
  popularMovies: {
    page: 1,
    totalPages: 0,
    list: [],
    heroImages: [],
    fetchedAt: '',
  },
  topRatedMovies: {
    page: 1,
    totalPages: 0,
    list: [],
    heroImages: [],
    fetchedAt: '',
  },
  nowPlayingMovies: {
    page: 1,
    totalPages: 0,
    list: [],
    heroImages: [],
    fetchedAt: '',
  },
  upcomingMovies: {
    page: 1,
    totalPages: 0,
    list: [],
    heroImages: [],
    fetchedAt: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POPULAR_MOVIE_LIST:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          list: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_NOW_PLAYING_MOVIE_LIST:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        nowPlayingMovies: {
          ...state.nowPlayingMovies,
          list: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_TOP_RATED_MOVIE_LIST:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        topRatedMovies: {
          ...state.topRatedMovies,
          list: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_UPCOMING_MOVIE_LIST:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        upcomingMovies: {
          ...state.upcomingMovies,
          list: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_UPCOMING_SLIDESHOW_PICTURES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        upcomingMovies: {
          ...state.upcomingMovies,
          heroImages: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_POPULAR_SLIDESHOW_PICTURES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          heroImages: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_NOW_PLAYING_SLIDESHOW_PICTURES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        nowPlayingMovies: {
          ...state.nowPlayingMovies,
          heroImages: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_TOP_RATED_SLIDESHOW_PICTURES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        topRatedMovies: {
          ...state.topRatedMovies,
          heroImages: action.payload,
          fetchedAt: new Date(),
        },
      };

    case SET_POPULAR_PAGE:
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
        },
      };

    case SET_UPCOMING_PAGE:
      return {
        ...state,
        upcomingMovies: {
          ...state.upcomingMovies,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
        },
      };

    case SET_TOP_RATED_PAGE:
      return {
        ...state,
        topRatedMovies: {
          ...state.topRatedMovies,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
        },
      };

    case SET_NOW_PLAYING_PAGE:
      return {
        ...state,
        nowPlayingMovies: {
          ...state.nowPlayingMovies,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
        },
      };

    case LOAD_MORE_POPULAR_MOVIES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        popularMovies: {
          ...state.popularMovies,
          list: [
            ...state.popularMovies.list,
            ...action.payload,
          ],
          fetchedAt: new Date(),
        },
      };

    case LOAD_MORE_UPCOMING_MOVIES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        upcomingMovies: {
          ...state.upcomingMovies,
          list: [
            ...state.upcomingMovies.list,
            ...action.payload,
          ],
          fetchedAt: new Date(),
        },
      };

    case LOAD_MORE_TOP_RATED_MOVIES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        topRatedMovies: {
          ...state.topRatedMovies,
          list: [
            ...state.topRatedMovies.list,
            ...action.payload,
          ],
          fetchedAt: new Date(),
        },
      };

    case LOAD_MORE_NOW_PLAYING_MOVIES:
      if (
        !action.payload ||
        !action.payload?.length ||
        action.payload?.length === 0
      ) {
        return state;
      }
      return {
        ...state,
        nowPlayingMovies: {
          ...state.nowPlayingMovies,
          list: [
            ...state.nowPlayingMovies.list,
            ...action.payload,
          ],
          fetchedAt: new Date(),
        },
      };

    default:
      return state;
  }
};
