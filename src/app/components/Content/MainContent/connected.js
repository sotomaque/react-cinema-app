import { connect } from 'react-redux';

import {
  loadMoreMovies,
  setResponsePageNumber,
} from '../../../actions/movies';
import MainContent from './component';

const mapStateToProps = ({
  movieReducers,
  pageReducers,
}) => {
  return {
    movieReducers,
    pageReducers,
  };
};

const Connected = connect(mapStateToProps, {
  loadMoreMovies,
  setResponsePageNumber,
})(MainContent);

export { Connected };
