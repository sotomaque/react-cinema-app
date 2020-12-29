import { connect } from 'react-redux';

import RegisterPage from './component';

const mapStateToProps = ({
  pageReducers,
  hardwareReducers,
}) => {
  return {
    pageReducers,
    hardwareReducers,
  };
};

const Connected = connect(mapStateToProps)(RegisterPage);

export { Connected };
