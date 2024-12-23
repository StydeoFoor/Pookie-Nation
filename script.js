import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {

  const firebaseConfig = {
    apiKey: "AIzaSyAZUP0oePM49jWOQPPBneOMhp7c6Xri-6w",
    authDomain: "pookie-natio.firebaseapp.com",
    projectId: "pookie-natio",
    storageBucket: "pookie-natio.firebasestorage.app",
    messagingSenderId: "814115703444",
    appId: "1:814115703444:web:13c97bc1c9be5e8c104281",
    measurementId: "G-8VH4ZC31ND"
  };

  // Firebase Initialization
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // ===== Login System =====
  function initializeLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
  
        if (!username || !password) {
          alert("Username and password are required.");
          return;
        }
  
        try {
          // Fetch only the specific user's data from Firebase
          const userRef = ref(database, `users/${username}`);
          const snapshot = await get(userRef);
  
          if (snapshot.exists()) {
            const user = snapshot.val();
  
            // Validate the password
            if (user.password === password) {
              localStorage.setItem("PookloggedInUser", JSON.stringify(user)); // Store only the logged-in user's info
              alert("Login successful!");
              window.location.href = "dashboard.html";
            } else {
              alert("Invalid username or password.");
            }
          } else {
            alert("Invalid username or password.");
          }
        } catch (error) {
          console.error("Error during login:", error);
          alert("An error occurred while logging in. Please try again.");
        }
      });
    }
  }

  // ===== Dashboard Logic =====
  function populateDashboard() {
    const loggedInUser = JSON.parse(localStorage.getItem("PookloggedInUser"));

    // Redirect to login only if not already on the login page
    if (!loggedInUser && !window.location.pathname.includes("login.html")) {
      window.location.href = "login.html";
      return;
    }

    if (loggedInUser) {
      const nameEl = document.getElementById("name");
      const roleEl = document.getElementById("role");
      const teamEl = document.getElementById("team");
      const involvementEl = document.getElementById("currentInvolvement");
      const ownerDash = document.getElementById("ownerDash");

      if (nameEl) nameEl.textContent = loggedInUser.name || "N/A";
      if (roleEl) roleEl.textContent = loggedInUser.role || "N/A";
      if (teamEl) teamEl.textContent = loggedInUser.team || "N/A";
      if (involvementEl)
        involvementEl.textContent = loggedInUser.currentInvolvement || "N/A";

      const allowedRoles = [
        "President",
        "News Reporter",
        "Developer",
        "Congressmen",
        "Vice President",
      ];
      if (ownerDash && allowedRoles.includes(loggedInUser.role)) {
        ownerDash.style.display = "block";
        ownerDash.style.pointerEvents = "auto";
      }
    }
  }

  function CongressmenMessage() {
    const loggedInUser = JSON.parse(localStorage.getItem("PookloggedInUser"));

    const bodyMsg = document.getElementById("congMsg");

    const allowedRoles = [
      "Owner",
      "Congressmen",
      "Developer",
    ];
    if (bodyMsg && allowedRoles.includes(loggedInUser.role)) {
      bodyMsg.style.display = "block";
      bodyMsg.style.pointerEvents = "auto";
    }
  }

  function initializeDashboard() {
    if (window.location.pathname.includes("dashboard.html")) {
      populateDashboard();
    }
  }

  function ownerDashboard() {
    const loggedInUser = JSON.parse(localStorage.getItem("PookloggedInUser"));

    const allowedRoles = [
      "President",
      "Vice President",
      "Developer",
      "News Reporter",
      "Congressmen",
    ];
    if (!allowedRoles.includes(loggedInUser.role)) {
      window.location.href = "index.html";
      alert("You aren't allowed here")
      return;
    }

    if (!loggedInUser) {
      window.location.href = "login.html";
      return;
    }

    const nameEl = document.getElementById("adname");
    const roleEl = document.getElementById("adrole");
    const teamEl = document.getElementById("memberrequest");
    const involvementEl = document.getElementById("membercount");

    if (nameEl) nameEl.textContent = loggedInUser.name || "N/A";
    if (roleEl) roleEl.textContent = loggedInUser.role || "N/A";
    if (teamEl) teamEl.textContent = loggedInUser.team || "N/A";
    if (involvementEl)
      involvementEl.textContent = loggedInUser.currentInvolvement || "N/A";
  }

  function initOwnerDashboard() {
    if (window.location.pathname.includes("ownerDashboard.html")) {
      ownerDashboard();
    }
  }

  // ===== Initialize Page =====
  function initializePage() {
    initializeTheme();
    initializeLayout();
    initializeLoginForm();
    initializeDashboard();
    initOwnerDashboard();
    CongressmenMessage();
  }

  // Load user data and initialize the page
  initializePage();

  // Add event listener for layout toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (useSidebar) {
        switchToTopbar();
      } else {
        switchToSidebar();
      }
    });
  }

  // Add event listener for theme toggle

  if (window.location.href.includes("login.html")) {
    console.log("Login page detected.");
    loginTheme();
  } else {
    console.log("Not on the login page.");
  }

  function loginTheme() {
    console.log("loginTheme function called.");

    const loginContainer = document.getElementById("loginContainer");
    console.log("loginContainer:", loginContainer); // Debugging line

    if (!loginContainer) {
      console.error("loginContainer not found.");
      return;
    }

    console.log("Saved theme in localStorage:", savedTheme); // Debugging line
  }

  // Easter egg: Chicken Nugget on 'N' key press
});