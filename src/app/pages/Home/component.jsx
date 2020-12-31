import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { AppWrapper, MainContent, LoadingSpinner } from '../../components';
import { SET_LOADING, SET_PAGE } from '../../actions/types';

const HomePage = ({ hardwareReducers, pageReducers, getMovies }) => {
  const dispatch = useDispatch();
  const { loading } = hardwareReducers;
  const { page } = pageReducers;

  React.useEffect(() => {
    page !== 'home' && dispatch({ type: SET_PAGE, payload: 'home' });
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: SET_LOADING, payload: true });
      await getMovies('popular');
      dispatch({ type: SET_LOADING, payload: false });
      getMovies('now_playing');
      getMovies('upcoming');
      getMovies('top_rated');
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
  hardwareReducers: PropTypes.object.isRequired,
  pageReducers: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
};

export default HomePage;
