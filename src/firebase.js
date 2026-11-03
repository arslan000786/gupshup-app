import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfIhSGyjiGZoT-dddynSOoxN4lBRfu79o",
  authDomain: "gupshup-eb693.firebaseapp.com",
  databaseURL: "https://gupshup-eb693-default-rtdb.firebaseio.com",
  projectId: "gupshup-eb693",
  storageBucket: "gupshup-eb693.firebasestorage.app",
  messagingSenderId: "1098388630375",
  appId: "1:1098388630375:web:9eb704dd4657f7ed72ddc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
