import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDownIcon, 
  GlobeAltIcon, 
  CurrencyDollarIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { useCurrency } from '../contexts/CurrencyContext';
import { detectCountry } from '../utils/locationDetection';

type CurrencyOption = {
  code: string;
  symbol: string;
  name: string;
};

const LocaleSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currencyInfo, setCurrencyManually } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'currency'>('language');
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  
  const currentLanguage = i18n.language;
  
  // List of available languages
  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'de', name: t('language.de') },
    { code: 'fr', name: t('language.fr') },
    { code: 'es', name: t('language.es') },
    { code: 'it', name: t('language.it') },
    { code: 'ar', name: t('language.ar') },
    { code: 'ja', name: t('language.ja') },
    { code: 'ru', name: t('language.ru') },
    { code: 'zh', name: t('language.zh') }
  ];
  
  // List of available currencies
  const currencies: CurrencyOption[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' }
  ];
  
  useEffect(() => {
    // Get detected country
    const fetchCountry = async () => {
      const country = await detectCountry();
      setDetectedCountry(country);
    };
    
    fetchCountry();
  }, []);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Save to localStorage and mark as user-selected
    localStorage.setItem('i18nextLng', lng);
    localStorage.setItem('userSelectedLanguage', 'true');
    
    console.log(`User manually selected language: ${lng}`);
  };
  
  const changeCurrency = (currency: CurrencyOption) => {
    setCurrencyManually(currency);
  };
  
  // Get current currency display
  const getCurrentCurrencyDisplay = () => {
    return `${currencyInfo.symbol}`;
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/90 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="locale-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GlobeAltIcon className="h-3 w-3 text-signal-blue mr-1" aria-hidden="true" />
          <span className="sr-only">Language and Currency</span>
          <span className="font-medium">{currentLanguage.toUpperCase()}</span>
          <span className="text-gray-400 mx-1">|</span>
          <span className="font-medium">{getCurrentCurrencyDisplay()}</span>
          <ChevronDownIcon className="h-3 w-3 ml-1" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="locale-menu-button"
          tabIndex={-1}
        >
          {detectedCountry && (
            <div className="px-4 py-2 text-xs text-gray-500 border-b">
              {t('language.detectedCountry')}: {detectedCountry}
            </div>
          )}
          
          <div className="flex border-b">
            <button
              className={`flex-1 text-center px-4 py-2 text-sm font-medium ${
                activeTab === 'language' 
                  ? 'text-signal-blue border-b-2 border-signal-blue' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('language')}
            >
              <LanguageIcon className="inline h-4 w-4 mr-1" />
              {t('locale.language')}
            </button>
            <button
              className={`flex-1 text-center px-4 py-2 text-sm font-medium ${
                activeTab === 'currency' 
                  ? 'text-signal-blue border-b-2 border-signal-blue' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('currency')}
            >
              <CurrencyDollarIcon className="inline h-4 w-4 mr-1" />
              {t('locale.currency')}
            </button>
          </div>
          
          <div className="py-1 max-h-60 overflow-y-auto" role="none">
            {activeTab === 'language' ? (
              // Language options
              languages.map(language => (
                <button
                  key={language.code}
                  onClick={() => {
                    changeLanguage(language.code);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currentLanguage === language.code
                      ? 'bg-signal-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  role="menuitem"
                  tabIndex={-1}
                >
                  {language.name}
                </button>
              ))
            ) : (
              // Currency options
              currencies.map(currency => (
                <button
                  key={currency.code}
                  onClick={() => {
                    changeCurrency(currency);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    currencyInfo.code === currency.code
                      ? 'bg-signal-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  role="menuitem"
                  tabIndex={-1}
                >
                  <span className="mr-2">{currency.symbol}</span>
                  {currency.name} ({currency.code})
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocaleSelector; 