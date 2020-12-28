import React from 'react';

import Header from '../../components/Header';
import Main from '../../components/Main';
import { useRefreshMovies } from '../../services/movies';

const HomePage = () => {
  useRefreshMovies();

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default HomePage;
