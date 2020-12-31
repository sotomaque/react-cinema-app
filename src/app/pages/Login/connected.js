import { connect } from 'react-redux';

import LoginPage from './component';

const mapStateToProps = ({ pageReducers }) => {
  return {
    pageReducers,
  };
};

const Connected = connect(mapStateToProps)(LoginPage);

export { Connected };
