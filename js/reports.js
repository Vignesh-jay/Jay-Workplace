// ======================================
// JΛY Workplace - Reports
// ======================================

let reportAssets = [];

let filteredReportAssets = [];

let reportEmployees = [];

let filteredReportEmployees = [];

let reportAssignments = [];

let filteredReportAssignments = [];

let reportActivities = [];

let filteredReportActivities = [];

async function loadReports() {
  setActiveMenu('nav-reports');

  document.getElementById('content').innerHTML = `
    <div class="page-header mb-4">
        <h2 class="fw-bold mb-1">
            Reports
        </h2>

        <p class="text-muted">
            Business intelligence and reporting for your workplace.
        </p>
    </div>

    <div id="reportKPIs"></div>

    <div class="mt-4" id="reportsNavigation"></div>

    <div class="mt-4" id="reportsContent"></div>
  `;

  renderReportKPIs([]);

  loadReportsNavigation();

  await loadAssetsReport();
}

function renderReportKPIs(cards) {
  document.getElementById('reportKPIs').innerHTML = `

        <div class="row g-3 mb-4">

            ${cards
              .map(
                (card) => `

                <div class="col">

                    <div class="card dashboard-card h-100">

                        <div class="card-body">

                            <div class="text-muted small">

                                ${card.title}

                            </div>

                            <h2>

                                ${card.value}

                            </h2>

                            <i class="fas ${card.icon} fa-2x ${card.color}"></i>

                        </div>

                    </div>

                </div>

            `
              )
              .join('')}

        </div>

    `;
}

function loadReportsNavigation() {
  document.getElementById('reportsNavigation').innerHTML = `
    <div class="report-nav nav nav-pills">

      <button
          id="report-assets"
          class="nav-link active"
          onclick="loadAssetsReport()">

          <i class="fas fa-laptop"></i>

          Assets

      </button>

      <button
          class="nav-link"
          id="report-employees"
          onclick="loadEmployeesReport()">

          <i class="fas fa-users"></i>

          Employees

      </button>

      <button
          class="nav-link"
          id="report-assignments"
          onclick="loadAssignmentsReport()">

          <i class="fas fa-user-check"></i>

          Assignments

      </button>

      <button
          class="nav-link"
          id="report-warranty"
          onclick="loadWarrantyReport()">

          <i class="fas fa-shield-alt"></i>

          Warranty

      </button>

      <button
          class="nav-link"
          id="report-activity"
          onclick="loadActivityReport()">

          <i class="fas fa-history"></i>

          Activity

      </button>

  </div>

  `;
}

function setActiveReport(report) {
  document
    .querySelectorAll('#reportsNavigation .nav-link')
    .forEach((btn) => btn.classList.remove('active'));

  document.getElementById(`report-${report}`).classList.add('active');
}

