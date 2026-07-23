async function loadDashboard() {
  const employees = await getEmployeesApi();
  const assets = await getAssetsApi();
  const departments = await getDepartments();
  const expiringAssets = await getExpiringAssets(30);
  const locations = await getLocations();

  if (
    employees.length === 0 &&
    assets.length === 0 &&
    departments.length === 0 &&
    locations.length === 0
  ) {
    loadFirstRunScreen();
    return;
  }

  const expiringWarranty = await getExpiringAssets(30);

  const employeeList = employees;
  const assetList = assets;

  const assignments = await getAssignmentsApi();

  const assignedAssets = assignments.filter((a) => a.status === 'Assigned').length;

  const activeAssignedAssetIds = assignments
    .filter((a) => a.status === 'Assigned')
    .map((a) => a.assetId);

  const availableAssets = assetList.filter(
    (asset) => asset.status === 'Available' && !activeAssignedAssetIds.includes(asset.id)
  ).length;

  const retiredAssets = assetList.filter((a) => a.status === 'Retired').length;

  const transferredAssets = assetList.filter((a) => a.status === 'Transferred').length;

  const activities = await getActivitiesApi();

  setActiveMenu('nav-dashboard');

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">

            Dashboard

        </h2>

        <p class="text-muted">

            Overview of your workplace assets and workforce.

        </p>

    </div>

</div>

<!-- KPI Cards -->

<div class="row g-4">

    <div class="col-md-3">

        <div class="card-custom stat-card active">

            <div class="stat-value">

                <small>Total Employees</small>

                <h2>${employeeList.length}</h2>

            </div>

            <i class="fas fa-users stat-icon text-primary"></i>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card-custom stat-card">

            <div class="stat-value">

                <small>Total Assets</small>

                <h2>${assetList.length}</h2>

            </div>

            <i class="fas fa-laptop stat-icon text-primary"></i>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card-custom stat-card">

            <div class="stat-value">

                <small>Assigned</small>

                <h2>${assignedAssets}</h2>

            </div>

            <i class="fas fa-user-check stat-icon text-success"></i>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card-custom stat-card">

            <div class="stat-value">

                <small>Available</small>

                <h2>${availableAssets}</h2>

            </div>

            <i class="fas fa-box-open stat-icon text-info"></i>

        </div>

    </div>

</div>

<!-- Charts -->

<div class="row g-4 mt-1">

    <div class="col-lg-6">

        <div class="card-custom chart-card">

            <h5 class="mb-4">
                Department Distribution
            </h5>

            <div class="chart-wrapper">

                <canvas id="deptChart"></canvas>

            </div>

        </div>

    </div>

    <div class="col-lg-6">

        <div class="card-custom chart-card">

            <h5 class="mb-4">
                Asset Categories
            </h5>

            <div class="chart-wrapper">

                <canvas id="assetChart"></canvas>

            </div>
        </div>

    </div>

</div>

<!-- Recent Activities + Quick Actions -->

<div class="row g-4 mt-1">

    <div class="col-lg-8">
        <div class="card-custom">
            <h5>Recent Activities</h5>

            <div class="timeline">
                ${activities
                  .slice(0, 10)

                  .map(
                    (item) => `

                    <div class="timeline-item">

                        <div class="timeline-dot"></div>

                        <div class="timeline-content">

                            <strong>
                                ${item.description}
                            </strong>

                            <br>

                            <small class="text-muted">

                                ${item.module}
                                •
                                ${item.performedBy}

                            </small>

                            <br>

                            <small class="text-muted">

                                ${formatDateTime(item.timestamp)}

                            </small>

                        </div>

                    </div>

                    `
                  )
                  .join('')}
            </div>

        </div>
    </div>
    <div class="col-lg-4">

        <div class="card-custom chart-card">

            <h5>
                ⚠ Warranty Expiring Soon
            </h5>

            ${
              expiringAssets
                .map((asset) => {
                  const daysLeft = Math.ceil(
                    (new Date(asset.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24)
                  );

                  let badgeClass;

                  if (daysLeft < 0) {
                    badgeClass = 'bg-danger';
                  } else if (daysLeft <= 30) {
                    badgeClass = 'bg-orange';
                  } else if (daysLeft <= 60) {
                    badgeClass = 'bg-warning text-dark';
                  } else if (daysLeft <= 90) {
                    badgeClass = 'bg-info';
                  } else {
                    badgeClass = 'bg-success';
                  }

                  return `

                    <div class="mb-3">

                        <strong>
                            ${asset.name} - ${asset.serialNumber || '-'}
                        </strong>

                        <br>

                        <span class="badge ${badgeClass}">

                            ${daysLeft}
                            Days Remaining

                        </span>

                    </div>

                `;
                })
                .join('') ||
              `<p class="text-muted">
                    No upcoming expiries.
                </p>`
            }

        </div>
    </div>
</div>

`;
  await renderCharts(employeeList);
}

function loadWelcomeDashboard() {
  document.getElementById('content').innerHTML = `

    <div class="card-custom chart-card text-center p-5">

        <h1 class="mb-3">
            Welcome to Jay Workplace 👋
        </h1>

        <p class="text-muted mb-4">
            Your Asset & Workforce Management Platform
        </p>

        <div class="row g-4 mt-2">

            <div class="col-md-3">
                <div class="card border-0 shadow-sm p-3">
                    <h5>1️⃣ Locations</h5>
                    <p class="small text-muted">
                        Create office locations.
                    </p>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-0 shadow-sm p-3">
                    <h5>2️⃣ Departments</h5>
                    <p class="small text-muted">
                        Create departments.
                    </p>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-0 shadow-sm p-3">
                    <h5>3️⃣ Employees</h5>
                    <p class="small text-muted">
                        Add workforce records.
                    </p>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card border-0 shadow-sm p-3">
                    <h5>4️⃣ Assets</h5>
                    <p class="small text-muted">
                        Register company assets.
                    </p>
                </div>
            </div>

        </div>

        <div class="mt-5">

            <button
                class="btn btn-primary me-2"
                onclick="loadAdministration()">

                Setup Locations & Departments

            </button>

            <button
                class="btn btn-success"
                onclick="loadWorkforce()">

                Add Employees

            </button>

        </div>

    </div>

    `;
}

function loadFirstRunScreen() {
  document.getElementById('content').innerHTML = `

    <div class="card-custom chart-card text-center p-5">

        <h1>
            Welcome to Jay Workplace 👋
        </h1>

        <p class="text-muted mb-5">

            Setup a new workplace or restore
            an existing backup.

        </p>

        <div class="row">

            <div class="col-md-6">

                <div class="card h-100 p-4">

                    <h4>
                        📥 Import Existing Data
                    </h4>

                    <p class="text-muted">

                        Restore employees,
                        assets, assignments,
                        locations and history.

                    </p>

                    <input
                        type="file"
                        id="startupRestoreFile"
                        class="form-control">

                    <button
                        class="btn btn-success mt-3"
                        onclick="startupRestoreBackup()">

                        Import Backup

                    </button>

                </div>

            </div>

            <div class="col-md-6">

                <div class="card h-100 p-4">

                    <h4>
                        ✨ Start New
                    </h4>

                    <p class="text-muted">

                        Create locations,
                        departments,
                        employees and assets.

                    </p>

                    <button
                        class="btn btn-primary mt-4"
                        onclick="loadWelcomeDashboard();">

                        Start New Setup

                    </button>

                </div>

            </div>

        </div>

    </div>

    `;
}

async function renderCharts(employees) {
  const departmentCounts = {};

  employees.forEach((emp) => {
    departmentCounts[emp.department] = (departmentCounts[emp.department] || 0) + 1;
  });

  const deptLabels = Object.keys(departmentCounts);

  const deptData = Object.values(departmentCounts);

  const deptCtx = document.getElementById('deptChart');

  new Chart(deptCtx, {
    type: 'doughnut',

    data: {
      labels: deptLabels,

      datasets: [
        {
          data: deptData,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });

  const assetCtx = document.getElementById('assetChart');

  const assets = await getAssetsApi();

  const laptops = assets.filter((a) => a.category === 'Laptop').length;

  const desktops = assets.filter((a) => a.category === 'Desktop').length;

  const mobiles = assets.filter((a) => a.category === 'Mobile').length;

  const monitors = assets.filter((a) => a.category === 'Monitor').length;

  new Chart(assetCtx, {
    type: 'bar',

    data: {
      labels: ['Laptop', 'Desktop', 'Mobile', 'Monitor'],

      datasets: [
        {
          label: 'Assets',

          data: [laptops, desktops, mobiles, monitors],
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
}

function startupRestoreBackup() {
  document.getElementById('restoreFile')?.remove();

  const file = document.getElementById('startupRestoreFile').files[0];

  if (!file) {
    alert('Select a backup file');

    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const backup = JSON.parse(e.target.result);

      saveEmployees(backup.employees || []);

      saveAssets(backup.assets || []);

      saveAssignments(backup.assignments || []);

      saveActivities(backup.activities || []);

      saveDepartments(backup.departments || []);

      saveLocations(backup.locations || []);

      saveAuditLogs(backup.auditLogs || []);

      saveAssetTransfers(backup.assetTransfers || []);

      saveAssetHistory(backup.assetHistory || []);

      saveEmployeeHistory(backup.employeeHistory || []);

      saveAssignmentHistory(backup.assignmentHistory || []);

      alert('Backup restored successfully');

      location.reload();
    } catch (error) {
      alert('Invalid backup file');
    }
  };

  reader.readAsText(file);
}
