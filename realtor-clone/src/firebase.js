import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQ2dLT6-YgD6_cAka_hiFFH8isXbzLCVM",
  authDomain: "realtor-clone-react-b4f98.firebaseapp.com",
  projectId: "realtor-clone-react-b4f98",
  storageBucket: "realtor-clone-react-b4f98.appspot.com",
  messagingSenderId: "498909730426",
  appId: "1:498909730426:web:b98802a6ad6f2c76000dc3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();