import { connect } from 'react-redux';

import { getMovies } from '../../actions/movies';
import RegisterPage from './component';

const mapStateToProps = ({
  hardwareReducers,
  movieReducers,
  pageReducers,
}) => {
  return {
    hardwareReducers,
    movieReducers,
    pageReducers,
  };
};

const Connected = connect(mapStateToProps, { getMovies })(
  RegisterPage,
);

export { Connected };
