import { connect } from 'react-redux';

import Paginated from './component';

const mapStateToProps = ({ errors, movies }) => {
  return {
    errors,
    movies,
  };
};

const Connected = connect(mapStateToProps)(Paginated);

export { Connected };
