import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { detectCountry } from '../utils/locationDetection';
import { useCurrency } from './useCurrency';

type LocalizationInfo = {
  country: string;
  language: string;
  languageName: string;
  currency: {
    code: string;
    symbol: string;
  };
  formatPrice: (value: number, showCode?: boolean) => string;
  setCurrencyManually: (currency: { code: string; symbol: string }) => void;
};

/**
 * Custom hook for combined localization features
 * - Country detection
 * - Language settings
 * - Currency formatting
 */
export const useLocalization = (): LocalizationInfo => {
  const { t, i18n } = useTranslation();
  const { currencyInfo, formatPrice, setCurrencyManually } = useCurrency();
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    // Detect country on component mount
    const getCountry = async () => {
      try {
        const detectedCountry = await detectCountry();
        if (detectedCountry) {
          setCountry(detectedCountry);
        }
      } catch (error) {
        console.error('Error detecting country:', error);
      }
    };

    getCountry();
  }, []);

  // Get language name for current language code
  const getLanguageName = (code: string): string => {
    const languageKeys: Record<string, string> = {
      'en': 'language.en',
      'de': 'language.de',
      'fr': 'language.fr',
      'es': 'language.es',
      'it': 'language.it',
      'ar': 'language.ar',
      'ja': 'language.ja',
      'ru': 'language.ru',
      'zh': 'language.zh'
    };

    const key = languageKeys[code] || 'language.en';
    return t(key);
  };

  return {
    country,
    language: i18n.language,
    languageName: getLanguageName(i18n.language),
    currency: currencyInfo,
    formatPrice,
    setCurrencyManually
  };
};

export default useLocalization; 