import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // Debug Firebase initialization and configuration
  useEffect(() => {
    console.log('AuthProvider mounted - Checking Firebase configuration');
    
    // Check if Firebase is initialized
    if (!auth) {
      console.error('Firebase Auth is not initialized properly');
    } else {
      console.log('Firebase Auth is initialized');
    }
    
    // Check Firestore connection
    if (!db) {
      console.error('Firestore is not initialized properly');
    } else {
      console.log('Firestore is initialized');
    }

    // Set a timeout to prevent infinite loading if Firebase auth state doesn't change
    const timeoutId = setTimeout(() => {
      if (loading && !authInitialized) {
        console.log('Auth state took too long to initialize, setting loading to false');
        setLoading(false);
      }
    }, 3000); // Reduced from 5 seconds to 3 seconds for faster loading

    return () => clearTimeout(timeoutId);
  }, [loading, authInitialized]);

  // Set up auth state listener
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User ${user.uid} logged in` : 'No user logged in');
      setCurrentUser(user);
      setLoading(false);
      setAuthInitialized(true);
    }, (error) => {
      console.error('Auth state change error:', error);
      setLoading(false);
      setAuthInitialized(true);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Create new user with email and password
  async function signup(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, { displayName: name });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        displayName: name,
        createdAt: serverTimestamp(),
        plan: null,
        // Additional user data can be added here
      });
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  }

  // Sign in existing user
  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Sign in with Google
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      
      // Add scopes for additional permissions if needed
      provider.addScope('profile');
      provider.addScope('email');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      // Attempt to sign in with popup
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      console.log('Google sign-in successful:', user.uid);
      
      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      // If it doesn't exist, create it
      if (!userDoc.exists()) {
        console.log('Creating new user document in Firestore');
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          createdAt: serverTimestamp(),
          plan: null,
          // Additional user data can be added here
        });
      } else {
        console.log('User already exists in Firestore');
      }
      
      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error; // Re-throw to let component handle display
    }
  }

  // Sign out
  function logout() {
    return signOut(auth);
  }

  // Password reset
  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update profile
  async function updateUserProfile(displayName: string) {
    if (currentUser) {
      await updateProfile(currentUser, { displayName });
      
      // Update Firestore user document
      await setDoc(doc(db, 'users', currentUser.uid), {
        displayName
      }, { merge: true });
    }
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 