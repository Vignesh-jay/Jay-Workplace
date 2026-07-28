const TOKEN_KEY = 'jw_token';
const USER_KEY = 'jw_user';

function saveSession(loginData, rememberMe = false) {
  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(TOKEN_KEY, loginData.token);

  storage.setItem(USER_KEY, JSON.stringify(loginData.user));
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function hasPermission(permission) {
  const user = getCurrentUser();

  if (!user) return false;

  return user.permissions.includes(permission);
}

function hasLocation(location) {
  const user = getCurrentUser();

  if (!user) return false;

  if (user.role === 'ADMINISTRATOR') return true;

  return user.locations.includes(location);
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

function logout() {
  clearSession();

  window.location = 'login.html';
}
