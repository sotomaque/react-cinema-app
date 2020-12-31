import { connect } from 'react-redux';

import LazyImage from './component';

const mapStateToProps = ({
  movieReducers,
  pageReducers,
}) => {
  return {
    movieReducers,
    pageReducers,
  };
};

const Connected = connect(mapStateToProps)(LazyImage);

export { Connected };
