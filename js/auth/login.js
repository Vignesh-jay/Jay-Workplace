// Already logged in?
if (isLoggedIn()) {
  const user = getCurrentUser();

  if (user?.mustChangePassword) {
    window.location.replace('change-password.html');
  } else {
    window.location.replace('index.html');
  }
}

const form = document.getElementById('loginForm');
const loginButton = document.getElementById('btnLogin');
const errorAlert = document.getElementById('loginError');

const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('btnTogglePassword');
const passwordIcon = document.getElementById('passwordIcon');

passwordToggle.addEventListener('click', togglePassword);

form.addEventListener('submit', login);

function togglePassword() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';

    passwordIcon.classList.remove('bi-eye');
    passwordIcon.classList.add('bi-eye-slash');
  } else {
    passwordInput.type = 'password';

    passwordIcon.classList.remove('bi-eye-slash');
    passwordIcon.classList.add('bi-eye');
  }
}

async function login(e) {
  e.preventDefault();

  hideError();

  setLoading(true);

  try {
    const response = await apiPost('/auth/login', {
      email: document.getElementById('email').value.trim(),
      password: passwordInput.value,
    });

    const rememberMe = document.getElementById('rememberMe').checked;

    saveSession(response.data, rememberMe);

    if (response.data.user.mustChangePassword) {
      window.location.replace('change-password.html');
      return;
    }

    window.location.replace('index.html');
  } catch (error) {
    showError(error.message || 'Login failed.');
  } finally {
    setLoading(false);
  }
}

function setLoading(loading) {
  loginButton.disabled = loading;

  if (loading) {
    loginButton.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2"></span>
      Signing In...
    `;
  } else {
    loginButton.innerHTML = `
      <i class="bi bi-box-arrow-in-right me-2"></i>
      Sign In
    `;
  }
}

function showError(message) {
  errorAlert.textContent = message;

  errorAlert.classList.remove('d-none');
}

function hideError() {
  errorAlert.classList.add('d-none');

  errorAlert.textContent = '';
}
