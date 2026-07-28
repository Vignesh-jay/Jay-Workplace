async function loadPermissionTab() {
  const response = await getUserPermissionsApi(currentUser.id);

  const userPermissions = response.data;

  const container = document.getElementById('permissionContainer');

  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">User Permissions</h5>

        <button
            class="btn btn-primary btn-sm"
            onclick="savePermissions()">

            Save Permissions

        </button>
    </div>
  `;

  PERMISSION_GROUPS.forEach((group) => {
    let html = `
      <div class="card shadow-sm mb-3">

        <div class="card-header fw-bold bg-light">

          ${group.title}

        </div>

        <div class="card-body">
    `;

    group.permissions.forEach((permission) => {
      html += `
        <div class="form-check mb-2">

          <input
            class="form-check-input permission-checkbox"
            type="checkbox"
            id="${permission.key}"
            value="${permission.key}"
            ${userPermissions.includes(permission.key) ? 'checked' : ''}>

          <label
            class="form-check-label"
            for="${permission.key}">

            ${permission.label}

          </label>

        </div>
      `;
    });

    html += `
        </div>

      </div>
    `;

    container.innerHTML += html;
  });
}

async function savePermissions() {
  const permissions = [];

  document.querySelectorAll('.permission-checkbox').forEach((checkbox) => {
    if (checkbox.checked) {
      permissions.push(checkbox.value);
    }
  });

  await updateUserPermissionsApi(currentUser.id, permissions);

  alert('Permissions updated successfully.');

  loadPermissionTab();
}

function showUserTab(tabName) {
  document.querySelectorAll('.user-tab').forEach((tab) => {
    tab.classList.add('d-none');
  });

  document.querySelectorAll('.user-tab-button').forEach((button) => {
    button.classList.remove('active');
  });

  document.getElementById(`${tabName}-tab`).classList.remove('d-none');

  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  switch (tabName) {
    case 'permissions':
      loadPermissionTab();
      break;

    case 'locations':
      loadUserLocations();
      break;

    case 'activity':
      loadUserActivity();
      break;
  }
}
