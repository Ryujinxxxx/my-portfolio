// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace the values below with your Firebase config (from the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBa9BGfy1XeSY-06IACTtVCQVJVXOZFD5c",
  authDomain: "my-portfolio-fa11e.firebaseapp.com",
  projectId: "my-portfolio-fa11e",
  storageBucket: "my-portfolio-fa11e.firebasestorage.app",
  messagingSenderId: "101272038631",
  appId: "1:101272038631:web:bb961129464ccdca1c4642",
  measurementId: "G-0PMX867S2K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);