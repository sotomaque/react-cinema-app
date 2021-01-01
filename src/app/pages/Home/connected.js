import { connect } from 'react-redux';

import { getMovies } from 'app/actions/movies';
import { setLanguage } from 'app/actions/languages';
import RegisterPage from './component';

const mapStateToProps = ({
  hardwareReducers,
  languageReducers,
  movieReducers,
  pageReducers,
}) => {
  return {
    hardwareReducers,
    languageReducers,
    movieReducers,
    pageReducers,
  };
};

const Connected = connect(mapStateToProps, {
  getMovies,
  setLanguage,
})(RegisterPage);

export { Connected };
