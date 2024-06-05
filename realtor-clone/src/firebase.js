import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBQ2dLT6-YgD6_cAka_hiFFH8isXbzLCVM",
  authDomain: "realtor-clone-react-b4f98.firebaseapp.com",
  projectId: "realtor-clone-react-b4f98",
  storageBucket: "realtor-clone-react-b4f98.appspot.com",
  messagingSenderId: "498909730426",
  appId: "1:498909730426:web:b98802a6ad6f2c76000dc3"
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
