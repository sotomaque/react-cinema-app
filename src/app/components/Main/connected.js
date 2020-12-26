import { connect } from 'react-redux';

import Main from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(Main);

export { Connected };
