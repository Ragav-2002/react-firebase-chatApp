// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-89643.firebaseapp.com",
  projectId: "chat-89643",
  storageBucket: "chat-89643.appspot.com",
  messagingSenderId: "171403751528",
  appId: "1:171403751528:web:a7dd736d1e289a4080cbdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);