import { SET_LANGUAGE } from 'app/actions/types';

import I18n from 'app/locales';

/**
 * SET LANGUAGE ACTION
 *
 * - used to update I18n language
 * - used to update language reducer state
 *
 * @param {string} type - 'en' || 'es' || 'fr' || 'de'
 * @param {*} pageNumber
 */
export const setLanguage = (language) => async (
  dispatch,
) => {
  I18n.setLanguage(`${language}`);
  dispatch({
    type: SET_LANGUAGE,
    payload: language,
  });
};
