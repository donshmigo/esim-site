import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  connectAuthEmulator 
} from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Track initialization state
let firestoreInitialized = false;
let networkActive = true;
let retryCount = 0;
const MAX_RETRIES = 3;

// Initialize Firebase and services once
console.log('Initializing Firebase app');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Set persistence to LOCAL (sessions will be saved in localStorage) - async but don't block
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase Auth persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting Auth persistence:', error);
  });

// Try to enable offline persistence - don't block rendering on this
try {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('Firestore offline persistence enabled');
      firestoreInitialized = true;
    })
    .catch((error) => {
      console.error('Error enabling Firestore persistence:', error);
      
      if (error.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Multiple tabs open, Firestore persistence only enabled in one tab');
      } else if (error.code === 'unimplemented') {
        // The current browser does not support IndexedDB persistence
        console.warn('Current browser does not support IndexedDB persistence');
      }
      // Consider the initialization complete even if there's an error
      firestoreInitialized = true;
    });
} catch (error) {
  console.error('Error during Firestore persistence setup:', error);
  firestoreInitialized = true; // Allow the app to continue
}

// Network connection monitoring and management for Firestore
export const monitorNetworkStatus = () => {
  // Monitor online/offline status
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Handle device going online
const handleOnline = () => {
  console.log('Device is online, reconnecting to Firestore');
  if (!networkActive && firestoreInitialized) {
    enableNetwork(db)
      .then(() => {
        console.log('Firestore network connection restored');
        networkActive = true;
        retryCount = 0;
      })
      .catch(error => {
        console.error('Error re-enabling Firestore network:', error);
        
        // Retry logic for network reconnection
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          console.log(`Retrying network connection (${retryCount}/${MAX_RETRIES})...`);
          setTimeout(handleOnline, 2000 * retryCount); // Exponential backoff
        }
      });
  }
};

// Handle device going offline
const handleOffline = () => {
  console.log('Device is offline, disabling Firestore network access');
  if (networkActive && firestoreInitialized) {
    disableNetwork(db)
      .then(() => {
        console.log('Firestore network connection disabled');
        networkActive = false;
      })
      .catch(error => {
        console.error('Error disabling Firestore network:', error);
      });
  }
};

// Initialize network monitoring
if (typeof window !== 'undefined') {
  monitorNetworkStatus();
}

export { auth, db, storage };
export default app; 