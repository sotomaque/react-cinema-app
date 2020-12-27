import React from 'react';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Main from '../../components/Main';
import { useNowPlayingMoviesFetch } from '../../hooks';
import { SET_ERROR, SET_NOW_PLAYING_MOVIE_LIST, SET_SLIDESHOW_PICTURES } from '../../actions/types';

const NowPlayingPage = () => {
  const dispatch = useDispatch();

  const [{ state: { movies, heroImages }, loading, error }] = useNowPlayingMoviesFetch();
  React.useEffect(() => {
    if (movies) {
      dispatch({ type: SET_NOW_PLAYING_MOVIE_LIST, payload: movies });
    }
    if (error) {
      dispatch({ type: SET_ERROR, payload: 'Error Fetching Popular Movies' });
    }
    if (heroImages) {
      dispatch({
        type: SET_SLIDESHOW_PICTURES,
        payload: heroImages
      });
    }
    if (loading) console.log('loading', loading);
    if (error) console.log('error', error);
  }, [movies, loading, error]);
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default NowPlayingPage;
