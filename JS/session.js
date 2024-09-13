// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie value
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to erase a cookie
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Check for login status and handle login expiry
function checkLoginStatus() {
    var loggedIn = getCookie('loggedIn');
    var studentID = getCookie('studentID');

    if (loggedIn && studentID) {
        // User is logged in
        return true;
    } else {
        // User is not logged in
        return false;
    }
}

// Handle login process
function handleLogin(studentID) {
    setCookie('loggedIn', 'true', 15); // Store login status for 15 days
    setCookie('studentID', studentID, 15); // Store student ID for 15 days
}

// Handle logout process
function handleLogout() {
    eraseCookie('loggedIn');
    eraseCookie('studentID');
}
