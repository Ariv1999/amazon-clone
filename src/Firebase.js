
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgl4dchURyXX2-TOuY1KkeRS9B4aegHQw",
  authDomain: "clone-a6494.firebaseapp.com",
  projectId: "clone-a6494",
  storageBucket: "clone-a6494.appspot.com",
  messagingSenderId: "472766233183",
  appId: "1:472766233183:web:6d078fa422935c189179ea",
  measurementId: "G-YCJB7QYJX7"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};