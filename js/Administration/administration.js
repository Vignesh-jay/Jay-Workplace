let selectedBackup = null;

async function loadAdministration() {
  setActiveMenu('nav-administration');
  const employees = await getEmployeesApi();
  const activities = await getActivitiesApi();
  const departments = await getDepartments();
  const locations = await getLocations();
  const assetStatuses = await getAssetStatuses();

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Administration</h2>
        <p class="text-muted">
            Manage system configuration and settings.
        </p>
    </div>

</div>

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-3 mb-4">

    <div class="col">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">
                        Employees
                    </div>

                    <h2>${employees.length}</h2>

                </div>

                <i class="fas fa-users fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">
                        Departments
                    </div>

                    <h2>${departments.length}</h2>

                </div>

                <i class="fas fa-building fa-2x text-success"></i>

            </div>

        </div>

    </div>

    <div class="col">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">
                        Locations
                    </div>

                    <h2>${locations.length}</h2>

                </div>

                <i class="fas fa-map-marker-alt fa-2x text-danger"></i>

            </div>

        </div>

    </div>

    <div class="col">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">
                        Transfers
                    </div>

                    <h2>${getAssetTransfers().length}</h2>

                </div>

                <i class="fas fa-exchange-alt fa-2x text-info"></i>

            </div>

        </div>

    </div>

    <div class="col">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">
                        Version
                    </div>

                    <h2>1.1</h2>

                </div>

                <i class="fas fa-code-branch fa-2x text-secondary"></i>

            </div>

        </div>

    </div>

</div>

<h5 class="fw-bold mb-3">

    Management Center

</h5>

<div class="row g-4 mb-4">

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-primary-subtle text-primary">

                <i class="fas fa-building"></i>

            </div>

            <h6>

                Departments

            </h6>

            <p class="text-muted">

                Manage organizational departments.

            </p>

            <button
                class="btn btn-primary w-100"
                onclick="loadDepartments()">

                Manage

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-success-subtle text-success">

                <i class="fas fa-map-marker-alt"></i>

            </div>

            <h6>

                Locations

            </h6>

            <p class="text-muted">

                Manage office locations.

            </p>

            <button
                class="btn btn-success w-100"
                onclick="loadLocations()">

                Manage

            </button>

        </div>

    </div>
    <div class="col-md-4">

    <div class="export-card">

        <div class="export-icon bg-info-subtle text-info">

            <i class="fas fa-tags"></i>

        </div>

        <h6>

            Asset Statuses

        </h6>

        <p class="text-muted">

            Manage available asset statuses.

        </p>

        <button
            class="btn btn-info w-100"
            onclick="loadAssetStatuses()">

            Manage

        </button>

    </div>

</div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-secondary-subtle text-secondary">

                <i class="fas fa-user-shield"></i>

            </div>

            <h6>

                Roles & Permissions

            </h6>

            <p class="text-muted">

                User roles and permissions.

            </p>

            <button
                class="btn btn-secondary w-100" onclick="loadUsers()">

                Manage

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-info-subtle text-info">

                <i class="fas fa-cogs"></i>

            </div>

            <h6>

                System Settings

            </h6>

            <p class="text-muted">

                Configure application preferences.

            </p>

            <button
                class="btn btn-info w-100"
                disabled>

                Coming Soon

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-danger-subtle text-danger">

                <i class="fas fa-database"></i>

            </div>

            <h6>

                Data Management

            </h6>

            <p class="text-muted">

                Backup and restore application data.

            </p>

            <button
                class="btn btn-danger w-100"
                onclick="loadDataManagement()">
                Open

            </button>

        </div>

    </div>

</div>
</div>

`;
}

async function loadDataManagement() {
  setActiveMenu('nav-administration');

  const employees = await getEmployeesApi();
  const activities = await getActivitiesApi();

  document.getElementById('content').innerHTML = `
    <div class="page-header">
      <div>
        <h2 class="fw-bold mb-1">
          Data Management
        </h2>
        <p class="text-muted">
          Import, export, backup and maintain Jay Workplace data.
        </p>
      </div>
    </div>

    <!-- System Overview -->

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">

      <div class="col">
        <div class="dashboard-card card h-100">
          <div class="card-body">
            <div>
              <div class="text-muted small">Employees</div>
              <h3>${employees.length}</h3>
            </div>
            <i class="fas fa-users fa-2x text-primary"></i>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="dashboard-card card h-100">
          <div class="card-body">
            <div>
              <div class="text-muted small">Activities</div>
              <h3>${activities.length}</h3>
            </div>
            <i class="fas fa-history fa-2x text-success"></i>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="dashboard-card card h-100">
          <div class="card-body">
            <div>
              <div class="text-muted small">Version</div>
              <h3>2.0</h3>
            </div>
            <i class="fas fa-code-branch fa-2x text-secondary"></i>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="dashboard-card card h-100">
          <div class="card-body">
            <div>
              <div class="text-muted small">Database</div>
              <h3>SQLite</h3>
            </div>
            <i class="fas fa-database fa-2x text-danger"></i>
          </div>
        </div>
      </div>

    </div>

    <!-- Import Export -->

    <div class="row g-4 mb-4">

      <div class="col-lg-6">
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="fas fa-file-import me-2"></i>
              Import Data
            </h5>
          </div>

          <div class="card-body">

            <button class="btn btn-primary w-100 mb-2" disabled>
              Import Employees
            </button>

            <button class="btn btn-primary w-100" disabled>
              Import Assets
            </button>

          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="fas fa-file-export me-2"></i>
              Export Data
            </h5>
          </div>

          <div class="card-body">

            <button class="btn btn-success w-100 mb-2" disabled>
              Export Employees
            </button>

            <button class="btn btn-success w-100 mb-2" disabled>
              Export Assets
            </button>

            <button class="btn btn-success w-100" disabled>
              Export Assignments
            </button>

          </div>
        </div>
      </div>

    </div>

    <!-- Backup Restore -->

    <div class="row g-4 mb-4">

      <div class="col-lg-6">
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="fas fa-download me-2"></i>
              Backup
            </h5>
          </div>

          <div class="card-body">

            <button
                class="btn btn-primary w-100"
                onclick="createBackup()">
                Create Backup
            </button>

          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="mb-0">
              <i class="fas fa-upload me-2"></i>
              Restore
            </h5>
          </div>

          <div class="card-body">

            <input
                type="file"
                id="restoreFile"
                accept=".json"
                class="form-control mb-3"
                onchange="previewBackupFile()"
            >

            <div
                id="backupPreview"
                class="alert alert-info d-none">
            </div>

            <button
                id="restoreButton"
                class="btn btn-warning w-100"
                onclick="restoreBackup()"
                disabled>
                Restore Backup
            </button>

          </div>
        </div>
      </div>

    </div>

    <!-- Danger Zone -->

    <div class="card border-danger">

      <div class="card-header bg-danger text-white">
        <h5 class="mb-0">
          <i class="fas fa-exclamation-triangle me-2"></i>
          Danger Zone
        </h5>
      </div>

      <div class="card-body">

        <p class="text-muted">
          Destructive administrative actions.
        </p>

        <button
            class="btn btn-danger"
            onclick="resetSystem()"
            >
            Reset System
        </button>

      </div>

    </div>
  `;
}

async function createBackup() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/backup');

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download = `jay-workplace-backup-${Date.now()}.json`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

    alert('Backup downloaded successfully');
  } catch (error) {
    console.error(error);

    alert('Failed to create backup');
  }
}

async function previewBackupFile() {
  const file = document.getElementById('restoreFile').files[0];

  if (!file) return;

  try {
    const text = await file.text();

    const backup = JSON.parse(text);

    if (!backup.metadata || !backup.metadata.version) {
      throw new Error('Invalid backup file');
    }

    selectedBackup = backup;

    document.getElementById('backupPreview').classList.remove('d-none');

    document.getElementById('backupPreview').innerHTML = `
                <strong>Backup Information</strong>
                <hr>

                Version:
                ${backup.metadata.version}
                <br>

                Created:
                ${new Date(backup.metadata.createdAt).toLocaleString()}
                <br>

                Employees:
                ${backup.employees?.length || 0}
                <br>

                Assets:
                ${backup.assets?.length || 0}
                <br>

                Assignments:
                ${backup.assignments?.length || 0}
                <br>

                Users:
                ${backup.users?.length || 0}
            `;

    document.getElementById('restoreButton').disabled = false;
  } catch (error) {
    selectedBackup = null;

    document.getElementById('restoreButton').disabled = true;

    alert('Invalid backup file');

    console.error(error);
  }
}

async function restoreBackup() {
  const file = document.getElementById('restoreFile').files[0];

  if (!file) return;

  const confirmed = confirm('Current database will be overwritten.\n\nContinue?');

  if (!confirmed) return;

  try {
    const formData = new FormData();

    formData.append('backup', file);

    const response = await fetch('http://localhost:3000/api/admin/restore', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!result.success) throw new Error(result.message);

    alert('Backup validation successful.');

    console.log(result);
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
}

async function resetSystem() {
  const phrase = prompt('Type RESET SYSTEM to continue');

  if (phrase !== 'RESET SYSTEM') {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/admin/reset', {
      method: 'POST',
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    alert(result.message);

    location.reload();
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
}
