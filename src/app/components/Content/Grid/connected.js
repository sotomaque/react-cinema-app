import { connect } from 'react-redux';

import Grid from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(Grid);

export { Connected };
