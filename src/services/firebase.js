// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9nGqyt-QGjywh8X-WSD3pYyAG-XDZE8Q",
  authDomain: "feedback-app-9a9ba.firebaseapp.com",
  projectId: "feedback-app-9a9ba",
  storageBucket: "feedback-app-9a9ba.appspot.com",
  messagingSenderId: "238200335257",
  appId: "1:238200335257:web:2c76c5de6674c26cea4108",
  measurementId: "G-SWSTLLM92N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);

export {app, db}