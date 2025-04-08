import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the currency info type
export type CurrencyInfo = {
  code: string;
  symbol: string;
};

// Define the context type
interface CurrencyContextType {
  currencyInfo: CurrencyInfo;
  formatPrice: (value: number, showCode?: boolean) => string;
  convertFromUSD: (usdValue: number) => number;
  setCurrencyManually: (currency: CurrencyInfo) => void;
}

// Create the context with default values
const CurrencyContext = createContext<CurrencyContextType>({
  currencyInfo: { code: 'USD', symbol: '$' },
  formatPrice: () => '',
  convertFromUSD: () => 0,
  setCurrencyManually: () => {},
});

// Custom event for currency changes
export const CURRENCY_CHANGE_EVENT = 'currency-change';

// Provider component
interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currencyInfo, setCurrencyInfo] = useState<CurrencyInfo>({ code: 'USD', symbol: '$' });

  // Load currency from localStorage
  const loadCurrencyFromStorage = () => {
    const storedCurrency = localStorage.getItem('userCurrency');
    if (storedCurrency) {
      try {
        setCurrencyInfo(JSON.parse(storedCurrency));
      } catch (error) {
        console.error('Error parsing stored currency:', error);
      }
    }
  };

  useEffect(() => {
    // Load currency on initial mount
    loadCurrencyFromStorage();
    
    // Create event handler to listen for currency changes from other components
    const handleCurrencyChange = () => {
      loadCurrencyFromStorage();
    };
    
    // Listen for the custom currency change event
    window.addEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange);
    
    // Clean up event listener
    return () => {
      window.removeEventListener(CURRENCY_CHANGE_EVENT, handleCurrencyChange);
    };
  }, []);

  /**
   * Manually set the currency and save to localStorage
   */
  const setCurrencyManually = (currency: CurrencyInfo) => {
    setCurrencyInfo(currency);
    localStorage.setItem('userCurrency', JSON.stringify(currency));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event(CURRENCY_CHANGE_EVENT));
  };

  /**
   * Format a price value according to the detected currency
   */
  const formatPrice = (value: number, showCode = false): string => {
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyInfo.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      
      const formatted = formatter.format(value);
      return showCode ? `${formatted} ${currencyInfo.code}` : formatted;
    } catch (error) {
      // Fallback simple formatting with symbol
      return `${currencyInfo.symbol}${value.toFixed(2)}`;
    }
  };

  /**
   * Convert a price from USD to the user's currency
   * Uses hardcoded exchange rates for demonstration
   */
  const convertFromUSD = (usdValue: number): number => {
    // Example exchange rates (would be fetched from an API in production)
    const exchangeRates: Record<string, number> = {
      'USD': 1.0,
      'EUR': 0.93,
      'GBP': 0.79,
      'JPY': 150.27,
      'CAD': 1.37,
      'AUD': 1.52,
      'CNY': 7.24,
      'RUB': 91.68,
      'SAR': 3.75,
      'AED': 3.67
    };
    
    const rate = exchangeRates[currencyInfo.code] || 1.0;
    return usdValue * rate;
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currencyInfo, 
        formatPrice, 
        convertFromUSD, 
        setCurrencyManually 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook for using the currency context
export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext; 