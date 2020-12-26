import { connect } from 'react-redux';

import MainContent from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(MainContent);

export { Connected };
