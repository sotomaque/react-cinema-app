import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { differenceInMinutes, parseISO } from 'date-fns';

import { AppWrapper, MainContent, LoadingSpinner } from '../../components';
import { SET_LOADING, SET_PAGE } from '../../actions/types';

const HomePage = ({
  getMovies,
  hardwareReducers,
  movieReducers,
  pageReducers,
}) => {
  const dispatch = useDispatch();
  const { loading } = hardwareReducers;
  const {
    popularMovies: popularMoviesState,
    topRatedMovies: topRatedMoviesState,
    nowPlayingMovies: nowPlayingMoviesState,
    upcomingMovies: upcomingMoviesState,
  } = movieReducers;
  const {
    list: popularList,
    heroImages: popularHeroImages,
    fetchedAt: popularFetchedAt,
  } = popularMoviesState;
  const {
    list: topRatedList,
    heroImages: topRatedHeroImages,
    fetchedAt: topRatedFetchedAt,
  } = topRatedMoviesState;
  const {
    list: nowPlayingList,
    heroImages: nowPlayingHeroImages,
    fetchedAt: nowPlayingFetchedAt,
  } = nowPlayingMoviesState;
  const {
    list: upcomingList,
    heroImages: upcomingHeroImages,
    fetchedAt: upcomingFetchedAt,
  } = upcomingMoviesState;
  const { page } = pageReducers;

  React.useEffect(() => {
    page !== 'home' && dispatch({ type: SET_PAGE, payload: 'home' });
  }, []);

  // return true if timestamp passed in
  // is older than 10 min
  const isStale = (timestamp = new Date()) => {
    return differenceInMinutes(new Date(), parseISO(timestamp)) >= 10;
  };
  const SHOULD_UPDATE_POPULAR =
    !popularList?.length ||
    !popularHeroImages?.length ||
    !popularFetchedAt ||
    popularFetchedAt === '' ||
    isStale(popularFetchedAt);
  const SHOULD_UPDATE_TOP_RATED =
    !topRatedList?.length ||
    !topRatedHeroImages.length ||
    !topRatedFetchedAt ||
    topRatedFetchedAt === '' ||
    isStale(topRatedFetchedAt);
  const SHOULD_UPDATE_NOW_PLAYING =
    !nowPlayingList?.length ||
    !nowPlayingHeroImages.length ||
    !nowPlayingFetchedAt ||
    nowPlayingFetchedAt === '' ||
    isStale(nowPlayingFetchedAt);
  const SHOULD_UPDATE_UPCOMING =
    !upcomingList?.length ||
    !upcomingHeroImages.length ||
    !upcomingFetchedAt ||
    upcomingFetchedAt === '' ||
    isStale(upcomingFetchedAt);

  const SHOULD_UPDATE_CACHE =
    SHOULD_UPDATE_POPULAR ||
    SHOULD_UPDATE_TOP_RATED ||
    SHOULD_UPDATE_NOW_PLAYING ||
    SHOULD_UPDATE_UPCOMING;

  React.useEffect(() => {
    const fetchData = async () => {
      if (SHOULD_UPDATE_CACHE) {
        dispatch({ type: SET_LOADING, payload: true });
        await getMovies('popular');
        dispatch({ type: SET_LOADING, payload: false });
        getMovies('now_playing');
        getMovies('upcoming');
        getMovies('top_rated');
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <AppWrapper>
      <MainContent />
    </AppWrapper>
  );
};

HomePage.propTypes = {
  getMovies: PropTypes.func.isRequired,
  hardwareReducers: PropTypes.object.isRequired,
  movieReducers: PropTypes.object.isRequired,
  pageReducers: PropTypes.object.isRequired,
};

export default HomePage;
