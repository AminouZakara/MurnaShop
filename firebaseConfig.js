// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPclE74zoBbeaikIxM2XB1lWZbIicBxwQ",
  authDomain: "compagnies-48f05.firebaseapp.com",
  projectId: "compagnies-48f05",
  storageBucket: "compagnies-48f05.firebasestorage.app",
  messagingSenderId: "954218532580",
  appId: "1:954218532580:web:340d1502a0dc073cab66f1",
  measurementId: "G-86PWTJN0N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage };