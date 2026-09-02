// Must be logged in
requireLogin();

const form = document.getElementById('changePasswordForm');

const currentPassword = document.getElementById('currentPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');

const errorBox = document.getElementById('passwordError');

const button = document.getElementById('btnUpdatePassword');

// Password Rule Elements
const ruleLength = document.getElementById('rule-length');
const ruleUpper = document.getElementById('rule-upper');
const ruleLower = document.getElementById('rule-lower');
const ruleNumber = document.getElementById('rule-number');
const ruleSpecial = document.getElementById('rule-special');

// Toggle Password Visibility
document.querySelectorAll('.toggle-password').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    const icon = btn.querySelector('i');

    if (input.type === 'password') {
      input.type = 'text';

      icon.classList.remove('bi-eye');
      icon.classList.add('bi-eye-slash');
    } else {
      input.type = 'password';

      icon.classList.remove('bi-eye-slash');
      icon.classList.add('bi-eye');
    }
  });
});

// Live Password Validation
newPassword.addEventListener('input', validatePassword);

function validatePassword() {
  const password = newPassword.value;

  toggleRule(ruleLength, password.length >= 8);

  toggleRule(ruleUpper, /[A-Z]/.test(password));

  toggleRule(ruleLower, /[a-z]/.test(password));

  toggleRule(ruleNumber, /\d/.test(password));

  toggleRule(ruleSpecial, /[^A-Za-z0-9]/.test(password));
}

function toggleRule(element, valid) {
  if (valid) {
    element.classList.add('valid');
  } else {
    element.classList.remove('valid');
  }
}

function passwordIsValid(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function showError(message) {
  errorBox.textContent = message;

  errorBox.classList.remove('d-none');
}

function hideError() {
  errorBox.classList.add('d-none');

  errorBox.textContent = '';
}

function setLoading(loading) {
  button.disabled = loading;

  if (loading) {
    button.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2"></span>
      Updating Password...
    `;
  } else {
    button.innerHTML = `
      <i class="bi bi-key-fill me-2"></i>
      Update Password
    `;
  }
}

form.addEventListener('submit', changePassword);

async function changePassword(e) {
  e.preventDefault();

  hideError();

  const current = currentPassword.value;

  const password = newPassword.value;

  const confirm = confirmPassword.value;

  if (!passwordIsValid(password)) {
    showError('Please choose a stronger password.');

    return;
  }

  if (password !== confirm) {
    showError('Passwords do not match.');

    return;
  }

  setLoading(true);

  try {
    await apiPost('/auth/change-password', {
      currentPassword: current,
      newPassword: password,
    });

    clearSession();

    alert('Password updated successfully.\n\nPlease login using your new password.');

    window.location.replace('login.html');
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}
