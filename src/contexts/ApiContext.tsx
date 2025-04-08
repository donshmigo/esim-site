import React, { createContext, ReactNode, useContext } from 'react';
import api from '../services/api';

// Create the API context
export const ApiContext = createContext(api);

// Provider component
export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook for using the API
export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiProvider; 