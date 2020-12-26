import { connect } from 'react-redux';

import SlideShow from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(SlideShow);

export { Connected };
