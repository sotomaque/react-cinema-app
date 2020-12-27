import { connect } from 'react-redux';

import TopRatedPage from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(TopRatedPage);

export { Connected };
