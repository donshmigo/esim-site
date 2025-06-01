// Placeholder Firebase configuration
// This is a minimal implementation to satisfy TypeScript imports during build

// Mock Firebase app
export const app = {
  name: '[DEFAULT]',
};

// Mock Firestore database
export const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({
        exists: false,
        data: () => null,
      }),
      set: async () => {},
      update: async () => {},
    }),
  }),
  doc: () => ({
    get: async () => ({
      exists: false,
      data: () => null,
    }),
    set: async () => {},
    update: async () => {},
  }),
};

// Mock Firebase auth
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: null) => void) => {
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: async () => ({ user: null }),
  createUserWithEmailAndPassword: async () => ({ user: null }),
  signOut: async () => {},
};

export default { app, db, auth }; 