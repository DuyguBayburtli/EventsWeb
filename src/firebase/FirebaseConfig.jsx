// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwxydalayIYTxZZ8N4mMwB6FXEvltZNlU",
  authDomain: "eventproject-76401.firebaseapp.com",
  projectId: "eventproject-76401",
  storageBucket: "eventproject-76401.appspot.com",
  messagingSenderId: "147531423269",
  appId: "1:147531423269:web:31e799f994209ddf6ae9cc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireDB = getFirestore(app);
export const auth = getAuth(app)

