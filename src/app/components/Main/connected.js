import { connect } from 'react-redux';

import Main from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(Main);

export { Connected };
