import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { useRefreshMovies } from '../../services/movies';

const HomePage = ({ hardwareReducers }) => {
  const { loading } = hardwareReducers;
  useRefreshMovies();

  if (loading) return (<div>Loading..</div>);
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

HomePage.propTypes = {
  hardwareReducers: PropTypes.object.isRequired,
};

export default HomePage;
