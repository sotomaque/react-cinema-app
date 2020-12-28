import { connect } from 'react-redux';

import MainContent from './component';

const mapStateToProps = ({
  errors,
  movieReducers,
  pageReducers,
}) => {
  return {
    errors,
    movieReducers,
    pageReducers,
  };
};

const Connected = connect(mapStateToProps)(MainContent);

export { Connected };
