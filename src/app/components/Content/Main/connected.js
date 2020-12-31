import { connect } from 'react-redux';

import {
  loadMoreMovies,
  setResponsePageNumber,
} from '../../../actions/movies';
import Main from './component';

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
})(Main);

export { Connected };
