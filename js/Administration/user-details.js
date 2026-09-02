let currentUser = null;
let originalUser = null;

async function openUser(userId) {
  const response = await getUserApi(userId);

  const user = response.data;

  currentUser = user;
  originalUser = {
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  document.getElementById('drawerUserName').innerText = user.fullName;

  document.getElementById('drawerUserRole').innerText = user.role;

  document.getElementById('userDrawer').classList.add('open');

  document.getElementById('drawerBackdrop').classList.add('show');
  document.getElementById('userFullName').value = user.fullName;

  document.getElementById('userEmail').value = user.email;

  document.getElementById('userRole').value = user.role;

  document.getElementById('userStatus').value = user.status;

  document.getElementById('userLastLogin').value = user.lastLogin || 'Never';

  document.getElementById('userEmployee').value = user.employee
    ? `${user.employee.employeeId} - ${user.employee.firstName} ${user.employee.lastName}`
    : '-';

  document.getElementById('userDepartment').value = user.employee?.department || '-';

  document.getElementById('userDesignation').value = user.employee?.designation || '-';

  const btn = document.getElementById('btnEnableDisable');

  if (user.status === 'ACTIVE') {
    btn.innerText = 'Disable';

    btn.className = 'btn btn-warning';

    btn.onclick = async () => {
      await disableUserApi(user.id);

      openUser(user.id);

      loadUsers();
    };
  } else {
    btn.innerText = 'Enable';

    btn.className = 'btn btn-success';

    btn.onclick = async () => {
      await enableUserApi(user.id);

      openUser(user.id);

      loadUsers();
    };
  }

  const deleteBtn = document.getElementById('btnDeleteUser');

  if (user.status === 'DISABLED') {
    deleteBtn.classList.remove('d-none');
  } else {
    deleteBtn.classList.add('d-none');
  }

  document.getElementById('userFullName').oninput = monitorGeneralChanges;

  document.getElementById('userEmail').oninput = monitorGeneralChanges;

  document.getElementById('userRole').onchange = monitorGeneralChanges;

  showUserTab('general');
}

function closeUserDrawer() {
  document.getElementById('userDrawer').classList.remove('open');

  document.getElementById('drawerBackdrop').classList.remove('show');
}

async function showUserTab(tabName) {
  document.querySelectorAll('.user-tab').forEach((tab) => {
    tab.classList.add('d-none');
  });

  document.querySelectorAll('.user-tab-button').forEach((btn) => {
    btn.classList.remove('active');
  });

  document.getElementById(`${tabName}-tab`).classList.remove('d-none');

  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  switch (tabName) {
    case 'permissions':
      await loadPermissions();
      break;

    case 'locations':
      await loadUserLocations();
      break;

    case 'activity':
      await loadUserActivity();
      break;
  }
}

async function resetPassword() {
  if (!confirm("Reset this user's password?")) {
    return;
  }

  try {
    const result = await resetPasswordApi(currentUser.id);

    showCredentialsModal({
      title: 'Password Reset Successfully',
      description: 'The temporary password has been reset successfully.',
      icon: 'bi-key-fill',
      iconClass: 'text-warning',
      email: currentUser.email,
      password: result.data.temporaryPassword,
    });

    await loadUserActivity();
  } catch (err) {
    console.error(err);

    alert(err.message || 'Failed to reset password.');
  }
}

async function unlockUser() {
  await unlockUserApi(currentUser.id);

  alert('Account unlocked.');
}

async function deleteUser() {
  if (!confirm(`Delete ${currentUser.fullName}?`)) {
    return;
  }

  try {
    await deleteUserApi(currentUser.id);

    closeUserDrawer();

    await loadUsers();

    alert('User deleted successfully.');
  } catch (err) {
    alert(err.message);
  }
}

async function loadUserActivity() {
  const response = await getUserActivityApi(currentUser.id);

  const activities = response.data;

  const container = document.getElementById('userActivityContainer');

  if (!activities.length) {
    container.innerHTML = `
            <div class="p-4 text-center text-muted">
                No activity found.
            </div>
        `;
    return;
  }

  container.innerHTML = activities
    .map(
      (activity) => `
<div class="border-bottom p-3">

    <div class="fw-semibold">

        ${activity.action}

    </div>

    <div class="text-muted small">

        ${activity.description}

    </div>

    <div class="text-muted small mt-1">

        ${activity.module} • ${new Date(activity.timestamp).toLocaleString()}

    </div>

</div>
`
    )
    .join('');
}

function monitorGeneralChanges() {
  const changed =
    document.getElementById('userFullName').value !== originalUser.fullName ||
    document.getElementById('userEmail').value !== originalUser.email ||
    document.getElementById('userRole').value !== originalUser.role;

  document.getElementById('btnSaveGeneral').disabled = !changed;
}

async function saveGeneralChanges() {
  const roleChanged = document.getElementById('userRole').value !== originalUser.role;

  if (roleChanged) {
    const confirmed = confirm(
      `Changing the user's role will reset their permissions to the default ${document.getElementById('userRole').value} permissions.\n\nContinue?`
    );

    if (!confirmed) {
      document.getElementById('userRole').value = originalUser.role;
      monitorGeneralChanges();
      return;
    }
  }

  await updateUserApi(currentUser.id, {
    fullName: document.getElementById('userFullName').value,
    email: document.getElementById('userEmail').value,
    role: document.getElementById('userRole').value,
  });

  await loadUsers();
  await openUser(currentUser.id);
}
