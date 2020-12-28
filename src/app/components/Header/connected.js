import { connect } from 'react-redux';

import Header from './component';

const mapStateToProps = ({ pageReducers }) => {
  return {
    pageReducers,
  };
};

const Connected = connect(mapStateToProps)(Header);

export { Connected };
