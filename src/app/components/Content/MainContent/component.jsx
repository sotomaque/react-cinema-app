import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';

import { QUERY_TYPES, PAGINATION_TYPES } from '../../../const';
import { SET_QUERY } from '../../../actions/types';
import Grid from '../Grid';
import Paginated from '../../Paginated';
import SlideShow from '../SlideShow';

import './styles.scss';

const MainContent = ({ movieReducers, pageReducers, loadMoreMovies, setResponsePageNumber }) => {
  const dispatch = useDispatch();
  const { query = 'popular' } = pageReducers;
  let { page, totalPages } = movieReducers?.popularMovies;
  const [gridMovies, setGridMovies] = React.useState(movieReducers?.popularMovies?.list);
  const [slideShowImages, setSlideShowImages] = React.useState(movieReducers?.popularMovies?.heroImages);
  const [currentPage, setCurrentPage] = React.useState(+page || 1);
  const mainRef = React.useRef();
  const bottomLineRef = React.useRef();

  React.useEffect(() => {
    if (query === QUERY_TYPES.NOW_PLAYING) {
      setGridMovies(movieReducers?.nowPlayingMovies?.list);
      setSlideShowImages(movieReducers?.nowPlayingMovies?.heroImages);
      page = movieReducers?.nowPlayingMovies?.page;
      totalPages = movieReducers?.nowPlayingMovies?.totalPages;
      page !== currentPage && setCurrentPage(page);
    } else if (query === QUERY_TYPES.TOP_RATED) {
      setGridMovies(movieReducers?.topRatedMovies?.list);
      setSlideShowImages(movieReducers?.topRatedMovies?.heroImages);
      page = movieReducers?.topRatedMovies?.page;
      totalPages = movieReducers?.topRatedMovies?.totalPages;
      page !== currentPage && setCurrentPage(page);
    } else if (query === QUERY_TYPES.UPCOMING) {
      setGridMovies(movieReducers?.upcomingMovies?.list);
      setSlideShowImages(movieReducers?.upcomingMovies?.heroImages);
      page = movieReducers?.upcomingMovies?.page;
      totalPages = movieReducers?.upcomingMovies?.totalPages;
      page !== currentPage && setCurrentPage(page);
    } else {
      if (movieReducers?.popularMovies?.list !== gridMovies) {
        setGridMovies(movieReducers?.popularMovies?.list);
        setSlideShowImages(movieReducers?.popularMovies?.heroImages);
        page = movieReducers?.popularMovies?.page;
        totalPages = movieReducers?.popularMovies?.totalPages;
        page !== currentPage && setCurrentPage(page);
      }
    }
  }, [query, gridMovies, slideShowImages, movieReducers]);

  React.useEffect(() => {
    setResponsePageNumber(`${query}`, currentPage, totalPages);
    loadMoreMovies(`${query}`, currentPage);
  }, [currentPage]);

  const paginate = (type) => {
    if (type === PAGINATION_TYPES.PREV) {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        setCurrentPage(10);
      }
    } else {
      if (currentPage < 10) {
        setCurrentPage(prev => prev + 1);
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
        type: QUERY_TYPES.NOW_PLAYING,
      },
      {
        id: 2,
        name: 'Popular',
        type: QUERY_TYPES.POPULAR,
      },
      {
        id: 3,
        name: 'Top Rated',
        type: QUERY_TYPES.TOP_RATED,
      },
      {
        id: 4,
        name: 'Upcoming',
        type: QUERY_TYPES.UPCOMING,
      }
    ];

    const handleListItemClicked = ({ isActive, type }) => {
      !isActive && dispatch({ type: SET_QUERY, payload: `${type}` });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {
          QueryTypes.map(item => {
            const isActive = item?.type === query;
            return (
              <Typography
                  key={item.id}
                  component={isActive ? 'h2' : ''}
                  variant={isActive ? 'body1' : 'body2'}
                  color="secondary"
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

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      // fetch data
      fetchData();
    };
  };

  const fetchData = () => {
    if (page < totalPages) {
      //  update current page
      setCurrentPage(prev => prev + 1);
    };
  };

  return (
    <div
      className="main-content"
      ref={mainRef}
      onScroll={() => handleScroll()}
    >
      {/* Slideshow Components */}
      {slideShowImages?.length > 0 && (
        <SlideShow
          images={slideShowImages}
          auto={false}
          arrows
        />
      )}
      <div className="grid-movie-title">
        <Queries className="grid-movie-title movieType" />
        <Paginated
          currentPage={currentPage}
          paginate={paginate}
          totalPages={10}
          className="grid-movie-title movieType"
        />
      </div>
      {/* Grid Components */}
      {
        gridMovies && gridMovies?.length && gridMovies?.length !== 0 && (
          <Grid gridMovies={gridMovies} />
        )
      }
      <div ref={bottomLineRef} />
    </div>
  );
};

MainContent.propTypes = {
  movieReducers: PropTypes.object.isRequired,
  pageReducers: PropTypes.object.isRequired,
  loadMoreMovies: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired,
};

export default MainContent;
