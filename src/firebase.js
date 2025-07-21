import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXiZZ4rGg8C7YNQ_aG4cJzwIWdSUFvCh0",
  authDomain: "hospitalsop-ecf92.firebaseapp.com",
  projectId: "hospitalsop-ecf92",
  storageBucket: "hospitalsop-ecf92.firebasestorage.app",
  messagingSenderId: "25127694164",
  appId: "1:25127694164:web:3d24d6058b968858d622c1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

