let createUserModal;

const PORTAL_URL = window.location.origin;

async function openCreateUserModal() {
  if (!createUserModal) {
    createUserModal = new bootstrap.Modal(document.getElementById('createUserModal'));
  }

  // Clear fields
  document.getElementById('createUserEmployee').innerHTML = '';
  document.getElementById('createUserEmail').value = '';
  document.getElementById('createUserName').value = '';
  document.getElementById('createUserRole').value = 'ENGINEER';
  document.getElementById('createUserLocations').innerHTML = '';

  // Load employees
  const employees = await getEmployeesApi();

  const employeeSelect = document.getElementById('createUserEmployee');

  employeeSelect.innerHTML = '<option value="">-- Select Employee --</option>';

  employees.forEach((employee) => {
    employeeSelect.innerHTML += `
      <option
        value="${employee.id}"
        data-name="${employee.firstName} ${employee.lastName}"
        data-email="${employee.email}">
        ${employee.employeeId} - ${employee.firstName} ${employee.lastName}
      </option>
    `;
  });

  // Autofill Name & Email
  employeeSelect.onchange = function () {
    const option = this.selectedOptions[0];

    document.getElementById('createUserName').value = option.dataset.name || '';

    document.getElementById('createUserEmail').value = option.dataset.email || '';
  };

  // Load Locations
  const locations = await getLocations();

  const container = document.getElementById('createUserLocations');

  locations.forEach((location) => {
    container.innerHTML += `
      <div class="form-check">
        <input
          class="form-check-input create-location"
          type="checkbox"
          value="${location.id}"
          id="loc${location.id}">

        <label
          class="form-check-label"
          for="loc${location.id}">
          ${location.name}
        </label>
      </div>
    `;
  });

  createUserModal.show();
}

async function createUser() {
  const locationIds = [];

  document.querySelectorAll('.create-location:checked').forEach((checkbox) => {
    locationIds.push(Number(checkbox.value));
  });

  const payload = {
    employeeId: Number(document.getElementById('createUserEmployee').value),
    fullName: document.getElementById('createUserName').value,
    email: document.getElementById('createUserEmail').value,
    role: document.getElementById('createUserRole').value,
    status: 'ACTIVE',
    locationIds,
  };

  const response = await createUserApi(payload);

  createUserModal.hide();

  await loadUsers();

  showCredentialsModal({
    title: 'User Created Successfully',
    description: 'The user account has been created successfully.',
    email: response.data.user.email,
    password: response.data.temporaryPassword,
  });
}

async function copyCredentials() {
  const text = `Jay Workplace Account Credentials

Portal:
${document.getElementById('credentialPortal').value}

Email:
${document.getElementById('credentialEmail').value}

Temporary Password:
${document.getElementById('credentialPassword').value}

Please change your password after your first login.`;

  await navigator.clipboard.writeText(text);

  alert('Credentials copied to clipboard.');
}
