// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYqBEZKB-IKIIryL966B1VYnjL4MsZspU",
  authDomain: "etkinlik-project.firebaseapp.com",
  projectId: "etkinlik-project",
  storageBucket: "etkinlik-project.appspot.com",
  messagingSenderId: "1015887508758",
  appId: "1:1015887508758:web:b333e944644e5c52414c37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb =getFirestore(app);
const auth = getAuth(app);

export {fireDb, auth}