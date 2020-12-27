import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Main from '../../components/Main';

const TopRatedPage = ({ movieReducers }) => {
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
