document.getElementById('loginForm').addEventListener('submit', login);

async function login(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();

  const password = document.getElementById('password').value;

  const rememberMe = document.getElementById('rememberMe').checked;

  const error = document.getElementById('loginError');

  error.classList.add('d-none');

  try {
    const response = await apiPost('/auth/login', {
      email,

      password,
    });

    saveSession(response.data, rememberMe);

    window.location = 'index.html';
  } catch (err) {
    error.textContent = err.message;

    error.classList.remove('d-none');
  }
}
