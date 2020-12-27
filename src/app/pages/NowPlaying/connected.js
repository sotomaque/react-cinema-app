import { connect } from 'react-redux';

import NowPlayingPage from './component';

const mapStateToProps = ({ errors, movieReducers }) => {
  return {
    errors,
    movieReducers,
  };
};

const Connected = connect(mapStateToProps)(NowPlayingPage);

export { Connected };
