import { connect } from 'react-redux';

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

const Connected = connect(mapStateToProps)(Main);

export { Connected };
