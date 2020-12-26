import { connect } from 'react-redux';

import HomePage from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(HomePage);

export { Connected };