async function loadAssetsReport() {
  setActiveReport('assets');

  const assets = await getAssetsApi();
  const statuses = await getAssetStatuses('active');

  const assignments = await getAssignmentsApi();

  const assigned = assignments.filter((a) => a.status === 'Assigned').length;

  const available = assets.filter((a) => a.status === 'Available').length;

  const transferred = assets.filter((a) => a.status === 'Transferred').length;

  const warranty = assets.filter((asset) => {
    if (!asset.warrantyExpiry) return false;

    const days = Math.ceil((new Date(asset.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24));

    return days >= 0 && days <= 30;
  }).length;

  renderReportKPIs([
    {
      title: 'Assets',
      value: assets.length,
      icon: 'fa-laptop',
      color: 'text-primary',
    },

    {
      title: 'Assigned',
      value: assigned,
      icon: 'fa-user-check',
      color: 'text-success',
    },

    {
      title: 'Available',
      value: available,
      icon: 'fa-box-open',
      color: 'text-info',
    },

    {
      title: 'Transferred',
      value: transferred,
      icon: 'fa-right-left',
      color: 'text-secondary',
    },

    {
      title: 'Warranty',
      value: warranty,
      icon: 'fa-shield-alt',
      color: 'text-warning',
    },
  ]);

  document.getElementById('reportsContent').innerHTML = `

    <div class="card border-0 shadow-sm mt-4">

        <div class="card-header bg-white d-flex justify-content-between align-items-center">

            <div>

                <h5 class="mb-1">

                    Asset Inventory Report

                </h5>

                <small class="text-muted">

                    Complete inventory of company assets

                </small>

            </div>

            <div class="dropdown">

            <button
                class="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown">

                <i class="fas fa-download me-2"></i>

                Export Report

            </button>

            <ul class="dropdown-menu dropdown-menu-end">

                <li>
                    <a
                        class="dropdown-item"
                        href="#"
                        onclick="exportAssetsCSV()">

                        <i class="fas fa-file-csv me-2 text-success"></i>

                        CSV

                    </a>
                </li>

                <li>
                    <a
                        class="dropdown-item"
                        href="#"
                        onclick="exportAssetsExcel()">

                        <i class="fas fa-file-excel me-2 text-success"></i>

                        Excel

                    </a>
                </li>

                <li>
                    <a
                        class="dropdown-item"
                        href="#"
                        onclick="exportAssetsPDF()">

                        <i class="fas fa-file-pdf me-2 text-danger"></i>

                        PDF

                    </a>
                </li>

            </ul>

        </div>

        </div>


        <div class="card-body">

            <div class="row g-3 mb-4">

                <div class="col-lg-4">

                    <input
                        class="form-control"
                        placeholder="Search asset..."
                        id="assetSearch"
                        oninput="filterAssetReport()">

                </div>

                <div class="col-lg-2">

                    <select class="form-select"
                        id="assetCategoryFilter"
                        onchange="filterAssetReport()">

                        <option>All Categories</option>

                    </select>

                </div>

                <div class="col-lg-2">

                    <select
                        class="form-select"
                        id="assetStatusFilter"
                        onchange="filterAssetReport()">

                        <option value="">All Status</option>
                        <option value="Assigned">Assigned</option>
                        ${statuses
                          .map(
                            (status) => `
                            <option value="${status.name}">
                                ${status.name}
                            </option>
        `
                          )
                          .join('')}

                    </select>

                </div>

                <div class="col-lg-2">

                    <select class="form-select"
                        id="assetLocationFilter"
                        onchange="filterAssetReport()">

                        <option>All Locations</option>

                    </select>

                </div>
                <div class="col-lg-2">
                <button
                    class="btn btn-outline-secondary"
                    onclick="resetAssetReportFilters()">

                    Reset

                </button>
                </div>

              </div>

            </div>

          </div>

            <div class="table-responsive">

                <table class="table table-hover align-middle">

                  <thead>

                      <tr>

                          <th style="width:30%">Asset</th>

                          <th>Assigned To</th>

                          <th>Location</th>

                          <th>Status</th>

                          <th>Warranty</th>

                          <th></th>

                      </tr>

                  </thead>

                  <tbody id="assetReportBody">

                  </tbody>

              </table>

            </div>

        </div>

    </div>

    `;

  reportAssets = assets;
  filteredReportAssets = assets;

  populateReportFilters(reportAssets);

  await renderAssetReportTable(reportAssets);
}

async function loadEmployeesReport() {
  setActiveReport('employees');

  const [employees, departments, locations, assignments] = await Promise.all([
    getEmployeesApi(),
    getDepartments('active'),
    getLocations('active'),
    getAssignmentsApi(),
  ]);

  const activeEmployees = employees.filter((e) => e.status === 'Active').length;

  const inactiveEmployees = employees.filter((e) => e.status === 'Inactive').length;

  const departmentsCount = new Set(employees.map((e) => e.department)).size;

  const assignedAssets = assignments.filter((a) => a.status === 'Assigned').length;

  renderEmployeesReport(employees, departments, locations, assignments, {
    activeEmployees,
    inactiveEmployees,
    departmentsCount,
    assignedAssets,
  });

  renderReportKPIs([
    {
      title: 'Employees',
      value: employees.length,
      icon: 'fa-users',
      color: 'text-primary',
    },

    {
      title: 'Active',
      value: activeEmployees,
      icon: 'fa-user-check',
      color: 'text-success',
    },

    {
      title: 'Inactive',
      value: inactiveEmployees,
      icon: 'fa-user-slash',
      color: 'text-secondary',
    },

    {
      title: 'Departments',
      value: departmentsCount,
      icon: 'fa-building',
      color: 'text-info',
    },

    {
      title: 'Assigned Assets',
      value: assignedAssets,
      icon: 'fa-laptop',
      color: 'text-warning',
    },
  ]);

  reportEmployees = employees;

  filteredReportEmployees = employees;

  renderEmployeeReportTable(filteredReportEmployees, assignments);
}

async function loadAssignmentsReport() {
  setActiveReport('assignments');

  const [assignments, assets, employees, departments] = await Promise.all([
    getAssignmentsApi(),
    getAssetsApi(),
    getEmployeesApi(),
    getDepartments('active'),
  ]);

  reportAssignments = assignments;
  filteredReportAssignments = assignments;

  const activeAssignments = assignments.filter((a) => a.status === 'Assigned').length;

  const returnedAssignments = assignments.filter((a) => a.status === 'Returned').length;

  const uniqueEmployees = new Set(assignments.map((a) => a.employeeId)).size;

  renderReportKPIs([
    {
      title: 'Assignments',
      value: assignments.length,
      icon: 'fa-solid fa-handshake',
      color: 'primary',
    },
    {
      title: 'Active',
      value: activeAssignments,
      icon: 'fa-solid fa-laptop',
      color: 'success',
    },
    {
      title: 'Returned',
      value: returnedAssignments,
      icon: 'fa-solid fa-rotate-left',
      color: 'warning',
    },
    {
      title: 'Employees',
      value: uniqueEmployees,
      icon: 'fa-solid fa-users',
      color: 'info',
    },
  ]);

  renderAssignmentsReport(assignments, assets, employees, departments);

  renderAssignmentsTable(filteredReportAssignments);
}

async function loadWarrantyReport() {
  setActiveReport('warranty');

  const assets = await getAssetsApi();

  reportAssets = assets;

  filteredReportAssets = assets;

  const today = new Date();

  const underWarranty = assets.filter((asset) => {
    if (!asset.warrantyExpiry) return false;

    const days = Math.ceil((new Date(asset.warrantyExpiry) - today) / (1000 * 60 * 60 * 24));

    return days > 30;
  }).length;

  const expiringSoon = assets.filter((asset) => {
    if (!asset.warrantyExpiry) return false;

    const days = Math.ceil((new Date(asset.warrantyExpiry) - today) / (1000 * 60 * 60 * 24));

    return days >= 0 && days <= 30;
  }).length;

  const expired = assets.filter((asset) => {
    if (!asset.warrantyExpiry) return false;

    return new Date(asset.warrantyExpiry) < today;
  }).length;

  const noWarranty = assets.filter((asset) => !asset.warrantyExpiry).length;

  renderReportKPIs([
    {
      title: 'Assets',
      value: assets.length,
      icon: 'fa-laptop',
      color: 'text-primary',
    },

    {
      title: 'Under Warranty',
      value: underWarranty,
      icon: 'fa-shield-alt',
      color: 'text-success',
    },

    {
      title: 'Expiring Soon',
      value: expiringSoon,
      icon: 'fa-triangle-exclamation',
      color: 'text-warning',
    },

    {
      title: 'Expired',
      value: expired,
      icon: 'fa-calendar-xmark',
      color: 'text-danger',
    },

    {
      title: 'No Warranty',
      value: noWarranty,
      icon: 'fa-ban',
      color: 'text-secondary',
    },
  ]);

  renderWarrantyReport(assets);

  renderWarrantyTable(filteredReportAssets);
}

async function loadActivityReport() {
  setActiveReport('activity');

  const activities = await getAuditLogsApi();

  reportActivities = activities;

  filteredReportActivities = activities;

  const today = new Date().toDateString();

  const created = activities.filter((activity) => activity.action === 'Created').length;

  const updated = activities.filter((activity) => activity.action === 'Updated').length;

  const deleted = activities.filter((activity) => activity.action === 'Deleted').length;

  const todayActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.createdAt || activity.date).toDateString();

    return activityDate === today;
  }).length;

  renderReportKPIs([
    {
      title: 'Activities',
      value: activities.length,
      icon: 'fa-clipboard-list',
      color: 'text-primary',
    },

    {
      title: 'Created',
      value: created,
      icon: 'fa-plus-circle',
      color: 'text-success',
    },

    {
      title: 'Updated',
      value: updated,
      icon: 'fa-pen',
      color: 'text-warning',
    },

    {
      title: 'Deleted',
      value: deleted,
      icon: 'fa-trash',
      color: 'text-danger',
    },

    {
      title: 'Today',
      value: todayActivities,
      icon: 'fa-calendar-day',
      color: 'text-info',
    },
  ]);

  renderActivityReport(activities);

  renderActivityTable(filteredReportActivities);
}

