import React from 'react';
import PropTypes from 'prop-types';

import { IMAGE_URL } from '../../../const';
import SlideShow from '../SlideShow';
import Paginated from '../../Paginated';
import Grid from '../Grid';

import './styles.scss';

const MainContent = ({ movieReducers = {} }) => {
  const { heroImages = '', list = [] } = movieReducers;
  const [slideShowImages, setSlideShowImages] = React.useState([]);
  const [gridMovies, setGridMovies] = React.useState([]);
  React.useEffect(() => {
    if (heroImages) {
      const temp = [];
      heroImages.forEach(movie => {
        const tempObj = { ...movie, url: `${IMAGE_URL}${movie.backdrop_path}` };
        temp.push(tempObj);
      });
      setSlideShowImages(temp);
    }
    if (list) {
      const tempGrid = [];
      list.forEach(movie => {
        const tempObj = { ...movie, url: `${IMAGE_URL}${movie.poster_path}` };
        tempGrid.push(tempObj);
      });
      setGridMovies(tempGrid);
    }
  }, [heroImages, list]);

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
        <div className="movieType">Now Playing</div>
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
  movieReducers: PropTypes.object,
};

export default MainContent;
