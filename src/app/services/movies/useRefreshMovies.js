import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInMinutes } from 'date-fns';
import {
  SET_ERROR,
  SET_LOADING,
  SET_NOW_PLAYING_PAGE,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES,
  SET_POPULAR_PAGE,
  SET_POPULAR_MOVIE_LIST,
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_TOP_RATED_PAGE,
  SET_TOP_RATED_MOVIE_LIST,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
  SET_UPCOMING_PAGE,
  SET_UPCOMING_MOVIE_LIST,
  SET_UPCOMING_SLIDESHOW_PICTURES,
} from '../../actions/types';
import {
  useNowPlayingMoviesFetch,
  usePopularMoviesFetch,
  useTopRatedMoviesFetch,
  useUpcomingMoviesFetch,
} from '../../hooks';

/**
 * MOVIE FETCHING SERVICE
 *
 * Fetches:
 *  - popular movies
 *  - top rated movies
 *  - now playing movies
 *  - upcoming movies
 *
 * if not in redux ||
 *  (in redux and older than 10 min) => updates redux state
 */
const useRefreshMovies = () => {
  const dispatch = useDispatch();

  // return true if timestamp passed in
  // is older than 10 min
  const isStale = (timestamp = new Date()) => {
    return differenceInMinutes(new Date(), timestamp) >= 10;
  };

  // GET REDUX STATE VALUES
  const loadingState = useSelector(
    (state) => state.hardwareReducers.loading,
  );
  // POPULAR MOVIES
  const popularMoviesState = useSelector(
    (state) => state.movieReducers.popularMovies,
  );
  const {
    list: popularMoviesList,
    fetchedAt: popularMoviesFetchedAt,
    heroImages: popularHeroImagesState,
    page: popularMoviesCurrentPageState,
    totalPages: popularMoviesTotalPagesState,
  } = popularMoviesState;
  // TOP RATED MOVIES
  const topRatedMoviesState = useSelector(
    (state) => state.movieReducers.topRatedMovies,
  );
  const {
    list: topRatedMoviesList,
    fetchedAt: topRatedMoviesFetchedAt,
    heroImages: topRatedHeroImagesState,
    page: topRatedMoviesCurrentPageState,
  } = topRatedMoviesState;
  // NOW PLAYING MOVIES
  const nowPlayingMoviesState = useSelector(
    (state) => state.movieReducers.nowPlayingMovies,
  );
  const {
    list: nowPlayingMoviesList,
    fetchedAt: nowPlayingMoviesFetchedAt,
    heroImages: nowPlayingHeroImagesState,
    page: nowPlayingMoviesCurrentPageState,
  } = nowPlayingMoviesState;
  // UPCOMING MOVIES
  const upcomingMoviesState = useSelector(
    (state) => state.movieReducers.upcomingMovies,
  );
  const {
    list: upcomingMoviesList,
    fetchedAt: upcomingMoviesFetchedAt,
    heroImages: upcomingHeroImagesState,
    page: upcomingMoviesCurrentPageState,
  } = upcomingMoviesState;
  // GET API VALUES
  const [
    {
      state: {
        movies: popularMovies,
        currentPage: popularMoviesCurrentPage,
        totalPages: popularMoviesTotalPages,
        heroImages: popularHeroImages,
      },
      loading: popularLoading,
      error: popularError,
    },
  ] = usePopularMoviesFetch();
  const [
    {
      state: {
        movies: topRatedMovies,
        currentPage: topRatedMoviesCurrentPage,
        totalPages: topRatedMoviesTotalPages,
        heroImages: topRatedHeroImages,
      },
      loading: topRatedLoading,
      error: topRatedError,
    },
  ] = useTopRatedMoviesFetch();
  const [
    {
      state: {
        movies: nowPlayingMovies,
        currentPage: nowPlayingMoviesCurrentPage,
        totalPages: nowPlayingMoviesTotalPages,
        heroImages: nowPlayingHeroImages,
      },
      loading: nowPlayingLoading,
      error: nowPlayingError,
    },
  ] = useNowPlayingMoviesFetch();
  const [
    {
      state: {
        movies: upcomingMovies,
        currentPage: upcomingMoviesCurrentPage,
        totalPages: upcomingMoviesTotalPages,
        heroImages: upcomingHeroImages,
      },
      loading: upcomingLoading,
      error: upcomingError,
    },
  ] = useUpcomingMoviesFetch();

  // COMPARE REDUX TO API VALUES
  // CONDITIONALLY UPDATE REDUX IF STALE
  // POPULAR MOVIES
  useEffect(() => {
    // Loading
    if (
      popularLoading ||
      topRatedLoading ||
      nowPlayingLoading ||
      upcomingLoading
    ) {
      if (!loadingState) {
        dispatch({ type: SET_LOADING, payload: true });
      }
    } else {
      if (loadingState) {
        dispatch({ type: SET_LOADING, payload: false });
      }
    }
    // Errors
    if (
      popularError ||
      topRatedError ||
      nowPlayingError ||
      upcomingError
    ) {
      dispatch({
        type: SET_ERROR,
        payload: 'Error',
      });
    }
    // popularMovies
    // list
    if (popularMovies && popularMovies?.length > 0) {
      if (
        !popularMoviesList?.length &&
        (!popularMoviesFetchedAt ||
          isStale(popularMoviesFetchedAt))
      ) {
        dispatch({
          type: SET_POPULAR_MOVIE_LIST,
          payload: popularMovies,
        });
      }
    }
    // slides
    if (popularHeroImages) {
      if (
        !popularHeroImagesState?.length &&
        (!popularHeroImagesState?.fetchedAt ||
          isStale(popularHeroImagesState.fetchedAt))
      ) {
        dispatch({
          type: SET_POPULAR_SLIDESHOW_PICTURES,
          payload: popularHeroImages,
        });
      }
    }
    // pagination
    if (
      popularMoviesCurrentPage &&
      popularMoviesTotalPages &&
      (popularMoviesCurrentPage !==
        popularMoviesCurrentPageState ||
        popularMoviesTotalPages !==
          popularMoviesTotalPagesState)
    ) {
      dispatch({
        type: SET_POPULAR_PAGE,
        payload: {
          page: +popularMoviesCurrentPage,
          totalPages: +popularMoviesTotalPages,
        },
      });
    }

    // topRatedMovies
    // list
    if (topRatedMovies && topRatedMovies?.length > 0) {
      if (
        !topRatedMoviesList?.length &&
        (!topRatedMoviesFetchedAt ||
          isStale(topRatedMoviesFetchedAt))
      ) {
        dispatch({
          type: SET_TOP_RATED_MOVIE_LIST,
          payload: topRatedMovies,
        });
      }
    }
    // slides
    if (topRatedHeroImages) {
      if (
        !topRatedHeroImagesState?.length &&
        (!topRatedHeroImagesState?.fetchedAt ||
          isStale(topRatedHeroImagesState.fetchedAt))
      ) {
        dispatch({
          type: SET_TOP_RATED_SLIDESHOW_PICTURES,
          payload: topRatedHeroImages,
        });
      }
    }
    // pagination
    if (
      topRatedMoviesCurrentPage &&
      topRatedMoviesCurrentPage !==
        topRatedMoviesCurrentPageState
    ) {
      dispatch({
        type: SET_TOP_RATED_PAGE,
        payload: {
          page: topRatedMoviesCurrentPage,
          totalPages: topRatedMoviesTotalPages,
        },
      });
    }

    // nowPlayingMovies
    // list
    if (nowPlayingMovies && nowPlayingMovies?.length > 0) {
      if (
        !nowPlayingMoviesList?.length &&
        (!nowPlayingMoviesFetchedAt ||
          isStale(nowPlayingMoviesFetchedAt))
      ) {
        dispatch({
          type: SET_NOW_PLAYING_MOVIE_LIST,
          payload: nowPlayingMovies,
        });
      }
    }
    // slides
    if (nowPlayingHeroImages) {
      if (
        !nowPlayingHeroImagesState?.length &&
        (!nowPlayingHeroImagesState?.fetchedAt ||
          isStale(nowPlayingHeroImagesState.fetchedAt))
      ) {
        dispatch({
          type: SET_NOW_PLAYING_SLIDESHOW_PICTURES,
          payload: nowPlayingHeroImages,
        });
      }
    }
    // pagination
    if (
      nowPlayingMoviesCurrentPage &&
      nowPlayingMoviesCurrentPage !==
        nowPlayingMoviesCurrentPageState
    ) {
      dispatch({
        type: SET_NOW_PLAYING_PAGE,
        payload: {
          page: nowPlayingMoviesCurrentPage,
          totalPages: nowPlayingMoviesTotalPages,
        },
      });
    }

    // upcomingMovies Lists
    // list
    if (upcomingMovies && upcomingMovies?.length > 0) {
      if (
        !upcomingMoviesList?.length &&
        (!upcomingMoviesFetchedAt ||
          isStale(upcomingMoviesFetchedAt))
      ) {
        dispatch({
          type: SET_UPCOMING_MOVIE_LIST,
          payload: upcomingMovies,
        });
      }
    }
    // slides
    if (upcomingHeroImages) {
      if (
        !upcomingHeroImagesState?.length &&
        (!upcomingHeroImagesState?.fetchedAt ||
          isStale(upcomingHeroImagesState.fetchedAt))
      ) {
        dispatch({
          type: SET_UPCOMING_SLIDESHOW_PICTURES,
          payload: upcomingHeroImages,
        });
      }
    }
    // pagination
    if (
      upcomingMoviesCurrentPage &&
      upcomingMoviesCurrentPage !==
        upcomingMoviesCurrentPageState
    ) {
      dispatch({
        type: SET_UPCOMING_PAGE,
        payload: {
          page: upcomingMoviesCurrentPage,
          totalPages: upcomingMoviesTotalPages,
        },
      });
    }
  }, [
    nowPlayingError,
    nowPlayingHeroImages,
    nowPlayingLoading,
    nowPlayingMovies,
    popularError,
    popularHeroImages,
    popularLoading,
    popularMovies,
    topRatedError,
    topRatedHeroImages,
    topRatedLoading,
    topRatedMovies,
    upcomingError,
    upcomingHeroImages,
    upcomingLoading,
    upcomingMovies,
  ]);
};

export default useRefreshMovies;
