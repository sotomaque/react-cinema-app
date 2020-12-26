import { connect } from 'react-redux';

import Grid from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(Grid);

export { Connected };
