// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQhXBwh5O7D-my5LGoJRmlh2FGKpbXfa8",
  authDomain: "iic-queji.firebaseapp.com",
  projectId: "iic-queji",
  storageBucket: "iic-queji.firebasestorage.app",
  messagingSenderId: "624508744241",
  appId: "1:624508744241:web:e1c098fafd3c956d479b10",
  measurementId: "G-TTQQRPTMPJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
