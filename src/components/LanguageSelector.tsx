import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { detectCountry, getLanguageFromCountry } from '../utils/locationDetection';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  
  const currentLanguage = i18n.language;
  
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
  
  useEffect(() => {
    // Get detected country
    const fetchCountry = async () => {
      // Check if we already have a detected country in localStorage
      const savedCountry = localStorage.getItem('detectedCountry');
      
      if (savedCountry) {
        setDetectedCountry(savedCountry);
        
        // Check if current language was auto-detected
        const userSelectedLanguage = localStorage.getItem('userSelectedLanguage');
        if (!userSelectedLanguage) {
          setIsAutoDetected(true);
        }
      } else {
        // Detect country if not already in localStorage
        const country = await detectCountry();
        if (country) {
          setDetectedCountry(country);
          localStorage.setItem('detectedCountry', country);
        }
      }
    };
    
    fetchCountry();
  }, []);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    
    // Mark this as a user-selected language
    localStorage.setItem('i18nextLng', lng);
    localStorage.setItem('userSelectedLanguage', 'true');
    setIsAutoDetected(false);
    
    console.log(`User manually selected language: ${lng}`);
  };
  
  // Function to reset to auto-detection
  const resetToAutoDetection = async () => {
    localStorage.removeItem('userSelectedLanguage');
    localStorage.removeItem('i18nextLng');
    
    // Re-run auto-detection
    const { applyLocationSettings } = await import('../utils/locationDetection');
    await applyLocationSettings();
    
    setIsOpen(false);
    console.log('Reset to automatic language detection');
  };
  
  // Get current language display name
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.name : 'English';
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-signal-blue focus:ring-offset-2 focus:ring-offset-gray-100"
          id="language-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isAutoDetected && detectedCountry && (
            <GlobeAltIcon className="mr-2 h-4 w-4 text-signal-blue" aria-hidden="true" />
          )}
          {getCurrentLanguageName()}
          <ChevronDownIcon className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          tabIndex={-1}
        >
          {detectedCountry && (
            <div className="px-4 py-2 text-xs text-gray-500 border-b">
              {isAutoDetected ? (
                <span className="flex items-center">
                  <GlobeAltIcon className="mr-1 h-3 w-3 text-signal-blue" aria-hidden="true" />
                  {t('language.detectedCountry')}: {detectedCountry}
                </span>
              ) : (
                <span>{t('language.detectedCountry')}: {detectedCountry}</span>
              )}
            </div>
          )}
          <div className="py-1" role="none">
            {languages.map(language => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === language.code
                    ? 'bg-signal-blue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                role="menuitem"
                tabIndex={-1}
              >
                {language.name}
                {detectedCountry && getLanguageFromCountry(detectedCountry) === language.code && !isAutoDetected && (
                  <span className="ml-2 text-xs text-gray-400">({t('language.detectedCountry')})</span>
                )}
              </button>
            ))}
            {detectedCountry && (
              <>
                <hr className="my-1" />
                <button
                  onClick={resetToAutoDetection}
                  className="block w-full text-left px-4 py-2 text-sm text-signal-blue hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={-1}
                >
                  <GlobeAltIcon className="inline h-4 w-4 mr-2" />
                  Auto-detect language
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 