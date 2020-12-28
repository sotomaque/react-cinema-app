/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { IMAGE_URL } from '../../../const';
import SlideShow from '../SlideShow';
import Paginated from '../../Paginated';
import Grid from '../Grid';

import './styles.scss';

const MainContent = ({ movieReducers, pageReducers }) => {
  const { query = 'popular' } = pageReducers;
  let title = '';

  const [gridMovies, setGridMovies] = React.useState(movieReducers?.popularMovies?.list)
  const [slideShowImages, setSlideShowImages] = React.useState(movieReducers?.popularMovies?.heroImages)

  React.useEffect(() => {
    title = query;
    console.log('query', query);
    if (query === 'now_playing') {
      setGridMovies(movieReducers?.nowPlayingMovies?.list);
      setSlideShowImages(movieReducers?.nowPlayingMovies?.heroImages);
    } else if (query === 'top_rated') {
      setGridMovies(movieReducers?.topRatedMovies?.list);
      setSlideShowImages(movieReducers?.topRatedMovies?.heroImages);
    } else if (query === 'upcoming') {
      setGridMovies(movieReducers?.upcomingMovies?.list);
      setSlideShowImages(movieReducers?.upcomingMovies?.heroImages);
    } else {
      if (movieReducers?.popularMovies?.list !== gridMovies) {
        setGridMovies(movieReducers?.popularMovies?.list);
        setSlideShowImages(movieReducers?.popularMovies?.heroImages);
      }
    }

  }, [query, gridMovies, slideShowImages]);

  const [currentPage, setCurrentPage] = React.useState(1);

  const paginate = (type) => {
    if (type === 'prev') {
      currentPage > 1
        ? setCurrentPage(prev => prev - 1)
        : setCurrentPage(10);
    } else {
      currentPage < 10
        ? setCurrentPage(prev => prev + 1)
        : setCurrentPage(1);
    }
  };

  return (
    <div className="main-content">
      {/* Slideshow Components */}
      {slideShowImages.length > 0 && (
        <SlideShow
          images={slideShowImages}
          auto={false}
          arrows
        />
      )}
      <div className="grid-movie-title">
        <div className="movieType">{title}</div>
        <div className="paginate">
          <Paginated
            currentPage={currentPage}
            paginate={paginate}
            totalPages={10}
          />
        </div>
      </div>
      {/* Grid Components */}
      <Grid gridMovies={gridMovies} />
    </div>
  );
};

MainContent.propTypes = {
  movieReducers: PropTypes.object.isRequired,
  pageReducers: PropTypes.object.isRequired,
};

export default MainContent;
