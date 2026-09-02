const TOKEN_KEY = 'jw_token';
const USER_KEY = 'jw_user';

/**
 * Save Login Session
 */
function saveSession(loginData, rememberMe = false) {
  clearSession();

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(TOKEN_KEY, loginData.token);

  storage.setItem(USER_KEY, JSON.stringify(loginData.user));
}

/**
 * Get JWT Token
 */
function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

/**
 * Get Current Logged-in User
 */
function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
}

/**
 * Check Login
 */
function isLoggedIn() {
  return !!getToken();
}

/**
 * Get User Role
 */
function getUserRole() {
  const user = getCurrentUser();

  return user ? user.role : null;
}

/**
 * Check Permission
 */
function hasPermission(permission) {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  return user.permissions.includes(permission);
}

/**
 * Check Accessible Location
 */
function hasLocation(location) {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  if (user.role === 'ADMINISTRATOR') {
    return true;
  }

  return user.locations.includes(location);
}

/**
 * Must Change Password
 */
function mustChangePassword() {
  const user = getCurrentUser();

  return user?.mustChangePassword === true;
}

/**
 * Update User Session
 */
function updateCurrentUser(user) {
  if (!user) {
    return;
  }

  if (localStorage.getItem(USER_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  if (sessionStorage.getItem(USER_KEY)) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/**
 * Clear Session
 */
function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

/**
 * Logout
 */
async function logout() {
  try {
    if (isLoggedIn()) {
      await apiPost('/auth/logout');
    }
  } catch (error) {
    console.warn('Logout request failed.', error);
  } finally {
    clearSession();

    window.location.replace('login.html');
  }
}

/**
 * Protect Application Pages
 */
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.replace('login.html');
    return;
  }

  if (mustChangePassword() && !window.location.pathname.endsWith('change-password.html')) {
    window.location.replace('change-password.html');
  }
}

/**
 * Redirect Logged-in Users Away From Login Page
 */
function redirectIfLoggedIn() {
  if (!isLoggedIn()) {
    return;
  }

  if (mustChangePassword()) {
    window.location.replace('change-password.html');
  } else {
    window.location.replace('index.html');
  }
}

/**
 * Format User Role
 */
function formatRole(role) {
  switch (role) {
    case 'ADMINISTRATOR':
      return 'System Administrator';

    case 'MANAGER':
      return 'Manager';

    case 'ENGINEER':
      return 'Engineer';

    default:
      return role;
  }
}

/**
 * Populate User Menu
 */
function loadCurrentUser() {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  const nameElement = document.getElementById('currentUserName');
  const roleElement = document.getElementById('currentUserRole');
  const avatarElement = document.getElementById('currentUserAvatar');

  if (nameElement) {
    nameElement.textContent = user.fullName;
  }

  if (roleElement) {
    roleElement.textContent = formatRole(user.role);
  }

  if (avatarElement) {
    avatarElement.textContent = user.fullName.charAt(0).toUpperCase();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCurrentUser();

  document.getElementById('logoutButton')?.addEventListener('click', logout);
});
