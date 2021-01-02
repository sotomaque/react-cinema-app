import { connect } from 'react-redux';

// ACTIONS
import { setLanguage } from 'app/actions/languages';
// COMPONENT
import ProfilePage from './component';

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
  setLanguage,
})(ProfilePage);

export { Connected };
