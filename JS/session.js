// session.js

// Function to get a specific cookie by name
function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Function to check if user is logged in
  function checkLoginStatus() {
    var loggedIn = getCookie('loggedIn');
    if (loggedIn) {
      // User is logged in
      return true;
    } else {
      // User is not logged in
      return false;
    }
  }
  
  // Function to handle session management
  function manageSession() {
    if (!checkLoginStatus()) {
      // Redirect to login page if not logged in
      window.location.href = '/login_db/login.html';
    }
  }
  
  // Call manageSession on page load
  window.onload = manageSession;
  