async function renderAssetReportTable(assets) {
  const assignments = await getAssignmentsApi();

  document.getElementById('assetReportBody').innerHTML = assets
    .map((asset) => {
      const currentAssignment = assignments.find(
        (a) => a.assetId === asset.id && a.status === 'Assigned'
      );

      const holder = currentAssignment
        ? `${currentAssignment.employee.firstName} ${currentAssignment.employee.lastName}`
        : 'In Inventory';

      let statusBadge = '';

      switch (asset.status) {
        case 'Assigned':
          statusBadge = `
      <span class="badge bg-primary">
        Assigned
      </span>
    `;
          break;

        case 'Available':
          statusBadge = `
      <span class="badge bg-success">
        Available
      </span>
    `;
          break;

        case 'Transferred':
          statusBadge = `
      <span class="badge bg-secondary">
        Transferred
      </span>
    `;
          break;

        case 'Repair':
          statusBadge = `
      <span class="badge bg-warning text-dark">
        Repair
      </span>
    `;
          break;

        case 'Retired':
          statusBadge = `
      <span class="badge bg-dark">
        Retired
      </span>
    `;
          break;

        default:
          statusBadge = `
      <span class="badge bg-light text-dark">
        ${asset.status}
      </span>
    `;
      }

      let warrantyBadge = '-';

      if (asset.warrantyExpiry) {
        const days = Math.ceil(
          (new Date(asset.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24)
        );

        if (days < 0) {
          warrantyBadge = `
            <span class="badge bg-danger">
                Expired
            </span>
        `;
        } else if (days <= 30) {
          warrantyBadge = `
            <span class="badge bg-warning text-dark">
                ${days} Days
            </span>
        `;
        } else {
          warrantyBadge = `
            <span class="badge bg-info">
                ${days} Days
            </span>
        `;
        }
      }

      return `
                <tr>

                    <td>
                        <div class="d-flex align-items-center">

                            <div class="asset-icon me-3">
                                <i class="${getAssetIcon(asset.category)}"></i>
                            </div>

                            <div>

                                <div class="fw-semibold">
                                    ${asset.name}
                                </div>

                                <small class="text-muted">
                                    ${asset.assetId}
                                </small>

                                <br>

                                <small class="text-muted">
                                    ${asset.category}
                                </small>

                            </div>

                        </div>
                    </td>

                    <td>

                        ${
                          currentAssignment
                            ? `
                                    <div>

                                        <i class="fas fa-user text-primary me-1"></i>

                                        ${holder}

                                    </div>
                                `
                            : `
                                    <span class="text-muted">

                                        <i class="fas fa-box me-1"></i>

                                        In Inventory

                                    </span>
                                `
                        }

                    </td>

                    <td>${asset.location}</td>

                    <td>${statusBadge}</td>

                    <td>${warrantyBadge}</td>

                    <td><button
                          class="btn btn-sm btn-outline-primary"
                          onclick="viewAsset(${asset.id})">

                          <i class="fas fa-eye"></i>

                        </button>
                    </td>

                </tr>
            `;
    })
    .join('');
}

function renderEmployeeReportTable(employees, assignments) {
  document.getElementById('employeeReportTable').innerHTML = `

        <div class="table-responsive">

            <table class="table table-hover align-middle">

                <thead>

                    <tr>

                        <th style="width:30%">Employee</th>

                        <th>Department</th>

                        <th>Designation</th>

                        <th>Assets</th>

                        <th>Status</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody id="employeeReportBody">

                </tbody>

            </table>

        </div>

    `;

  renderEmployeeRows(employees, assignments);
}

function getStatusBadge(status) {
  switch (status) {
    case 'Assigned':
      return `
                <span class="badge bg-primary">
                    Assigned
                </span>
            `;

    case 'Returned':
      return `
                <span class="badge bg-success">
                    Returned
                </span>
            `;

    case 'Pending':
      return `
                <span class="badge bg-warning text-dark">
                    Pending
                </span>
            `;

    case 'Cancelled':
      return `
                <span class="badge bg-danger">
                    Cancelled
                </span>
            `;

    default:
      return `
                <span class="badge bg-secondary">
                    ${status || '-'}
                </span>
            `;
  }
}

function renderAssignmentsTable(filteredReportAssignments) {
  const tbody = document.getElementById('assignmentsReportTableBody');

  if (!filteredReportAssignments.length) {
    tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    No assignments found.
                </td>
            </tr>
        `;

    return;
  }

  tbody.innerHTML = filteredReportAssignments
    .map((assignment) => {
      const employeeName = assignment.employee
        ? `${assignment.employee.firstName} ${assignment.employee.lastName}`
        : '-';

      const assetName = assignment.asset ? assignment.asset.name : '-';

      const assetId = assignment.asset ? assignment.asset.assetId : '-';

      const assignedDate = assignment.assignedDate ? formatDateTime(assignment.assignedDate) : '-';

      const returnedDate = assignment.returnedDate ? formatDateTime(assignment.returnedDate) : '-';

      return `

                <tr>

                    <td>

                        <div class="fw-semibold">

                            ${assetName}

                        </div>

                        <small class="text-muted">

                            ${assetId}

                        </small>

                    </td>

                    <td>

                        ${employeeName}

                    </td>

                    <td>

                        ${assignedDate}

                    </td>

                    <td>

                        ${returnedDate}

                    </td>

                    <td>

                        ${getStatusBadge(assignment.status)}

                    </td>

                    <td class="text-end">

                        <button
                            class="btn btn-sm btn-outline-primary"
                            onclick="viewAssignment('${assignment.id}')">

                            <i class="fas fa-eye"></i>

                        </button>

                    </td>

                </tr>

            `;
    })
    .join('');
}

function renderWarrantyTable(assets) {
  const tbody = document.getElementById('warrantyReportBody');

  if (!assets.length) {
    tbody.innerHTML = `

            <tr>

                <td colspan="7" class="text-center text-muted py-4">

                    No assets found.

                </td>

            </tr>

        `;

    return;
  }

  const today = new Date();

  tbody.innerHTML = assets
    .map((asset) => {
      let warrantyExpiry = '-';

      let daysLeft = '-';

      let statusBadge = '';

      if (!asset.warrantyExpiry) {
        statusBadge = `
                <span class="badge bg-secondary">

                    No Warranty

                </span>
            `;
      } else {
        const expiryDate = new Date(asset.warrantyExpiry);

        warrantyExpiry = formatDateTime(asset.warrantyExpiry);

        const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
          daysLeft = 'Expired';

          statusBadge = `
                    <span class="badge bg-danger">

                        Expired

                    </span>
                `;
        } else if (diffDays <= 30) {
          daysLeft = `${diffDays} Days`;

          statusBadge = `
                    <span class="badge bg-warning text-dark">

                        Expiring Soon

                    </span>
                `;
        } else {
          daysLeft = `${diffDays} Days`;

          statusBadge = `
                    <span class="badge bg-success">

                        Under Warranty

                    </span>
                `;
        }
      }

      return `

            <tr>

                <td>

                    <div class="d-flex align-items-center">

                        <div class="asset-icon me-3">

                            <i class="${getAssetIcon(asset.category)}"></i>

                        </div>

                        <div>

                            <div class="fw-semibold">

                                ${asset.name}

                            </div>

                            <small class="text-muted">

                                ${asset.assetId}

                            </small>

                        </div>

                    </div>

                </td>

                <td>

                    ${asset.category || '-'}

                </td>

                <td>

                    ${asset.purchaseDate ? formatDateTime(asset.purchaseDate) : '-'}

                </td>

                <td>

                    ${warrantyExpiry}

                </td>

                <td>

                    ${daysLeft}

                </td>

                <td>

                    ${statusBadge}

                </td>

                <td class="text-end">

                    <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="viewAsset(${asset.id})">

                        <i class="fas fa-eye"></i>

                    </button>

                </td>

            </tr>

        `;
    })
    .join('');
}

function renderEmployeesReport(employees, departments, locations, assignments, stats) {
  document.getElementById('reportsContent').innerHTML = `

  <div class="card border-0 shadow-sm mt-4">

      <div class="card-header bg-white d-flex justify-content-between align-items-center">

          <div>

              <h5 class="mb-1">

                  Employee Report

              </h5>

              <small class="text-muted">

                  Complete employee directory

              </small>

          </div>

          <div class="dropdown">

              <button
                  class="btn btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown">

                  <i class="fas fa-download me-2"></i>

                  Export Report

              </button>

              <ul class="dropdown-menu dropdown-menu-end">

                  <li>

                      <a
                          class="dropdown-item"
                          href="#"
                          onclick="exportEmployeesCSV(); return false;">

                          <i class="fas fa-file-csv me-2 text-success"></i>

                          CSV

                      </a>

                  </li>

                  <li>

                      <a
                          class="dropdown-item"
                          href="#">

                          <i class="fas fa-file-excel me-2 text-success"></i>

                          Excel

                      </a>

                  </li>

                  <li>

                      <a
                          class="dropdown-item"
                          href="#">

                          <i class="fas fa-file-pdf me-2 text-danger"></i>

                          PDF

                      </a>

                  </li>

              </ul>

          </div>

      </div>

      <div class="card-body">

          <div class="row g-3 mb-4">

              <div class="col-lg-4">

                  <input
                      type="text"
                      class="form-control"
                      id="employeeSearch"
                      placeholder="Search employee..."
                      oninput="filterEmployeeReport()">

              </div>

              <div class="col-lg-2">

                  <select
                      class="form-select"
                      id="employeeDepartmentFilter"
                      onchange="filterEmployeeReport()">

                      <option value="">All Departments</option>

                      ${departments
                        .map(
                          (department) => `
                              <option value="${department.name}">
                                  ${department.name}
                              </option>
                          `
                        )
                        .join('')}

                  </select>

              </div>

              <div class="col-lg-2">

                  <select
                      class="form-select"
                      id="employeeStatusFilter"
                      onchange="filterEmployeeReport()">

                      <option value="">All Status</option>

                      <option value="Active">Active</option>

                      <option value="Inactive">Inactive</option>

                      <option value="On Leave">On Leave</option>

                      <option value="Retired">Retired</option>

                  </select>

              </div>

              <div class="col-lg-2">

                  <select
                      class="form-select"
                      id="employeeLocationFilter"
                      onchange="filterEmployeeReport()">

                      <option value="">All Locations</option>

                      ${locations
                        .map(
                          (location) => `
                              <option value="${location.name}">
                                  ${location.name}
                              </option>
                          `
                        )
                        .join('')}

                  </select>

              </div>

              <div class="col-lg-2">

                  <button
                      class="btn btn-outline-secondary w-100"
                      onclick="resetEmployeeReportFilters()">

                      <i class="fas fa-rotate-left me-2"></i>

                      Reset

                  </button>

              </div>

          </div>

          <div id="employeeReportTable">

          </div>

      </div>

  </div>

`;
}

function renderEmployeeRows(employees, assignments) {
  document.getElementById('employeeReportBody').innerHTML = employees
    .map((employee) => {
      const assignedAssets = assignments.filter(
        (a) => a.employeeId === employee.id && a.status === 'Assigned'
      ).length;

      return `

                <tr>

                    <td>

                        <div class="fw-semibold">

                            👤 ${employee.firstName} ${employee.lastName}

                        </div>

                        <small class="text-muted">

                            ${employee.employeeId}

                        </small>

                    </td>

                    <td>

                        ${employee.department || '-'}

                    </td>

                    <td>

                        ${employee.designation || '-'}

                    </td>

                    <td>

                        <span class="badge bg-primary px-3 py-2">

                            ${assignedAssets} Assets

                        </span>

                    </td>

                    <td>

                        <span class="badge bg-${
                          employee.status === 'Active' ? 'success' : 'secondary'
                        }">

                            ${employee.status}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-sm btn-outline-primary"
                            onclick="viewEmployee(${employee.id})">

                            <i class="fas fa-eye"></i>

                        </button>

                    </td>

                </tr>

            `;
    })
    .join('');
}

function renderAssignmentsReport(assignments, assets, employees, departments) {
  document.getElementById('reportsContent').innerHTML = `

    <div class="card border-0 shadow-sm mt-4">

        <div class="card-header bg-white d-flex justify-content-between align-items-center">

            <div>

                <h5 class="mb-1">

                    Assignment Report

                </h5>

                <small class="text-muted">

                    Complete asset assignment history

                </small>

            </div>

            <div class="dropdown">

                <button
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown">

                    <i class="fas fa-download me-2"></i>

                    Export Report

                </button>

                <ul class="dropdown-menu dropdown-menu-end">

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportAssignmentsCSV(); return false;">

                            <i class="fas fa-file-csv me-2 text-success"></i>

                            CSV

                        </a>

                    </li>

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportAssignmentsExcel(); return false;">

                            <i class="fas fa-file-excel me-2 text-success"></i>

                            Excel

                        </a>

                    </li>

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportAssignmentsPDF(); return false;">

                            <i class="fas fa-file-pdf me-2 text-danger"></i>

                            PDF

                        </a>

                    </li>

                </ul>

            </div>

        </div>

        <div class="card-body">

            <div class="row g-3 mb-4">

                <div class="col-lg-4">

                    <input
                        type="text"
                        class="form-control"
                        id="assignmentReportSearch"
                        placeholder="Search asset or employee..."
                        oninput="filterAssignmentsReport()">

                </div>

                <div class="col-lg-3">

                    <select
                        class="form-select"
                        id="assignmentReportDepartment"
                        onchange="filterAssignmentsReport()">

                        <option value="">All Departments</option>

                        ${departments
                          .map(
                            (department) => `

                            <option value="${department.name}">

                                ${department.name}

                            </option>

                        `
                          )
                          .join('')}

                    </select>

                </div>

                <div class="col-lg-3">

                    <select
                        class="form-select"
                        id="assignmentReportStatus"
                        onchange="filterAssignmentsReport()">

                        <option value="">All Status</option>

                        <option value="Assigned">

                            Assigned

                        </option>

                        <option value="Returned">

                            Returned

                        </option>

                    </select>

                </div>

                <div class="col-lg-2">

                    <button
                        class="btn btn-outline-secondary w-100"
                        onclick="resetAssignmentReportFilters()">

                        <i class="fas fa-rotate-left me-2"></i>

                        Reset

                    </button>

                </div>

            </div>

            <div class="table-responsive">

                <table class="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th style="width:30%">Asset</th>

                            <th>Employee</th>

                            <th>Assigned Date</th>

                            <th>Returned Date</th>

                            <th>Status</th>

                            <th class="text-end">Actions</th>

                        </tr>

                    </thead>

                    <tbody id="assignmentsReportTableBody">

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    `;
  renderAssignmentsTable(filteredReportAssignments);
}

function renderWarrantyReport(assets) {
  const categories = [...new Set(assets.map((asset) => asset.category).filter(Boolean))].sort();

  document.getElementById('reportsContent').innerHTML = `

    <div class="card border-0 shadow-sm mt-4">

        <div class="card-header bg-white d-flex justify-content-between align-items-center">

            <div>

                <h5 class="mb-1">

                    Warranty Report

                </h5>

                <small class="text-muted">

                    Monitor asset warranty coverage and expiry.

                </small>

            </div>

            <div class="dropdown">

                <button
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown">

                    <i class="fas fa-download me-2"></i>

                    Export Report

                </button>

                <ul class="dropdown-menu dropdown-menu-end">

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportWarrantyCSV(); return false;">

                            <i class="fas fa-file-csv me-2 text-success"></i>

                            CSV

                        </a>

                    </li>

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportWarrantyExcel(); return false;">

                            <i class="fas fa-file-excel me-2 text-success"></i>

                            Excel

                        </a>

                    </li>

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportWarrantyPDF(); return false;">

                            <i class="fas fa-file-pdf me-2 text-danger"></i>

                            PDF

                        </a>

                    </li>

                </ul>

            </div>

        </div>

        <div class="card-body">

            <div class="row g-3 mb-4">

                <div class="col-lg-4">

                    <input
                        type="text"
                        class="form-control"
                        id="warrantySearch"
                        placeholder="Search asset..."
                        oninput="filterWarrantyReport()">

                </div>

                <div class="col-lg-3">

                    <select
                        class="form-select"
                        id="warrantyCategoryFilter"
                        onchange="filterWarrantyReport()">

                        <option value="">

                            All Categories

                        </option>

                        ${categories
                          .map(
                            (category) => `

                            <option value="${category}">

                                ${category}

                            </option>

                        `
                          )
                          .join('')}

                    </select>

                </div>

                <div class="col-lg-3">

                    <select
                        class="form-select"
                        id="warrantyStatusFilter"
                        onchange="filterWarrantyReport()">

                        <option value="">

                            All Warranty Status

                        </option>

                        <option value="Under Warranty">

                            Under Warranty

                        </option>

                        <option value="Expiring Soon">

                            Expiring Soon

                        </option>

                        <option value="Expired">

                            Expired

                        </option>

                        <option value="No Warranty">

                            No Warranty

                        </option>

                    </select>

                </div>

                <div class="col-lg-2">

                    <button
                        class="btn btn-outline-secondary w-100"
                        onclick="resetWarrantyReportFilters()">

                        <i class="fas fa-rotate-left me-2"></i>

                        Reset

                    </button>

                </div>

            </div>

            <div class="table-responsive">

                <table class="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th style="width:28%">

                                Asset

                            </th>

                            <th>

                                Category

                            </th>

                            <th>

                                Purchase Date

                            </th>

                            <th>

                                Warranty Expiry

                            </th>

                            <th>

                                Days Left

                            </th>

                            <th>

                                Status

                            </th>

                            <th class="text-end">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody id="warrantyReportBody">

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    `;
}

function renderActivityReport(activities) {
  const modules = [
    ...new Set(activities.map((activity) => activity.module).filter(Boolean)),
  ].sort();

  const users = [...new Set(activities.map((activity) => activity.user).filter(Boolean))].sort();

  const actions = [
    ...new Set(activities.map((activity) => activity.action).filter(Boolean)),
  ].sort();

  document.getElementById('reportsContent').innerHTML = `

    <div class="card border-0 shadow-sm mt-4">

        <div class="card-header bg-white d-flex justify-content-between align-items-center">

            <div>

                <h5 class="mb-1">

                    Activity Report

                </h5>

                <small class="text-muted">

                    View and monitor all activities performed in the system.

                </small>

            </div>

            <div class="dropdown">

                <button
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown">

                    <i class="fas fa-download me-2"></i>

                    Export Report

                </button>

                <ul class="dropdown-menu dropdown-menu-end">

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportActivityCSV(); return false;">

                            <i class="fas fa-file-csv me-2 text-success"></i>

                            CSV

                        </a>

                    </li>

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportActivityExcel(); return false;">

                            <i class="fas fa-file-excel me-2 text-success"></i>

                            Excel

                        </a>

                    </li>

                    <li>

                        <a
                            class="dropdown-item"
                            href="#"
                            onclick="exportActivityPDF(); return false;">

                            <i class="fas fa-file-pdf me-2 text-danger"></i>

                            PDF

                        </a>

                    </li>

                </ul>

            </div>

        </div>

        <div class="card-body">

            <div class="row g-3 mb-4">

                <div class="col-lg-3">

                    <input
                        type="text"
                        class="form-control"
                        id="activitySearch"
                        placeholder="Search activity..."
                        oninput="filterActivityReport()">

                </div>

                <div class="col-lg-3">

                    <select
                        class="form-select"
                        id="activityModuleFilter"
                        onchange="filterActivityReport()">

                        <option value="">

                            All Modules

                        </option>

                        ${modules
                          .map(
                            (module) => `

                            <option value="${module}">

                                ${module}

                            </option>

                        `
                          )
                          .join('')}

                    </select>

                </div>

                <div class="col-lg-2">

                    <select
                        class="form-select"
                        id="activityActionFilter"
                        onchange="filterActivityReport()">

                        <option value="">

                            All Actions

                        </option>

                        ${actions
                          .map(
                            (action) => `

                            <option value="${action}">

                                ${action}

                            </option>

                        `
                          )
                          .join('')}

                    </select>

                </div>

                <div class="col-lg-2">

                    <select
                        class="form-select"
                        id="activityUserFilter"
                        onchange="filterActivityReport()">

                        <option value="">

                            All Users

                        </option>

                        ${users
                          .map(
                            (user) => `

                            <option value="${user}">

                                ${user}

                            </option>

                        `
                          )
                          .join('')}

                    </select>

                </div>

                <div class="col-lg-2">

                    <button
                        class="btn btn-outline-secondary w-100"
                        onclick="resetActivityReportFilters()">

                        <i class="fas fa-rotate-left me-2"></i>

                        Reset

                    </button>

                </div>

            </div>

            <div class="table-responsive">

                <table class="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th style="width:18%">

                                Date & Time

                            </th>

                            <th>

                                Module

                            </th>

                            <th>

                                Action

                            </th>

                            <th>

                                User

                            </th>

                            <th>

                                Description

                            </th>

                            <th class="text-end">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody id="activityReportBody">

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    `;
}

async function populateReportFilters(assets) {
  const categories = [...new Set(assets.map((a) => a.category))].sort();

  const locations = [...new Set(assets.map((a) => a.location))].sort();

  const statuses = await getAssetStatuses('active');

  document.getElementById('assetCategoryFilter').innerHTML = `
        <option value="">All Categories</option>
        ${categories.map((c) => `<option value="${c}">${c}</option>`).join('')}
    `;

  document.getElementById('assetLocationFilter').innerHTML = `
        <option value="">All Locations</option>
        ${locations.map((l) => `<option value="${l}">${l}</option>`).join('')}
    `;
}

async function filterAssetReport() {
  const search = document.getElementById('assetSearch').value.toLowerCase();

  const category = document.getElementById('assetCategoryFilter').value;

  const status = document.getElementById('assetStatusFilter').value;

  const location = document.getElementById('assetLocationFilter').value;

  let filtered = reportAssets.filter((asset) => {
    const matchSearch =
      asset.name.toLowerCase().includes(search) || asset.assetId.toLowerCase().includes(search);

    const matchCategory = !category || asset.category === category;

    const matchStatus = !status || asset.status === status;

    const matchLocation = !location || asset.location === location;

    return matchSearch && matchCategory && matchStatus && matchLocation;
  });

  filteredReportAssets = filtered;

  await renderAssetReportTable(filtered);
}

async function filterEmployeeReport() {
  const search = document.getElementById('employeeSearch').value.toLowerCase();

  const department = document.getElementById('employeeDepartmentFilter').value;

  const status = document.getElementById('employeeStatusFilter').value;

  const location = document.getElementById('employeeLocationFilter').value;

  let filtered = reportEmployees.filter((employee) => {
    const matchSearch =
      employee.firstName.toLowerCase().includes(search) ||
      employee.lastName.toLowerCase().includes(search) ||
      employee.employeeId.toLowerCase().includes(search);

    const matchDepartment = !department || employee.department === department;

    const matchStatus = !status || employee.status === status;

    const matchLocation = !location || employee.location === location;

    return matchSearch && matchDepartment && matchStatus && matchLocation;
  });

  filteredReportEmployees = filtered;

  renderEmployeeRows(filteredReportEmployees, await getAssignmentsApi());
}

function filterAssignmentsReport() {
  const search = document.getElementById('assignmentReportSearch').value.toLowerCase().trim();

  const status = document.getElementById('assignmentReportStatus').value;

  const department = document.getElementById('assignmentReportDepartment').value;

  filteredReportAssignments = reportAssignments.filter((assignment) => {
    const assetName = assignment.asset?.name?.toLowerCase() || '';

    const assetId = assignment.asset?.assetId?.toLowerCase() || '';

    const employeeName =
      `${assignment.employee?.firstName || ''} ${assignment.employee?.lastName || ''}`.toLowerCase();

    const employeeId = assignment.employee?.employeeId?.toLowerCase() || '';

    const assignmentStatus = assignment.status || '';

    const employeeDepartment = assignment.employee?.department || '';

    const matchesSearch =
      !search ||
      assetName.includes(search) ||
      assetId.includes(search) ||
      employeeName.includes(search) ||
      employeeId.includes(search);

    const matchesStatus = !status || assignmentStatus === status;

    const matchesDepartment = !department || employeeDepartment === department;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  renderAssignmentsTable(filteredReportAssignments);
}

function filterWarrantyReport() {
  const search = document.getElementById('warrantySearch').value.toLowerCase().trim();

  const category = document.getElementById('warrantyCategoryFilter').value;

  const status = document.getElementById('warrantyStatusFilter').value;

  const today = new Date();

  filteredReportAssets = reportAssets.filter((asset) => {
    const assetName = asset.name?.toLowerCase() || '';

    const assetId = asset.assetId?.toLowerCase() || '';

    const assetCategory = asset.category || '';

    let warrantyStatus = 'No Warranty';

    if (asset.warrantyExpiry) {
      const days = Math.ceil((new Date(asset.warrantyExpiry) - today) / (1000 * 60 * 60 * 24));

      if (days < 0) {
        warrantyStatus = 'Expired';
      } else if (days <= 30) {
        warrantyStatus = 'Expiring Soon';
      } else {
        warrantyStatus = 'Under Warranty';
      }
    }

    const matchesSearch = !search || assetName.includes(search) || assetId.includes(search);

    const matchesCategory = !category || assetCategory === category;

    const matchesStatus = !status || warrantyStatus === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  renderWarrantyTable(filteredReportAssets);
}

async function resetAssetReportFilters() {
  document.getElementById('assetSearch').value = '';

  document.getElementById('assetCategoryFilter').value = '';

  document.getElementById('assetStatusFilter').value = '';

  document.getElementById('assetLocationFilter').value = '';

  await renderAssetReportTable(reportAssets);
}

function resetEmployeeReportFilters() {
  document.getElementById('employeeSearch').value = '';

  document.getElementById('employeeDepartmentFilter').value = '';

  document.getElementById('employeeStatusFilter').value = '';

  document.getElementById('employeeLocationFilter').value = '';

  filteredReportEmployees = reportEmployees;

  getAssignmentsApi().then((assignments) => {
    renderEmployeeRows(
      filteredReportEmployees,

      assignments
    );
  });
}

function resetAssignmentReportFilters() {
  document.getElementById('assignmentReportSearch').value = '';

  document.getElementById('assignmentReportStatus').value = '';

  document.getElementById('assignmentReportDepartment').value = '';

  filteredReportAssignments = [...reportAssignments];

  renderAssignmentsTable(filteredReportAssignments);
}

function resetWarrantyReportFilters() {
  document.getElementById('warrantySearch').value = '';

  document.getElementById('warrantyCategoryFilter').value = '';

  document.getElementById('warrantyStatusFilter').value = '';

  filteredReportAssets = [...reportAssets];

  renderWarrantyTable(filteredReportAssets);
}

async function exportAssetsCSV() {
  const assignments = await getAssignmentsApi();

  const headers = [
    'Asset ID',
    'Asset Name',
    'Category',
    'Current Holder',
    'Location',
    'Status',
    'Warranty Expiry',
  ];

  const rows = filteredReportAssets.map((asset) => {
    const assignment = assignments.find((a) => a.assetId === asset.id && a.status === 'Assigned');

    const holder = assignment
      ? `${assignment.employee.firstName} ${assignment.employee.lastName}`
      : 'In Inventory';

    return [
      asset.assetId,

      asset.name,

      asset.category,

      holder,

      asset.location,

      asset.status,

      asset.warrantyExpiry ? formatDateTime(asset.warrantyExpiry) : '-',
    ];
  });

  exportReportCSV(
    `Assets_Report_${new Date().toISOString().slice(0, 10)}.csv`,

    'Asset Report',

    headers,

    rows
  );
}

async function exportEmployeesCSV() {
  const assignments = await getAssignmentsApi();

  const headers = [
    'Employee ID',
    'Employee Name',
    'Department',
    'Designation',
    'Location',
    'Assigned Assets',
    'Status',
  ];

  const rows = filteredReportEmployees.map((employee) => {
    const assignedAssets = assignments.filter(
      (assignment) => assignment.employeeId === employee.id && assignment.status === 'Assigned'
    ).length;

    return [
      employee.employeeId,

      `${employee.firstName} ${employee.lastName}`,

      employee.department || '-',

      employee.designation || '-',

      employee.location || '-',

      assignedAssets,

      employee.status,
    ];
  });

  exportReportCSV(
    `Employees_Report_${new Date().toISOString().slice(0, 10)}.csv`,

    'Employee Report',

    headers,

    rows
  );
}

async function exportAssignmentsCSV() {
  const headers = [
    'Asset ID',

    'Asset Name',

    'Employee',

    'Assigned Date',

    'Returned Date',

    'Status',
  ];

  const rows = filteredReportAssignments.map((a) => [
    a.asset.assetId,

    a.asset.name,

    `${a.employee.firstName} ${a.employee.lastName}`,

    formatDateTime(a.assignedDate),

    a.returnedDate ? formatDateTime(a.returnedDate) : '-',

    a.status,
  ]);

  exportReportCSV(
    `Assignments_Report_${new Date().toISOString().slice(0, 10)}.csv`,

    'Assignment Report',

    headers,

    rows
  );
}

async function exportWarrantyCSV() {
  const today = new Date();

  const headers = [
    'Asset ID',
    'Asset Name',
    'Category',
    'Purchase Date',
    'Warranty Expiry',
    'Days Left',
    'Warranty Status',
    'Location',
  ];

  const rows = filteredReportAssets.map((asset) => {
    let daysLeft = 'No Warranty';
    let warrantyStatus = 'No Warranty';
    let warrantyExpiry = '-';

    if (asset.warrantyExpiry) {
      const expiryDate = new Date(asset.warrantyExpiry);

      warrantyExpiry = formatDateTime(asset.warrantyExpiry);

      const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        daysLeft = 'Expired';
        warrantyStatus = 'Expired';
      } else if (diffDays <= 30) {
        daysLeft = `${diffDays} Days`;
        warrantyStatus = 'Expiring Soon';
      } else {
        daysLeft = `${diffDays} Days`;
        warrantyStatus = 'Under Warranty';
      }
    }

    return [
      asset.assetId,
      asset.name,
      asset.category || '-',
      asset.purchaseDate ? formatDateTime(asset.purchaseDate) : '-',
      warrantyExpiry,
      daysLeft,
      warrantyStatus,
      asset.location || '-',
    ];
  });

  exportReportCSV('Warranty_Report.csv', 'Warranty Report', headers, rows);
}

function exportReportCSV(filename, title, headers, rows) {
  const exportDate = new Date().toLocaleString('en-IN');

  const csvRows = [
    ['JAY Workplace'],
    [],
    [title],
    [],
    ['Generated On', exportDate],
    ['Total Records', rows.length],
    [],
    headers,
    ...rows,
  ];

  const csv = csvRows.map((row) => row.map((col) => `"${col ?? ''}"`).join(',')).join('\n');

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;

  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}
