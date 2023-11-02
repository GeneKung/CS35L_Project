// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaqDUwBqu3-C8BCMoot3nwJ9S68nqpAeo",
  authDomain: "ai-recipe-generator-491f3.firebaseapp.com",
  projectId: "ai-recipe-generator-491f3",
  storageBucket: "ai-recipe-generator-491f3.appspot.com",
  messagingSenderId: "316798272104",
  appId: "1:316798272104:web:14fc4587e6b5cbb49771dd",
  measurementId: "G-8TZPJQGXMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = () => {
    if (typeof window !== "undefined") {
        return getAnalytics(app);
    } else {
        return null;
    }
}

