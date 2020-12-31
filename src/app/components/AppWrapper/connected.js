import { connect } from 'react-redux';

import AppWrapper from './component';

const mapStateToProps = ({ hardwareReducers }) => {
  return {
    hardwareReducers,
  };
};

const Connected = connect(mapStateToProps)(AppWrapper);

export { Connected };
