import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4l2HgYDFDanO7juzb-yuAvztq9ypPbLw",
  authDomain: "mi-notez.firebaseapp.com",
  projectId: "mi-notez",
  storageBucket: "mi-notez.appspot.com",
  messagingSenderId: "516687670881",
  appId: "1:516687670881:web:8c60b64b4fe77495d98420",
  measurementId: "G-8PY52HRJ27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
