import { connect } from 'react-redux';

import Paginated from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(Paginated);

export { Connected };
