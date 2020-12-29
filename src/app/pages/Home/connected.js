import { connect } from 'react-redux';

import { getMovies } from '../../actions/movies';
import RegisterPage from './component';

const mapStateToProps = ({
  pageReducers,
  hardwareReducers,
}) => {
  return {
    pageReducers,
    hardwareReducers,
  };
};

const Connected = connect(mapStateToProps, { getMovies })(
  RegisterPage,
);

export { Connected };
