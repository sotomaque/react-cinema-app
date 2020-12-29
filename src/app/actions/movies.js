import {
  SET_POPULAR_MOVIE_LIST,
  SET_POPULAR_PAGE,
  SET_ERROR,
} from './types';

import { fetchMovies } from '../services/movies';

export const getMovies = (type, pageNumber) => async (
  dispatch,
) => {
  try {
    const movies = await fetchMovies(type, pageNumber);
    const { results, page, total_pages } = movies.data;
    dispatch({
      type: SET_POPULAR_PAGE,
      payload: { page, total_pages },
    });
    dispatch({
      type: SET_POPULAR_MOVIE_LIST,
      payload: results,
    });
  } catch (error) {
    if (error?.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.message,
      });
    }
  }
};
