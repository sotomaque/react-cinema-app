import { connect } from 'react-redux';

import LoginPage from './component';

const mapStateToProps = ({
  pageReducers,
  hardwareReducers,
}) => {
  return {
    pageReducers,
    hardwareReducers,
  };
};

const Connected = connect(mapStateToProps)(LoginPage);

export { Connected };
