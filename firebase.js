import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHswtiTozfR5xVZUOWtg_pTNtXjiCQJF0",
  authDomain: "deal-bridge-estates.firebaseapp.com",
  projectId: "deal-bridge-estates",
  storageBucket: "deal-bridge-estates.firebasestorage.app",
  messagingSenderId: "224163143979",
  appId: "1:224163143979:web:e08e0e9718a890a52be56e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
