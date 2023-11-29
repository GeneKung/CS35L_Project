// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaqDUwBqu3-C8BCMoot3nwJ9S68nqpAeo",
  authDomain: "ai-recipe-generator-491f3.firebaseapp.com",
  projectId: "ai-recipe-generator-491f3",
  storageBucket: "ai-recipe-generator-491f3.appspot.com",
  messagingSenderId: "316798272104",
  appId: "1:316798272104:web:14fc4587e6b5cbb49771dd",
  measurementId: "G-8TZPJQGXMF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase auth
const auth = getAuth(app);
export { auth };
const db = getFirestore(app);
export { db }