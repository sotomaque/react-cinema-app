/* eslint-disable */
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
  const {
    popularMovies = {},
    topRatedMovies = {},
    nowPlayingMovies = {},
  } = movieReducers;
  const [slideShowImages, setSlideShowImages] = React.useState([]);
  const [gridMovies, setGridMovies] = React.useState([]);

  React.useEffect(() => {
    const tempGrid = [];
    if (currentPath.includes('/now_playing')) {
      if (nowPlayingMovies?.list) {
        // Grid Images
        nowPlayingMovies.list.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.poster_path}` };
          tempGrid.push(tempObj);
        });
      }
      if (nowPlayingMovies?.heroImages && nowPlayingMovies.heroImages.length !== 0) {
        // Slideshow Images
        const temp = [];
        nowPlayingMovies?.heroImages?.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.backdrop_path}` };
          temp.push(tempObj);
        });
        setSlideShowImages(temp);
      }
    } else if (currentPath.includes('/top_rated')) {
      if (topRatedMovies?.list) {
        topRatedMovies.list.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.poster_path}` };
          tempGrid.push(tempObj);
        });
      }
      if (topRatedMovies?.heroImages && topRatedMovies.heroImages.length !== 0) {
        // Slideshow Images
        const temp = [];
        topRatedMovies?.heroImages.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.backdrop_path}` };
          temp.push(tempObj);
        });
        setSlideShowImages(temp);
      }
    } else {
      if (popularMovies?.list) {
        popularMovies.list.forEach(movie => {
          const tempObj = { ...movie, url: `${IMAGE_URL}${movie.poster_path}` };
          tempGrid.push(tempObj);
        });
      }
      if (popularMovies?.heroImages && popularMovies.heroImages.length !== 0) {
        // Slideshow Images
        const temp = [];
        popularMovies?.heroImages.forEach(movie => {
          const tempObj = {
            ...movie, url: `${IMAGE_URL}${movie.backdrop_path}`
          };
          temp.push(tempObj);
        });
        setSlideShowImages(temp);
      }
    }
    setGridMovies(tempGrid);
  }, [popularMovies]);

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

  let title = '';
  if (currentPath.includes('now_playing')) {
    title = 'Now Playing';
  } else if (currentPath.includes('top_rated')) {
    title = 'Top Rated';
  } else {
    title = 'Popular';
  }

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
