import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* AUTO REDIRECT */
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (!window.location.pathname.includes("dashboard.html")) {
      window.location.href = "dashboard.html";
    }
  }
});

/* LOGIN */
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const btn = document.getElementById("loginBtn");
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  if (!email || !password) {
    errorBox.innerText = "Please enter both email and password.";
    return;
  }

  const originalText = btn.innerText;
  btn.innerText = "Please wait...";
  btn.disabled = true;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {

      let message = "Unable to login. Please try again.";

      switch (error.code) {
        case "auth/invalid-email":
          message = "Please enter a valid email.";
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          message = "Incorrect email or password.";
          break;

        case "auth/network-request-failed":
          message = "Check your internet connection.";
          break;
      }

      errorBox.innerText = message;

      btn.innerText = originalText;
      btn.disabled = false;
    });
};
