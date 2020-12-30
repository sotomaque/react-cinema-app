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
} from './types';
import { fetchMovies } from '../services/movies';
import { IMAGE_URL } from '../const';

export const getMovies = (type, pageNumber) => async (
  dispatch,
) => {
  try {
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
    switch (type) {
      case 'popular':
        dispatch({
          type: SET_POPULAR_SLIDESHOW_PICTURES,
          payload: heroImages,
        });
        dispatch({
          type: SET_POPULAR_PAGE,
          payload: {
            page: +page,
            totalPages: +total_pages,
          },
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
          payload: {
            page: +page,
            totalPages: +total_pages,
          },
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
          payload: {
            page: +page,
            totalPages: +total_pages,
          },
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
          payload: {
            page: +page,
            totalPages: +total_pages,
          },
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
