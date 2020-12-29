import { connect } from 'react-redux';

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

const Connected = connect(mapStateToProps)(MainContent);

export { Connected };
