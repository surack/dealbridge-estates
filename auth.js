import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =========================
   AUTO REDIRECT (SESSION)
========================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If already logged in → go to dashboard
    if (!window.location.pathname.includes("dashboard.html")) {
      window.location.href = "dashboard.html";
    }
  }
});

/* =========================
   LOGIN FUNCTION
========================= */
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const btn = document.getElementById("loginBtn");
  const errorBox = document.getElementById("error");

  // Reset error
  errorBox.innerText = "";

  // Basic validation
  if (!email || !password) {
    errorBox.innerText = "Please enter email and password";
    return;
  }

  // Button loading state
  btn.innerText = "Logging in...";
  btn.disabled = true;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Success → redirect
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Friendly error messages
      let message = "Login failed";

      switch (error.code) {
        case "auth/invalid-email":
          message = "Invalid email format";
          break;
        case "auth/user-not-found":
          message = "User not found";
          break;
        case "auth/wrong-password":
          message = "Incorrect password";
          break;
        default:
          message = error.message;
      }

      errorBox.innerText = message;

      // Reset button
      btn.innerText = "Login";
      btn.disabled = false;
    });
};

/* =========================
   OPTIONAL: SIGNUP FUNCTION
   (Use later if needed)
========================= */
window.signup = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  if (!email || !password) {
    errorBox.innerText = "Please enter email and password";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorBox.innerText = error.message;
    });
};
