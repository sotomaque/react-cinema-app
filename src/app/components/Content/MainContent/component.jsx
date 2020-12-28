/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import SlideShow from '../SlideShow';
import Paginated from '../../Paginated';
import Grid from '../Grid';

import './styles.scss';
import { usePopularMoviesFetch } from '../../../hooks/usePopularMoviesFetch';
import { API_URL, API_KEY } from '../../../const';
import { UPDATE_POPULAR_LIST } from '../../../actions/types';
import { useDispatch } from 'react-redux';

const MainContent = ({ movieReducers, pageReducers }) => {
  const dispatch = useDispatch();
  const { query = 'popular' } = pageReducers;
  const [gridMovies, setGridMovies] = React.useState(movieReducers?.popularMovies?.list);
  const [slideShowImages, setSlideShowImages] = React.useState(movieReducers?.popularMovies?.heroImages);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [{ state, loading, error }, fetchPopularMovies] = usePopularMoviesFetch();

  React.useEffect(() => {
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
  }, [query, gridMovies, slideShowImages, currentPage]);

  React.useEffect(() => {
    dispatch({ type: UPDATE_POPULAR_LIST, payload: state?.movies });
    console.log('state', state);
  }, [state]);

  const paginate = (type) => {
    if (type === 'prev') {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        // make api call
        const endpoint = `${API_URL}movie/${query}?api_key=${API_KEY}&page=${
          currentPage - 1
        }`;
        console.log('endpoint', endpoint);
        fetchPopularMovies(endpoint);
      } else {
        setCurrentPage(10);
      }
    } else {
      if (currentPage < 10) {
        setCurrentPage(prev => prev + 1);
        // make api call
        const endpoint = `${API_URL}movie/${query}?api_key=${API_KEY}&page=${
          currentPage + 1
        }`;
        fetchPopularMovies(endpoint);
      } else {
        setCurrentPage(1);
      }
    }
  };
  // Capital first letter
  // lowercase everything else
  const formatTitle = (string) => {
    // replace '_' with ' ';
    const stringArray = string?.replace('_', ' ');
    return stringArray?.charAt(0)?.toUpperCase() + stringArray?.slice(1);
  };

  return (
    <div className="main-content">
      {/* Slideshow Components */}
      {slideShowImages?.length > 0 && (
        <SlideShow
          images={slideShowImages}
          auto={false}
          arrows
        />
      )}
      <div className="grid-movie-title">
        <div className="movieType">{formatTitle(query)}</div>
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
