import { connect } from 'react-redux';

import HomePage from './component';

const mapStateToProps = ({
  pageReducers,
  hardwareReducers,
}) => {
  return {
    pageReducers,
    hardwareReducers,
  };
};

const Connected = connect(mapStateToProps)(HomePage);

export { Connected };
