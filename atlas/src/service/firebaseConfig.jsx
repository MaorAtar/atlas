// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "atlas-967ce.firebaseapp.com",
  projectId: "atlas-967ce",
  storageBucket: "atlas-967ce.firebasestorage.app",
  messagingSenderId: "945838647515",
  appId: "1:945838647515:web:987559affe2efad7e944fe",
  measurementId: "G-SR2XK7B6PP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
