import { connect } from 'react-redux';

import Header from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(Header);

export { Connected };
