import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useCurrency } from '../contexts/CurrencyContext';

type CurrencyOption = {
  code: string;
  symbol: string;
  name: string;
};

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencyInfo, setCurrencyManually } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  
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
  
  const changeCurrency = (currency: CurrencyOption) => {
    setCurrencyManually(currency);
    setIsOpen(false);
  };
  
  // Get current currency display
  const getCurrentCurrencyDisplay = () => {
    return `${currencyInfo.symbol} ${currencyInfo.code}`;
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-signal-blue focus:ring-offset-2 focus:ring-offset-gray-100"
          id="currency-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CurrencyDollarIcon className="mr-2 h-4 w-4 text-signal-blue" aria-hidden="true" />
          {getCurrentCurrencyDisplay()}
          <ChevronDownIcon className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="currency-menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {currencies.map(currency => (
              <button
                key={currency.code}
                onClick={() => changeCurrency(currency)}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector; 