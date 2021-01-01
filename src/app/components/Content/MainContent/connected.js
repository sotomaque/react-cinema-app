import { connect } from 'react-redux';

import {
  loadMoreMovies,
  setResponsePageNumber,
} from 'app/actions/movies';
import MainContent from './component';

const mapStateToProps = ({
  languageReducers,
  movieReducers,
  pageReducers,
}) => {
  return {
    languageReducers,
    movieReducers,
    pageReducers,
  };
};

const Connected = connect(mapStateToProps, {
  loadMoreMovies,
  setResponsePageNumber,
})(MainContent);

export { Connected };
