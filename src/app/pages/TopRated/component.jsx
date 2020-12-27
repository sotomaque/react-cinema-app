import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Main from '../../components/Main';
import { useTopRatedMoviesFetch } from '../../hooks';
import { SET_ERROR, SET_TOP_RATED_MOVIE_LIST, SET_SLIDESHOW_PICTURES } from '../../actions/types';

const TopRatedPage = ({ movieReducers }) => {
  const dispatch = useDispatch();

  const [{ state: { movies, heroImages }, loading, error }] = useTopRatedMoviesFetch();
  React.useEffect(() => {
    if (movies) {
      dispatch({ type: SET_TOP_RATED_MOVIE_LIST, payload: movies });
    }
    if (error) {
      dispatch({ type: SET_ERROR, payload: 'Error Fetching Popular Movies' });
    }
    if (heroImages) {
      dispatch({
        type: SET_SLIDESHOW_PICTURES,
        payload: heroImages
      });
    }
    if (loading) console.log('loading', loading);
    if (error) console.log('error', error);
  }, [movies, loading, error]);
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

TopRatedPage.propTypes = {
  movieReducers: PropTypes.object.isRequired,
};

export default TopRatedPage;
