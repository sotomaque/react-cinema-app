import { connect } from 'react-redux';

import MainContent from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(MainContent);

export { Connected };
