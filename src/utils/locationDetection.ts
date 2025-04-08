import i18n from '../i18n/i18n';

// Define country-to-language mapping
// Map country codes to language codes based on primary languages in those countries
const countryToLanguage: Record<string, string> = {
  // English-speaking countries
  US: 'en', UK: 'en', CA: 'en', AU: 'en', NZ: 'en', 
  // German-speaking countries
  DE: 'de', AT: 'de', CH: 'de', 
  // Spanish-speaking countries
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  // French-speaking countries
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr', 
  // Italian-speaking countries
  IT: 'it', SM: 'it', VA: 'it',
  // Russian-speaking countries
  RU: 'ru', BY: 'ru', KZ: 'ru',
  // Arabic-speaking countries
  SA: 'ar', AE: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', 
  // Japanese-speaking countries
  JP: 'ja',
  // Chinese-speaking countries
  CN: 'zh', TW: 'zh', HK: 'zh',
};

// Define country-to-currency mapping
const countryToCurrency: Record<string, { code: string, symbol: string }> = {
  // USD
  US: { code: 'USD', symbol: '$' },
  // Euro
  DE: { code: 'EUR', symbol: '€' }, 
  FR: { code: 'EUR', symbol: '€' },
  IT: { code: 'EUR', symbol: '€' },
  ES: { code: 'EUR', symbol: '€' },
  // British Pound
  UK: { code: 'GBP', symbol: '£' },
  // Japanese Yen
  JP: { code: 'JPY', symbol: '¥' },
  // Chinese Yuan
  CN: { code: 'CNY', symbol: '¥' },
  // Russian Ruble
  RU: { code: 'RUB', symbol: '₽' },
  // Canadian Dollar
  CA: { code: 'CAD', symbol: '$' },
  // Australian Dollar
  AU: { code: 'AUD', symbol: '$' },
  // Saudi Riyal
  SA: { code: 'SAR', symbol: 'ر.س' },
  // UAE Dirham
  AE: { code: 'AED', symbol: 'د.إ' },
};

// Fallback values
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_CURRENCY = { code: 'USD', symbol: '$' };

/**
 * Detects user's country using IP geolocation API
 * @returns Promise that resolves to country code (e.g., 'US', 'DE')
 */
export const detectCountry = async (): Promise<string> => {
  try {
    // Using ipinfo.io which doesn't require API key for basic usage
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error('Error detecting country:', error);
    return '';
  }
};

/**
 * Alternative method to detect country using browser timezone
 * Less accurate but doesn't require API call
 * @returns Country code based on timezone
 */
export const detectCountryFromTimezone = (): string => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Extract country code from timezone (e.g., 'America/New_York' -> 'US')
    const country = timezone.split('/')[0];
    
    // Map timezone regions to country codes
    const regionToCountry: Record<string, string> = {
      'America': 'US',
      'Europe': 'UK',
      'Asia': 'JP',
      'Australia': 'AU',
      'Africa': 'ZA',
      'Pacific': 'NZ',
      'Atlantic': 'UK',
      'Indian': 'IN'
    };
    
    return regionToCountry[country] || '';
  } catch (error) {
    console.error('Error detecting country from timezone:', error);
    return '';
  }
};

/**
 * Get language code based on country code
 * @param countryCode Two-letter country code (e.g., 'US', 'DE')
 * @returns Language code (e.g., 'en', 'de')
 */
export const getLanguageFromCountry = (countryCode: string): string => {
  if (!countryCode) return DEFAULT_LANGUAGE;
  return countryToLanguage[countryCode] || DEFAULT_LANGUAGE;
};

/**
 * Get currency info based on country code
 * @param countryCode Two-letter country code (e.g., 'US', 'DE')
 * @returns Currency object with code and symbol
 */
export const getCurrencyFromCountry = (countryCode: string) => {
  if (!countryCode) return DEFAULT_CURRENCY;
  return countryToCurrency[countryCode] || DEFAULT_CURRENCY;
};

/**
 * Apply detected language and currency settings based on country
 */
export const applyLocationSettings = async () => {
  // Only detect and apply settings if the user hasn't manually set a language preference
  const hasUserLanguagePreference = localStorage.getItem('i18nextLng');
  
  if (!hasUserLanguagePreference) {
    try {
      // Try to detect country using IP geolocation
      let countryCode = await detectCountry();
      
      // Fallback to timezone-based detection if IP detection fails
      if (!countryCode) {
        countryCode = detectCountryFromTimezone();
      }
      
      if (countryCode) {
        // Set language based on detected country
        const languageCode = getLanguageFromCountry(countryCode);
        i18n.changeLanguage(languageCode);
        localStorage.setItem('i18nextLng', languageCode);
        
        // Store currency info for use in components
        const currencyInfo = getCurrencyFromCountry(countryCode);
        localStorage.setItem('userCurrency', JSON.stringify(currencyInfo));
      }
    } catch (error) {
      console.error('Error applying location settings:', error);
    }
  }
};

export default {
  detectCountry,
  detectCountryFromTimezone,
  getLanguageFromCountry,
  getCurrencyFromCountry,
  applyLocationSettings
}; 