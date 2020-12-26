import { connect } from 'react-redux';

import SlideShow from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(SlideShow);

export { Connected };
