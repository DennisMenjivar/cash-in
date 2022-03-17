import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBi4rrOP4zWJvlT3Vd4iEQ98dzhPWZDI5w",
  authDomain: "cashin-1b880.firebaseapp.com",
  projectId: "cashin-1b880",
  storageBucket: "cashin-1b880.appspot.com",
  messagingSenderId: "432727462895",
  appId: "1:432727462895:web:c9dd89d99c95380a555c1a",
});

export const auth = getAuth(firebaseConfig);
export const database = getFirestore(firebaseConfig);
