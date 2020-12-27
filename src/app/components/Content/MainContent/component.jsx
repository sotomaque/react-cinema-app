import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { IMAGE_URL } from '../../../const';
import SlideShow from '../SlideShow';
import Paginated from '../../Paginated';
import Grid from '../Grid';

import './styles.scss';

const MainContent = ({ movieReducers }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { heroImages = '', popular = [], now_playing = [] } = movieReducers;
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
    if (popular) {
      const tempGrid = [];
      if (currentPath.includes('now_playing')) {
        now_playing.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.poster_path}` };
          tempGrid.push(tempObj);
        });
      } else {
        popular.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.poster_path}` };
          tempGrid.push(tempObj);
        });
      }
      setGridMovies(tempGrid);
    }
  }, [heroImages, popular]);

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

  const title =
    currentPath.includes('now_playing')
      ? 'Now Playing'
      : 'Popular';

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
};

export default MainContent;
