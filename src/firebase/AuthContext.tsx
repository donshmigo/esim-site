import React, { createContext, useContext, ReactNode } from 'react';

// Mock auth types
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {},
  isAuthenticated: false,
});

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Minimal implementation for build purposes
  const authValue: AuthContextType = {
    currentUser: null,
    isAuthenticated: false,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
    resetPassword: async () => {},
    updateUserProfile: async () => {},
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 