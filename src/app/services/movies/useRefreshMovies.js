/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SET_ERROR,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES,
  SET_POPULAR_MOVIE_LIST,
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_TOP_RATED_MOVIE_LIST,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
} from '../../actions/types';
import {
  usePopularMoviesFetch,
  useTopRatedMoviesFetch,
  useNowPlayingMoviesFetch,
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
  // GET REDUX STATE VALUES
  // POPULAR MOVIES
  const popularMoviesState = useSelector(
    (state) => state.movieReducers.popularMovies,
  );
  const {
    list: popularMoviesList,
    fetchedAt: popularMoviesFetchedAt,
    heroImages: popularHeroImagesState,
  } = popularMoviesState;
  // TOP RATED MOVIES
  const topRatedMoviesState = useSelector(
    (state) => state.movieReducers.topRatedMovies,
  );
  const {
    list: topRatedMoviesList,
    fetchedAt: topRatedMoviesFetchedAt,
    heroImages: topRatedHeroImagesState,
  } = topRatedMoviesState;
  // NOW PLAYING MOVIES
  const nowPlayingMoviesState = useSelector(
    (state) => state.movieReducers.nowPlayingMovies,
  );
  const {
    list: nowPlayingMoviesList,
    fetchedAt: nowPlayingMoviesFetchedAt,
    heroImages: nowPlayingHeroImagesState,
  } = nowPlayingMoviesState;
  // GET API VALUES
  const [
    {
      state: {
        movies: popularMovies,
        currentPage,
        totalPages,
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
        heroImages: nowPlayingHeroImages,
      },
      loading: nowPlayingLoading,
      error: nowPlayingError,
    },
  ] = useNowPlayingMoviesFetch();
  // COMPARE REDUX TO API VALUES
  // CONDITIONALLY UPDATE REDUX IF STALE
  // POPULAR MOVIES
  useEffect(() => {
    // Loading
    if (popularLoading) {
      // TODO: SET SPINNER STATE
      console.log('popularLoading', popularLoading);
    }
    // Errors
    if (popularError) {
      dispatch({
        type: SET_ERROR,
        payload: 'Error Fetching Popular Movies',
      });
    }
    // Movie Lists
    if (popularMovies) {
      if (popularMoviesList?.length) {
        console.log('already have popular movies in state');
      } else if (popularMoviesFetchedAt) {
        console.log(
          'already have fetched at for popular movies',
        );
      } else {
        dispatch({
          type: SET_POPULAR_MOVIE_LIST,
          payload: popularMovies,
        });
      }
    }
    // Slideshows
    if (popularHeroImages) {
      if (popularHeroImagesState?.length) {
        console.log(
          'already have popularHeroImages in state',
        );
      } else if (popularHeroImagesState?.fetchedAt) {
        console.log(
          'already have fetched at for popularHeroImages movies',
        );
      } else {
        dispatch({
          type: SET_POPULAR_SLIDESHOW_PICTURES,
          payload: popularHeroImages,
        });
      }
    }
  }, [
    popularMovies,
    popularHeroImages,
    popularLoading,
    popularError,
  ]);
  // TOP RATED MOVIES
  useEffect(() => {
    // Loading
    if (topRatedLoading) {
      console.log('topRatedLoading', topRatedLoading);
    }
    // Errors
    if (topRatedError) {
      dispatch({
        type: SET_ERROR,
        payload: 'Error Fetching Popular Movies',
      });
    }
    // Movie Lists
    if (topRatedMovies) {
      if (topRatedMoviesList?.length) {
        console.log(
          'already have top rated movies in state',
        );
      } else if (topRatedMoviesFetchedAt) {
        console.log(
          'already have fetched at for top rated movies',
        );
      } else {
        dispatch({
          type: SET_TOP_RATED_MOVIE_LIST,
          payload: topRatedMovies,
        });
      }
    }
    // Pagination
    // Slideshows
    if (topRatedHeroImages) {
      if (topRatedHeroImagesState?.length) {
        console.log(
          'already have topRatedHeroImages in state',
        );
      } else if (topRatedHeroImagesState?.fetchedAt) {
        console.log(
          'already have fetched at for topRatedHeroImages movies',
        );
      } else {
        dispatch({
          type: SET_TOP_RATED_SLIDESHOW_PICTURES,
          payload: topRatedHeroImages,
        });
      }
    }
  }, [
    topRatedMovies,
    topRatedHeroImages,
    topRatedLoading,
    topRatedError,
  ]);
  // NOW PLAYING MOVIES
  useEffect(() => {
    // Loading
    if (nowPlayingLoading) {
      console.log('nowPlayingLoading', nowPlayingLoading);
    }
    // Errors
    if (nowPlayingError) {
      dispatch({
        type: SET_ERROR,
        payload: 'Error Fetching Now Playing Movies',
      });
    }
    // Movie Lists
    if (nowPlayingMovies) {
      if (nowPlayingMoviesList?.length) {
        console.log(
          'already have now playing movies in state',
        );
      } else if (nowPlayingMoviesFetchedAt) {
        console.log(
          'already have fetched at for now playing movies',
        );
      } else {
        dispatch({
          type: SET_NOW_PLAYING_MOVIE_LIST,
          payload: nowPlayingMovies,
        });
      }
    }
    // Pagination
    // Slideshows
    if (nowPlayingHeroImages) {
      if (nowPlayingHeroImagesState?.length) {
        console.log(
          'already have nowPlayingHeroImages in state',
        );
      } else if (nowPlayingHeroImagesState?.fetchedAt) {
        console.log(
          'already have fetched at for nowPlayingHeroImages movies',
        );
      } else {
        dispatch({
          type: SET_NOW_PLAYING_SLIDESHOW_PICTURES,
          payload: nowPlayingHeroImages,
        });
      }
    }
  }, [
    nowPlayingMovies,
    nowPlayingHeroImages,
    nowPlayingLoading,
    nowPlayingError,
  ]);
};

export default useRefreshMovies;
