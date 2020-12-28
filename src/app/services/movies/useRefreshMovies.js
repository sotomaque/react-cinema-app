/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SET_ERROR,
  SET_POPULAR_MOVIE_LIST,
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_TOP_RATED_MOVIE_LIST,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES,
} from '../../actions/types';
import {
  usePopularMoviesFetch,
  useTopRatedMoviesFetch,
  useNowPlayingMoviesFetch,
} from '../../hooks';

const useRefreshMovies = () => {
  const dispatch = useDispatch();
  const popularMoviesState = useSelector(
    (state) => state.movieReducers.popularMovies,
  );
  const {
    list: popularMoviesList,
    fetchedAt: popularMoviesFetchedAt,
  } = popularMoviesState;

  const topRatedMoviesState = useSelector(
    (state) => state.movieReducers.topRatedMovies,
  );
  const {
    list: topRatedMoviesList,
    fetchedAt: topRatedMoviesFetchedAt,
  } = topRatedMoviesState;

  const nowPlayingMoviesState = useSelector(
    (state) => state.movieReducers.nowPlayingMovies,
  );
  const {
    list: nowPlayingMoviesList,
    fetchedAt: nowPlayingMoviesFetchedAt,
  } = nowPlayingMoviesState;

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

  // Popular
  useEffect(() => {
    // Loading
    if (popularLoading) {
      console.log('popularLoading', popularLoading);
    }
    // Errors
    if (popularError) {
      dispatch({
        type: SET_ERROR,
        payload: 'Error Fetching Popular Movies',
      });
    }
    // Movie Listss
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
      dispatch({
        type: SET_POPULAR_SLIDESHOW_PICTURES,
        payload: popularHeroImages,
      });
    }
  }, [
    popularMovies,
    popularHeroImages,
    popularLoading,
    popularError,
  ]);
  // Top Rated
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
    // Movie Listss
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
      dispatch({
        type: SET_TOP_RATED_SLIDESHOW_PICTURES,
        payload: topRatedHeroImages,
      });
    }
  }, [
    topRatedMovies,
    topRatedHeroImages,
    topRatedLoading,
    topRatedError,
  ]);
  // Now Playing
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
    // Movie Listss
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
      dispatch({
        type: SET_NOW_PLAYING_SLIDESHOW_PICTURES,
        payload: nowPlayingHeroImages,
      });
    }
  }, [
    nowPlayingMovies,
    nowPlayingHeroImages,
    nowPlayingLoading,
    nowPlayingError,
  ]);
};

export default useRefreshMovies;
