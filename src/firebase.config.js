// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBFUvwSeVY_E0t9H7hbEovtKhsLrfQ80I",
  authDomain: "test2-64be2.firebaseapp.com",
  databaseURL: "https://test2-64be2-default-rtdb.firebaseio.com",
  projectId: "test2-64be2",
  storageBucket: "test2-64be2.firebasestorage.app",
  messagingSenderId: "47736995610",
  appId: "1:47736995610:web:c08d9f740a1429f30176a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
