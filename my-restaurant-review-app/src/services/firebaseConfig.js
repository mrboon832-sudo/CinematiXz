// src/services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Hard-coded configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrfFzh8fuBBIJbASHJ2LWG2B_6CNfaigs",
  authDomain: "restaurant-review-app-96a74.firebaseapp.com",
  projectId: "restaurant-review-app-96a74",
  storageBucket: "restaurant-review-app-96a74.firebasestorage.app",
  messagingSenderId: "1045109119695",
  appId: "1:1045109119695:web:657e3e5bc094137eadb5ba"
};

console.log('🚀 Initializing Firebase...');

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Test if auth is properly configured
  console.log('✅ Firebase Auth initialized successfully');
  console.log('🔑 Auth domain:', firebaseConfig.authDomain);
  console.log('📁 Project ID:', firebaseConfig.projectId);
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Please check:');
  console.error('1. Is Authentication enabled in Firebase Console?');
  console.error('2. Are the Firebase config values correct?');
  console.error('3. Is the project ID correct?');
  throw error;
}

export { auth };
export default app;