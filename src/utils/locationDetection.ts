import i18n from '../i18n/i18n';

// Define country-to-language mapping
// Map country codes to language codes based on primary languages in those countries
const countryToLanguage: Record<string, string> = {
  // English-speaking countries
  US: 'en', UK: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', CA: 'en', // Canada (English, French)
  // German-speaking countries
  DE: 'de', AT: 'de', LI: 'de', CH: 'de', // Switzerland (German, French, Italian)
  // Spanish-speaking countries
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', 
  GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es', 
  CR: 'es', PA: 'es', UY: 'es',
  // French-speaking countries
  FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr', CI: 'fr', SN: 'fr', CM: 'fr', ML: 'fr', NE: 'fr',
  // Italian-speaking countries
  IT: 'it', SM: 'it', VA: 'it',
  // Russian-speaking countries
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
  // Arabic-speaking countries
  SA: 'ar', AE: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', IQ: 'ar', LB: 'ar', JO: 'ar', 
  KW: 'ar', OM: 'ar', QA: 'ar', BH: 'ar', YE: 'ar', SY: 'ar', PS: 'ar', SD: 'ar', 
  LY: 'ar', TN: 'ar',
  // Japanese-speaking countries
  JP: 'ja',
  // Chinese-speaking countries
  CN: 'zh', TW: 'zh', HK: 'zh', SG: 'zh', MO: 'zh',
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
  GB: { code: 'GBP', symbol: '£' },
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
    // Try multiple IP geolocation services for reliability
    const services = [
      'https://ipinfo.io/json',
      'https://ipapi.co/json/',
      'https://api.ipgeolocation.io/ipgeo?apiKey=free'
    ];

    // Try each service in sequence until one works
    for (const service of services) {
      try {
        const response = await fetch(service);
        if (response.ok) {
          const data = await response.json();
          // Different APIs use different property names
          const countryCode = data.country || data.country_code || data.countryCode;
          if (countryCode) {
            console.log(`Country detected: ${countryCode} (using ${service})`);
            return countryCode;
          }
        }
      } catch (error) {
        console.warn(`Failed to detect country using ${service}:`, error);
        // Continue to next service
      }
    }

    // If all services fail, fall back to timezone detection
    const timezoneCountry = detectCountryFromTimezone();
    if (timezoneCountry) {
      console.log(`Country detected from timezone: ${timezoneCountry}`);
      return timezoneCountry;
    }

    // If everything fails, return empty string
    return '';
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
    const parts = timezone.split('/');
    if (parts.length < 2) return '';
    
    const region = parts[0];
    const city = parts[1];
    
    // Map regions and cities to likely country codes
    const regionMapping: Record<string, Record<string, string>> = {
      'America': {
        'New_York': 'US',
        'Chicago': 'US',
        'Los_Angeles': 'US',
        'Denver': 'US',
        'Phoenix': 'US',
        'Toronto': 'CA',
        'Vancouver': 'CA',
        'Mexico_City': 'MX',
        'Bogota': 'CO',
        'Sao_Paulo': 'BR',
        'Buenos_Aires': 'AR',
        'Lima': 'PE',
        'Santiago': 'CL',
        'default': 'US'
      },
      'Europe': {
        'London': 'GB',
        'Paris': 'FR',
        'Berlin': 'DE',
        'Madrid': 'ES',
        'Rome': 'IT',
        'Moscow': 'RU',
        'Amsterdam': 'NL',
        'Vienna': 'AT',
        'Brussels': 'BE',
        'default': 'GB'
      },
      'Asia': {
        'Tokyo': 'JP',
        'Shanghai': 'CN',
        'Hong_Kong': 'HK',
        'Singapore': 'SG',
        'Seoul': 'KR',
        'Dubai': 'AE',
        'Bangkok': 'TH',
        'Kolkata': 'IN',
        'default': 'JP'
      },
      'Australia': {
        'Sydney': 'AU',
        'Melbourne': 'AU',
        'Perth': 'AU',
        'default': 'AU'
      },
      'Africa': {
        'Cairo': 'EG',
        'Johannesburg': 'ZA',
        'Lagos': 'NG',
        'Nairobi': 'KE',
        'default': 'ZA'
      },
      'default': {
        'default': 'US'
      }
    };
    
    // Try to get country based on city
    if (regionMapping[region] && regionMapping[region][city.replace(' ', '_')]) {
      return regionMapping[region][city.replace(' ', '_')];
    }
    
    // Fall back to region default
    if (regionMapping[region] && regionMapping[region]['default']) {
      return regionMapping[region]['default'];
    }
    
    // Ultimate fallback
    return regionMapping['default']['default'];
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
  // Check if user is explicitly requesting a language via URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  
  if (langParam && i18n.languages.includes(langParam)) {
    // Language specified in URL takes highest priority
    i18n.changeLanguage(langParam);
    localStorage.setItem('i18nextLng', langParam);
    localStorage.setItem('userSelectedLanguage', 'true');
    console.log(`Language set from URL parameter: ${langParam}`);
    return;
  }
  
  // Check if user has MANUALLY set a language preference (not auto-detected)
  const userSelectedLanguage = localStorage.getItem('userSelectedLanguage');
  const hasUserLanguagePreference = localStorage.getItem('i18nextLng');
  
  // Only skip auto-detection if user has manually selected a language
  if (!userSelectedLanguage) {
    try {
      console.log('No manual language preference found, detecting country...');
      // Try to detect country using IP geolocation
      let countryCode = await detectCountry();
      
      if (countryCode) {
        // Set language based on detected country
        const languageCode = getLanguageFromCountry(countryCode);
        console.log(`Setting language to ${languageCode} based on detected country ${countryCode}`);
        i18n.changeLanguage(languageCode);
        
        // Save the auto-detected language but don't mark as user-selected
        localStorage.setItem('i18nextLng', languageCode);
        localStorage.setItem('detectedCountry', countryCode);
        localStorage.removeItem('userSelectedLanguage'); // Ensure this is not set for auto-detection
        
        // Store currency info for use in components
        const currencyInfo = getCurrencyFromCountry(countryCode);
        localStorage.setItem('userCurrency', JSON.stringify(currencyInfo));
        
        return true;
      } else {
        console.log('Could not detect country, using default language');
      }
    } catch (error) {
      console.error('Error applying location settings:', error);
    }
  } else {
    console.log(`Using manually selected language: ${hasUserLanguagePreference}`);
  }
  
  return false;
};

export default {
  detectCountry,
  detectCountryFromTimezone,
  getLanguageFromCountry,
  getCurrencyFromCountry,
  applyLocationSettings
}; 