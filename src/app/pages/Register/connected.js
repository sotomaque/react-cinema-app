import { connect } from 'react-redux';

import HomePage from './component';

const mapStateToProps = ({ pageReducers }) => {
  return {
    pageReducers,
  };
};

const Connected = connect(mapStateToProps)(HomePage);

export { Connected };
