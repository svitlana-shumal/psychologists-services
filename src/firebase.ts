import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPSDei0V3MdKTaYOwPuTZqbUEYQixZNUA",
  authDomain: "psychologists-services-17177.firebaseapp.com",
  databaseURL:
    "https://psychologists-services-17177-default-rtdb.firebaseio.com",
  projectId: "psychologists-services-17177",
  storageBucket: "psychologists-services-17177.firebasestorage.app",
  messagingSenderId: "551254361118",
  appId: "1:551254361118:web:80735f6560e82c46c15a0f",
  measurementId: "G-KGT2WE2T5D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
