import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import itTranslation from './locales/it/translation.json';
import arTranslation from './locales/ar/translation.json';
import jaTranslation from './locales/ja/translation.json';
import ruTranslation from './locales/ru/translation.json';
import zhTranslation from './locales/zh/translation.json';

// Language resources
const resources = {
  en: {
    translation: enTranslation
  },
  de: {
    translation: deTranslation
  },
  fr: {
    translation: frTranslation
  },
  es: {
    translation: esTranslation
  },
  it: {
    translation: itTranslation
  },
  ar: {
    translation: arTranslation
  },
  ja: {
    translation: jaTranslation
  },
  ru: {
    translation: ruTranslation
  },
  zh: {
    translation: zhTranslation
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    detection: {
      order: ['querystring', 'localStorage', 'cookie', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n; 