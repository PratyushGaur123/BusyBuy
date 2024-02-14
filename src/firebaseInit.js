// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH6lWc9j7nlB4J0ywKV88eR8BhrsFAZYM",
  authDomain: "busybuy-1b5dc.firebaseapp.com",
  projectId: "busybuy-1b5dc",
  storageBucket: "busybuy-1b5dc.appspot.com",
  messagingSenderId: "1010385479537",
  appId: "1:1010385479537:web:4fcff25c9790208fc078d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
