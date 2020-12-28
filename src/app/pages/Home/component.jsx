/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Main from '../../components/Main';
import {
  usePopularMoviesFetch,
  useTopRatedMoviesFetch,
  useNowPlayingMoviesFetch,
} from '../../hooks';
import {
  SET_ERROR,
  SET_POPULAR_MOVIE_LIST,
  SET_POPULAR_SLIDESHOW_PICTURES,
  SET_TOP_RATED_MOVIE_LIST,
  SET_TOP_RATED_SLIDESHOW_PICTURES,
  SET_NOW_PLAYING_MOVIE_LIST,
  SET_NOW_PLAYING_SLIDESHOW_PICTURES
} from '../../actions/types';

const HomePage = ({ movieReducers }) => {
  const {
    popularMovies: popularMoviesState,
    topRatedMovies: topRatedMoviesState,
    nowPlayingMoviews: nowPlayingMoviesState,
    popularSlideShow,
  } = movieReducers;

  const dispatch = useDispatch();
  const [{ state: { movies: popularMovies, currentPage, totalPages, heroImages: popularHeroImages }, loading: popularLoading, error: popularError }] = usePopularMoviesFetch();
  const [{ state: { movies: topRatedMovies, heroImages: topRatedHeroImages }, loading: topRatedLoading, error: topRatedError }] = useTopRatedMoviesFetch();
  const [{ state: { movies: nowPlayingMovies, heroImages: nowPlayingHeroImages }, loading: nowPlayingLoading, error: nowPlayingError }] = useNowPlayingMoviesFetch();
  // Popular
  React.useEffect(() => {
    // Loading
    if (popularLoading) {
      console.log("popularLoading", popularLoading)
    }
    // Errors
    if (popularError) {
      dispatch({ type: SET_ERROR, payload: 'Error Fetching Popular Movies' });
    }
    // Movie Listss
    if (popularMovies && popularMovies !== popularMoviesState) {
      dispatch({ type: SET_POPULAR_MOVIE_LIST, payload: popularMovies });
    }

    // Slideshows
    if (popularHeroImages && popularHeroImages !== popularSlideShow) {
      dispatch({
        type: SET_POPULAR_SLIDESHOW_PICTURES,
        payload: popularHeroImages
      });
    }

  }, [
    popularMovies,
    popularHeroImages,
    popularLoading,
    popularError
  ]);
  // Top Rated
  React.useEffect(() => {
    // Loading
    if (topRatedLoading) {
      console.log("topRatedLoading", topRatedLoading)
    }
    // Errors
    if (topRatedError) {
      dispatch({ type: SET_ERROR, payload: 'Error Fetching Popular Movies' });
    }
    // Movie Listss
    if (topRatedMovies && topRatedMovies !== topRatedMoviesState) {
      dispatch({ type: SET_TOP_RATED_MOVIE_LIST, payload: topRatedMovies });
    }
    // Pagination

    // Slideshows
    if (topRatedHeroImages) {
      dispatch({
        type: SET_TOP_RATED_SLIDESHOW_PICTURES,
        payload: topRatedHeroImages
      });
    }

  }, [
    topRatedMovies,
    topRatedHeroImages,
    topRatedLoading,
    topRatedError
  ]);

  // Now Playing
  React.useEffect(() => {
    // Loading
    if (nowPlayingLoading) {
      console.log("nowPlayingLoading", nowPlayingLoading)
    }
    // Errors
    if (nowPlayingError) {
      dispatch({ type: SET_ERROR, payload: 'Error Fetching Now Playing Movies' });
    }
    // Movie Listss
    if (nowPlayingMovies && nowPlayingMovies !== nowPlayingMoviesState) {
      dispatch({ type: SET_NOW_PLAYING_MOVIE_LIST, payload: nowPlayingMovies });
    }
    // Pagination

    // Slideshows
    if (nowPlayingHeroImages) {
      dispatch({
        type: SET_NOW_PLAYING_SLIDESHOW_PICTURES,
        payload: nowPlayingHeroImages
      });
    }

  }, [
    nowPlayingMovies,
    nowPlayingHeroImages,
    nowPlayingLoading,
    nowPlayingError
  ]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

HomePage.propTypes = {
  movieReducers: PropTypes.object.isRequired,
};

export default HomePage;
