import en from './en';
import es from './es';

const DEFAULT_LANGUAGE = 'en';
const languages = {
  en,
  es,
};
let newLanguage = DEFAULT_LANGUAGE;

export default class Translator {
  // CONSTRUCTOR
  constructor(lang = DEFAULT_LANGUAGE) {
    this.setLanguage(lang);
  }

  // TRANSLATE STRING
  static translateString(str, lang = DEFAULT_LANGUAGE) {
    return languages[lang][str] || str;
  }

  // SET LANGUAGE
  setLanguage(language) {
    newLanguage = languages[language]
      ? language
      : DEFAULT_LANGUAGE;
  }

  // GET LANAGUGES
  getLanguages() {
    return languages;
  }

  // GET LANGUAGE
  getLanguage() {
    return newLanguage;
  }

  // ADD WORDS
  addWords(dictionary) {
    Object.keys(dictionary).forEach((lang) =>
      Object.assign(languages[lang], dictionary[lang]),
    );
  }

  // TRANSLATE
  translate(str) {
    return languages[newLanguage][str] || str;
  }
}
