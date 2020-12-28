import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Main from '../../components/Main';
import { useRefreshMovies } from '../../services/movies';
import { SET_QUERY } from '../../actions/types';

const HomePage = ({ pageReducers }) => {
  const dispatch = useDispatch();
  const { query = 'popular' } = pageReducers;
  React.useEffect(() => {
    dispatch({ type: SET_QUERY, payload: `${query}` });
  }, [query]);

  useRefreshMovies();

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

HomePage.propTypes = {
  pageReducers: PropTypes.object.isRequired,
};

export default HomePage;
