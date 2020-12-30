import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

import SlideShow from '../SlideShow';
import Paginated from '../../Paginated';
import Grid from '../Grid';
import { SET_QUERY } from '../../../actions/types';
import { API_URL, API_KEY } from '../../../const';
import './styles.scss';

const MainContent = ({ movieReducers, pageReducers }) => {
  const { query = 'popular' } = pageReducers;
  const dispatch = useDispatch();
  const [gridMovies, setGridMovies] = React.useState(movieReducers?.popularMovies?.list);
  const [slideShowImages, setSlideShowImages] = React.useState(movieReducers?.popularMovies?.heroImages);
  const [currentPage, setCurrentPage] = React.useState(1);

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

  const paginate = (type) => {
    if (type === 'prev') {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        // make api call
        const endpoint = `${API_URL}movie/${query}?api_key=${API_KEY}&page=${
          currentPage - 1
        }`;
        console.log('endpoint', endpoint);
        // fetchPopularMovies(endpoint);
      } else {
        setCurrentPage(10);
      }
    } else {
      if (currentPage < 10) {
        setCurrentPage(prev => prev + 1);
        // make api call
        // const endpoint = `${API_URL}movie/${query}?api_key=${API_KEY}&page=${
        //   currentPage + 1
        // }`;
        // fetchPopularMovies(endpoint);
      } else {
        setCurrentPage(1);
      }
    }
  };

  const Queries = () => {
    const QueryTypes = [
      {
        id: 1,
        name: 'Now Playing',
        type: 'now_playing'
      },
      {
        id: 2,
        name: 'Popular',
        type: 'popular'
      },
      {
        id: 3,
        name: 'Top Rated',
        type: 'top_rated',
      },
      {
        id: 4,
        name: 'Upcoming',
        type: 'upcoming',
      }
    ];

    const handleListItemClicked = ({ isActive, type }) => {
      !isActive && dispatch({ type: SET_QUERY, payload: `${type}` });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          QueryTypes.map(item => {
            const isActive = item?.type === query;
            return (
              <Typography
                  key={item.id}
                  component={isActive ? 'h1' : ''}
                  variant={isActive ? 'h5' : 'body1'}
                  color={'secondary'}
                  noWrap
                  style={{ alignSelf: 'center', padding: 10, opacity: isActive ? 1 : 0.5, cursor: isActive ? '' : 'pointer' }}
                  onClick={() => handleListItemClicked({ isActive, type: item?.type })}
                >
                  {item.name}
              </Typography>
            );
          })
        }
      </div>
    );
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
        {/* Query */}
        <div className="movieType">
         <Queries />
        </div>
        <div className="paginate">
          <Paginated
            currentPage={currentPage}
            paginate={paginate}
            totalPages={10}
          />
        </div>
      </div>
      {/* Grid Components */}
      {
        gridMovies && gridMovies?.length && gridMovies?.length !== 0 && (
          <Grid gridMovies={gridMovies} />
        )
      }
    </div>
  );
};

MainContent.propTypes = {
  movieReducers: PropTypes.object.isRequired,
  pageReducers: PropTypes.object.isRequired,
};

export default MainContent;
