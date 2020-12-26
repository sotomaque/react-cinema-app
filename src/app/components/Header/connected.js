import { connect } from 'react-redux';

import Header from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(Header);

export { Connected };
