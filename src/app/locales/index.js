import Translator from './translator';
import en from './en';
import es from './es';

const AppLocales = {
  en,
  es,
};

export const DEFAULT_LANGUAGE = 'en';
const I18n = new Translator(DEFAULT_LANGUAGE);
I18n.addWords(AppLocales);

export default I18n;
