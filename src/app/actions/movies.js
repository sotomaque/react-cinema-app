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
} from 'app/actions/types';
import { fetchMovies } from 'app/services';
import { IMAGE_URL, QUERY_TYPES } from 'app/const';

/**
 * GET MOVIES ACTION
 *
 * - used to fetch movies data
 * - makes api call to endpoint based on type (optionally include pageNumber)
 * - updates corresponding redux state
 *
 * if error:
 * - Update Error State
 *
 * @param {string} type - 'popular' || 'top_rated' || 'upcoming' || 'now_playing'
 * @param {*} pageNumber
 */
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
      case QUERY_TYPES.POPULAR:
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
      case QUERY_TYPES.TOP_RATED:
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
      case QUERY_TYPES.UPCOMING:
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
      case QUERY_TYPES.NOW_PLAYING:
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

/**
 * LOAD MORE MOVIES ACTION
 *
 * - used to implement pagination
 * - makes api call for additional data
 * - spreads data into corresponding redux state
 *
 * @param {QUERY_TYPES} type - 'popular' || 'top_rated' || 'upcoming' || 'now_playing'
 * @param {*} pageNumber
 */
export const loadMoreMovies = (type, pageNumber) => async (
  dispatch,
) => {
  try {
    const response = await getMoviesRequest(
      type,
      pageNumber,
    );
    const { movieResults } = response;
    switch (type) {
      case QUERY_TYPES.POPULAR:
        dispatch({
          type: LOAD_MORE_POPULAR_MOVIES,
          payload: movieResults,
        });
        break;

      case QUERY_TYPES.TOP_RATED:
        dispatch({
          type: LOAD_MORE_TOP_RATED_MOVIES,
          payload: movieResults,
        });
        break;

      case QUERY_TYPES.UPCOMING:
        dispatch({
          type: LOAD_MORE_UPCOMING_MOVIES,
          payload: movieResults,
        });
        break;

      case QUERY_TYPES.NOW_PLAYING:
        dispatch({
          type: LOAD_MORE_NOW_PLAYING_MOVIES,
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

/**
 * SET RESPONSE PAGE NUMBER ACTION
 *
 * - used to implement pagination
 * - this action would be called following a call to loadMoreMovies to update the
 * page state
 *
 * @param {QUERY_TYPES} type - 'popular' || 'top_rated' || 'upcoming' || 'now_playing'
 * @param {number} page
 * @param {number} totalPages
 */
export const setResponsePageNumber = (
  type,
  page,
  totalPages,
) => async (dispatch) => {
  const payload = { page, totalPages };
  switch (type) {
    case QUERY_TYPES.POPULAR:
      dispatch({
        type: SET_POPULAR_PAGE,
        payload,
      });
      break;

    case QUERY_TYPES.TOP_RATED:
      dispatch({
        type: SET_TOP_RATED_PAGE,
        payload,
      });
      break;

    case QUERY_TYPES.UPCOMING:
      dispatch({
        type: SET_UPCOMING_PAGE,
        payload,
      });
      break;

    case QUERY_TYPES.NOW_PLAYING:
      dispatch({
        type: SET_NOW_PLAYING_PAGE,
        payload,
      });
      break;

    default:
      break;
  }
};

// Common code between exported Action Creators
export const getMoviesRequest = async (
  type,
  pageNumber,
) => {
  const { data } = await fetchMovies({ type, pageNumber });
  const { results, page, total_pages } = data;
  const tempMovieResults = results;
  const movieResults = [];
  // ITERATE THROUGH MOVIES RESULTS AND SPREAD URL ATTRIBUTE INTO EACH OBJ
  tempMovieResults.forEach((movie) => {
    movie?.backdrop_path &&
      movieResults.push({
        ...movie,
        url: `${IMAGE_URL}${movie.backdrop_path}`,
      });
  });
  // FIRST 5 MOVIES MAKE UP HEROIMAGES OBJ
  const heroImages = movieResults
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);
  // CREATE PAYLOAD OBJ OUT OF TYPESAFE VARIABLES
  const payload = {
    page: +page,
    totalPages: +total_pages,
  };
  // RETURN MOVIES RESULTS, HERO IMAGES, PAYLOAD OBJ
  return { movieResults, heroImages, payload };
};
