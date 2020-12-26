import { connect } from 'react-redux';

import HomePage from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(HomePage);

export { Connected };
