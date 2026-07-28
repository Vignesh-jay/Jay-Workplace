let credentialsModal;

function showCredentialsModal({
  title,
  description = 'The user account has been created successfully.',
  icon = 'bi-check-circle-fill',
  iconClass = 'text-success',
  email,
  password,
}) {
  if (!credentialsModal) {
    credentialsModal = new bootstrap.Modal(document.getElementById('userCredentialsModal'));
  }

  document.getElementById('credentialModalHeading').innerText = title;

  document.getElementById('credentialModalDescription').innerText = description;

  const iconElement = document.getElementById('credentialModalIcon');

  iconElement.className = `bi ${icon} me-2 ${iconClass}`;

  document.getElementById('credentialPortal').value = window.location.origin;

  document.getElementById('credentialEmail').value = email;

  document.getElementById('credentialPassword').value = password;

  credentialsModal.show();
}

async function copyCredentials() {
  const credentials = `Jay Workplace Account Credentials

Portal:
${document.getElementById('credentialPortal').value}

Email:
${document.getElementById('credentialEmail').value}

Temporary Password:
${document.getElementById('credentialPassword').value}

Please change your password after your first login.`;

  await navigator.clipboard.writeText(credentials);

  const button = document.getElementById('btnCopyCredentials');

  button.innerHTML = `
    <i class="bi bi-check-lg"></i>
    Copied
  `;

  button.classList.replace('btn-primary', 'btn-success');

  setTimeout(() => {
    button.innerHTML = `
      <i class="bi bi-clipboard"></i>
      Copy Credentials
    `;

    button.classList.replace('btn-success', 'btn-primary');
  }, 2000);
}
