import { connect } from 'react-redux';

import { setLanguage } from 'app/actions/languages';
import SetLanguageDialog from './component';

const mapStateToProps = ({ languageReducers }) => {
  return {
    languageReducers,
  };
};

const Connected = connect(mapStateToProps, {
  setLanguage,
})(SetLanguageDialog);

export { Connected };
