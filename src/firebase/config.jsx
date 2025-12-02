import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzsaqxFeO74R0AMADSbgvtqRzRL8L6p90",
  authDomain: "memorji-ded14.firebaseapp.com",
  projectId: "memorji-ded14",
  storageBucket: "memorji-ded14.firebasestorage.app",
  messagingSenderId: "517870474774",
  appId: "1:517870474774:web:174dc162cbf8abb0d0c737",
  measurementId: "G-QLY6GY2QCW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };