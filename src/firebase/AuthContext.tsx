import React, { createContext, useContext, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

// Use Firebase User type
type User = FirebaseUser;

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
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
  loading: false,
  loginWithGoogle: async () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Minimal implementation for build purposes
  const authValue: AuthContextType = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    login: async () => {},
    signup: async (email, password, name) => {},
    logout: async () => {},
    resetPassword: async () => {},
    updateUserProfile: async () => {},
    loginWithGoogle: async () => {},
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 