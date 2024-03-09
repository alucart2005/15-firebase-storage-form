import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZZzcgyFjAPtakiKdixl01ux-IgIsS4Ks",
  authDomain: "storage-f4ec4.firebaseapp.com",
  projectId: "storage-f4ec4",
  storageBucket: "storage-f4ec4.appspot.com",
  messagingSenderId: "85575762035",
  appId: "1:85575762035:web:7fb21d3436f622df81ea06",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
