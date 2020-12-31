import {
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_POPULAR_PAGE,
  SET_POPULAR_MOVIE_LIST,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
  SET_TOP_RATED_PAGE,
  SET_TOP_RATED_MOVIE_LIST,
  SET_UPCOMING_SLIDESHOW_PICTURES,
  SET_UPCOMING_PAGE,
  SET_UPCOMING_MOVIE_LIST,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES,
  SET_NOW_PLAYING_PAGE,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_ERROR,
  LOAD_MORE_POPULAR_MOVIES,
  LOAD_MORE_NOW_PLAYING_MOVIES,
  LOAD_MORE_TOP_RATED_MOVIES,
  LOAD_MORE_UPCOMING_MOVIES,
} from './types';
import { fetchMovies } from '../services/movies';
import { IMAGE_URL } from '../const';

export const getMovies = (type, pageNumber) => async (
  dispatch,
) => {
  try {
    const response = await getMoviesRequest(
      type,
      pageNumber,
    );
    const { movieResults, heroImages, payload } = response;
    switch (type) {
      case 'popular':
        dispatch({
          type: SET_POPULAR_SLIDESHOW_PICTURES,
          payload: heroImages,
        });
        dispatch({
          type: SET_POPULAR_PAGE,
          payload,
        });
        dispatch({
          type: SET_POPULAR_MOVIE_LIST,
          payload: movieResults,
        });
        break;
      case 'top_rated':
        dispatch({
          type: SET_TOP_RATED_SLIDESHOW_PICTURES,
          payload: heroImages,
        });
        dispatch({
          type: SET_TOP_RATED_PAGE,
          payload,
        });
        dispatch({
          type: SET_TOP_RATED_MOVIE_LIST,
          payload: movieResults,
        });
        break;
      case 'upcoming':
        dispatch({
          type: SET_UPCOMING_SLIDESHOW_PICTURES,
          payload: heroImages,
        });
        dispatch({
          type: SET_UPCOMING_PAGE,
          payload,
        });
        dispatch({
          type: SET_UPCOMING_MOVIE_LIST,
          payload: movieResults,
        });
        break;
      case 'now_playing':
        dispatch({
          type: SET_NOW_PLAYING_SLIDESHOW_PICTURES,
          payload: heroImages,
        });
        dispatch({
          type: SET_NOW_PLAYING_PAGE,
          payload,
        });
        dispatch({
          type: SET_NOW_PLAYING_MOVIE_LIST,
          payload: movieResults,
        });
        break;

      default:
        break;
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.message,
      });
    }
  }
};

export const loadMoreMovies = (type, pageNumber) => async (
  dispatch,
) => {
  try {
    const response = await getMoviesRequest(
      type,
      pageNumber,
    );
    const { movieResults, payload } = response;
    switch (type) {
      case 'popular':
        dispatch({
          type: LOAD_MORE_POPULAR_MOVIES,
          payload: movieResults,
        });
        break;
      case 'top_rated':
        dispatch({
          type: LOAD_MORE_TOP_RATED_MOVIES,
          payload: movieResults,
        });
        dispatch({
          type: SET_TOP_RATED_PAGE,
          payload,
        });
        break;
      case 'upcoming':
        dispatch({
          type: LOAD_MORE_UPCOMING_MOVIES,
          payload: movieResults,
        });
        dispatch({
          type: SET_UPCOMING_PAGE,
          payload,
        });
        break;
      case 'now_playing':
        dispatch({
          type: LOAD_MORE_NOW_PLAYING_MOVIES,
          payload: movieResults,
        });
        dispatch({
          type: SET_NOW_PLAYING_PAGE,
          payload,
        });
        break;

      default:
        break;
    }
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.message,
      });
    }
  }
};

export const setResponsePageNumber = (
  type,
  page,
  totalPages,
) => async (dispatch) => {
  const payload = { page, totalPages };
  switch (type) {
    case 'popular':
      dispatch({
        type: SET_POPULAR_PAGE,
        payload,
      });
      break;

    case 'top_rated':
      dispatch({
        type: SET_TOP_RATED_PAGE,
        payload,
      });
      break;

    case 'upcoming':
      dispatch({
        type: SET_UPCOMING_PAGE,
        payload,
      });
      break;

    case 'now_playing':
      dispatch({
        type: SET_NOW_PLAYING_PAGE,
        payload,
      });
      break;

    default:
      break;
  }
};

export const getMoviesRequest = async (
  type,
  pageNumber,
) => {
  const { data } = await fetchMovies(type, pageNumber);
  const { results, page, total_pages } = data;
  const tempMovieResults = results;
  const movieResults = [];
  tempMovieResults.forEach((movie) => {
    movie?.backdrop_path &&
      movieResults.push({
        ...movie,
        url: `${IMAGE_URL}${movie.backdrop_path}`,
      });
  });
  const heroImages = movieResults
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);
  const payload = {
    page: +page,
    totalPages: +total_pages,
  };
  return { movieResults, heroImages, payload };
};
