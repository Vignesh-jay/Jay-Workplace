async function loadWorkforce() {
  const employeeList = await getEmployeesApi();

  const raw = await fetch('http://localhost:3000/employees');
  const json = await raw.json();

  const totalEmployees = employeeList.length;

  const activeEmployees = employeeList.filter((e) => e.status === 'Active').length;

  const inactiveEmployees = employeeList.filter((e) => e.status === 'Inactive').length;

  const departments = [...new Set(employeeList.map((e) => e.department))].length;

  const locations = await getLocations('active');

  setActiveMenu('nav-workforce');

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Workforce</h2>
        <p class="text-muted">
            Manage employees and workforce information.
        </p>
    </div>

</div>

<div class="row g-3 mb-4">

    <div class="col-lg-3 col-md-6">

        <div class="card dashboard-card active">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Total Employees
                    </small>

                    <h2>${totalEmployees}</h2>

                </div>

                <i class="fas fa-users fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-3 col-md-6">

        <div class="card dashboard-card">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Active
                    </small>

                    <h2>${activeEmployees}</h2>

                </div>

                <i class="fas fa-user-check fa-2x text-success"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-3 col-md-6">

        <div class="card dashboard-card">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Inactive
                    </small>

                    <h2>${inactiveEmployees}</h2>

                </div>

                <i class="fas fa-user-clock fa-2x text-warning"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-3 col-md-6">

        <div class="card dashboard-card">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Departments
                    </small>

                    <h2>${departments}</h2>

                </div>

                <i class="fas fa-building fa-2x text-info"></i>

            </div>

        </div>

    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar">

        <input
            type="text"
            class="form-control search-input"
            placeholder="Search employee..."
            id="employeeSearch"
            onkeyup="filterEmployees()"
        >

        <select
            id="locationFilter"
            class="form-select"
            onchange="filterEmployees()">

            <option value="">
                All Locations
            </option>

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

        <button
            class="btn btn-primary"
            onclick="showAddEmployeeModal()">

            <i class="fas fa-plus"></i>

            Add Employee

        </button>

    </div>

    <table class="table align-middle mt-4">

        <thead>
        <tr>
            <th style="width:35%">Employee</th>

            <th>Department</th>

            <th>Location</th>

            <th>Status</th>

            <th style="width:130px">Actions</th>
        </tr>
    </thead>

        <tbody>

            ${employeeList
              .map(
                (emp) => `

            <tr>

                <td>

                    <div class="d-flex align-items-center gap-3">

                        <div class="avatar">

                            ${emp.firstName.charAt(0)}${emp.lastName.charAt(0)}

                        </div>

                        <div>

                            <div class="asset-name">

                                ${emp.firstName} ${emp.lastName}

                            </div>

                            <div class="asset-meta">

                                ${emp.employeeId}

                                •

                                ${emp.designation}

                            </div>

                        </div>

                    </div>

                </td>

                <td>${emp.department}</td>

                <td>${emp.location || '-'}</td>

                <td>
                    ${
                      emp.status === 'Active'
                        ? `<span class="badge bg-success">Active</span>`
                        : emp.status === 'Inactive'
                          ? `<span class="badge bg-warning text-dark">Inactive</span>`
                          : `<span class="badge bg-secondary">${emp.status}</span>`
                    }
                </td>
                <td class="text-nowrap">

                    <button
                        class="btn btn-light btn-sm asset-action-btn"
                        title="View"
                        onclick="viewEmployee(${emp.id})">

                        <i class="fas fa-eye"></i>

                    </button>

                    <button
                        class="btn btn-light btn-sm asset-action-btn"
                        title="Edit"
                        onclick="editEmployee(${emp.id})">

                        <i class="fas fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-light btn-sm asset-action-btn text-danger"
                        title="Delete"
                        onclick="deleteEmployeeUI(${emp.id})">

                        <i class="fas fa-trash"></i>

                    </button>

                </td>

            </tr>

            `
              )
              .join('')}

        </tbody>

    </table>

</div>

`;
}

async function showAddEmployeeModal() {
  const locations = await getLocations('active');

  const departments = await getDepartments('active');

  const modalHtml = `
    <div class="modal fade"
         id="addEmployeeModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

    <div class="modal-header">

        <h5 class="modal-title">
            Add Employee
        </h5>

        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal">
        </button>

    </div>

    <div class="modal-body">
        <div class="text-muted small mb-3">
            Fields marked with
            <span class="text-danger">*</span>
            are required.
        </div>
        <div class="row g-3">

            <div class="col-md-6">

                <label class="form-label">
                    Employee ID
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeId"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Email Address
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeEmail"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    First Name
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeFirstName"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Last Name
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeLastName"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Department
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeDepartment"
                    class="form-select">

                    ${departments
                      .map(
                        (dep) => `
                        <option value="${dep.name}">
                            ${dep.name}
                        </option>
                        `
                      )
                      .join('')}

                </select>

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Designation
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeDesignation"
                    class="form-control">

            </div>
            <div class="col-md-6">
                <label class="form-label">
                    Phone Number
                </label>

                <input
                    type="tel"
                    class="form-control"
                    id="employeePhone"
                    placeholder="+91 9876543210">
            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Manager
                </label>

                <input
                    id="employeeManager"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Location
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeLocation"
                    class="form-select">

                    <option value="">
                        Select Location
                    </option>

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

            <div class="col-md-6">

                <label class="form-label">
                    Date of Joining
                    <span class="text-danger">*</span>
                </label>

                <input
                    type="date"
                    id="employeeJoiningDate"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Date of Leaving (if Applicable)
                </label>

                <input
                    type="date"
                    id="employeeLeavingDate"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Employment Type
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeType"
                    class="form-select">

                    <option>Full Time</option>
                    <option>Contract</option>
                    <option>Intern</option>

                </select>

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Status
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeStatus"
                    class="form-select">

                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Resigned</option>

                </select>

            </div>

        </div>

    </div>

                <div class="modal-footer">

                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <button
                        class="btn btn-primary"
                        onclick="saveEmployee()">
                        Save Employee
                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('addEmployeeModal')).show();
}

async function saveEmployee() {
  const employee = {
    employeeId: document.getElementById('employeeId').value.trim(),

    firstName: document.getElementById('employeeFirstName').value.trim(),

    lastName: document.getElementById('employeeLastName').value.trim(),

    email: document.getElementById('employeeEmail').value.trim(),

    department: document.getElementById('employeeDepartment').value,

    designation: document.getElementById('employeeDesignation').value.trim(),

    phone: document.getElementById('employeePhone').value.trim(),

    manager: document.getElementById('employeeManager').value.trim(),

    joiningDate: document.getElementById('employeeJoiningDate').value,

    leavingDate: document.getElementById('employeeLeavingDate').value,

    location: document.getElementById('employeeLocation').value,

    employmentType: document.getElementById('employeeType').value,

    status: document.getElementById('employeeStatus').value,
  };

  if (
    !employee.employeeId ||
    !employee.department ||
    !employee.designation ||
    !employee.status ||
    !employee.email ||
    !employee.department ||
    !employee.joiningDate ||
    !employee.employmentType ||
    !employee.location ||
    !employee.firstName ||
    !employee.lastName
  ) {
    alert('Please fill all Required fields');

    return;
  }

  const existingEmployees = await getEmployeesApi();

  const employeeExists = existingEmployees.some((emp) => emp.employeeId === employee.employeeId);

  if (employeeExists) {
    alert(`Employee ID ${employee.employeeId} already exists`);

    return;
  }

  try {
    const createdEmployee = await createEmployeeApi(employee);

    await addEmployeeHistoryApi(createdEmployee.id, 'Created', 'Employee onboarded');

    await addActivityApi(`Employee ${employee.firstName} ${employee.lastName} created`);

    alert(`Employee ${employee.firstName} ${employee.lastName} added successfully`);

    bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal')).hide();

    await loadWorkforce();
  } catch (error) {
    alert(error.message);
  }
}

async function deleteEmployeeUI(employeeId) {
  const assignedAssets = getAssignments().filter(
    (a) => a.employeeId === employeeId && a.status === 'Assigned'
  );

  if (assignedAssets.length > 0) {
    alert(
      `Cannot delete employee.\n\nOutstanding Assets:\n\n${assignedAssets
        .map((a) => a.assetName)
        .join('\n')}`
    );

    return;
  }

  if (!confirm('Delete this employee?')) {
    return;
  }

  await deleteEmployeeApi(employeeId);

  await addEmployeeHistoryApi(employeeId, 'Deleted', 'Employee removed');

  await addActivityApi(`Employee with ID ${employeeId} deleted`);

  await loadWorkforce();
}

function filterEmployees() {
  const searchText = document.getElementById('employeeSearch').value.toLowerCase();

  const selectedLocation = document.getElementById('locationFilter').value;

  const rows = document.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    const rowText = row.innerText.toLowerCase();

    const locationCell = row.children[2]?.innerText || '';

    const matchesSearch = rowText.includes(searchText);

    const matchesLocation = !selectedLocation || locationCell === selectedLocation;

    row.style.display = matchesSearch && matchesLocation ? '' : 'none';
  });
}

async function editEmployee(employeeId) {
  const existingModal = document.getElementById('editEmployeeModal');

  if (existingModal) {
    existingModal.remove();
  }
  const employees = await getEmployeesApi();

  const employee = employees.find((e) => e.id === employeeId);

  if (!employee) {
    return;
  }

  const locations = await getLocations('active');
  const departments = await getDepartments('active');
  const modalHtml = `

    <div class="modal fade"
         id="editEmployeeModal"
         tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">
                        Edit Employee
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>

                <div class="modal-body">

                    <input
                        type="hidden"
                        id="editEmployeeId"
                        value="${employee.id}">

                    <div class="row g-3">

                        <div class="col-md-6">
                            <label>First Name</label>
                            <input
                                id="editEmployeeFirstName"
                                class="form-control"
                                value="${employee.firstName || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Last Name</label>
                            <input
                                id="editEmployeeLastName"
                                class="form-control"
                                value="${employee.lastName || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Email Address</label>
                            <input
                                id="editEmployeeEmail"
                                class="form-control"
                                value="${employee.email || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Department</label>
                            <select
                                id="editEmployeeDepartment"
                                class="form-select">

                                ${departments
                                  .map(
                                    (dep) => `
                                        <option
                                            value="${dep.name}"
                                            ${employee.department === dep.name ? 'selected' : ''}>
                                            ${dep.name}
                                        </option>
`
                                  )
                                  .join('')}

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Designation</label>
                            <input
                                id="editEmployeeDesignation"
                                class="form-control"
                                value="${employee.designation || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Phone Number</label>

                            <input
                                id="editEmployeePhone"
                                class="form-control"
                                value="${employee.phone || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Manager</label>
                            <input
                                id="editEmployeeManager"
                                class="form-control"
                                value="${employee.manager || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Location</label>
                            <select
                                id="editEmployeeLocation"
                                class="form-select">

                                ${locations
                                  .map(
                                    (location) => `
                                    <option
                                        value="${location.name}"
                                        ${employee.location === location.name ? 'selected' : ''}>
                                        ${location.name}
                                    </option>
                                `
                                  )
                                  .join('')}

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Date of Joining</label>
                            <input
                                type="date"
                                id="editEmployeeJoiningDate"
                                class="form-control"
                                value="${employee.joiningDate ? employee.joiningDate.substring(0, 10) : ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Date of Leaving</label>
                            <input
                                type="date"
                                id="editEmployeeLeavingDate"
                                class="form-control"
                                value="${employee.leavingDate ? employee.leavingDate.substring(0, 10) : ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Employment Type</label>
                            <select
                                id="editEmployeeType"
                                class="form-select">

                                <option
                                    ${employee.employmentType === 'Full Time' ? 'selected' : ''}>
                                    Full Time
                                </option>

                                <option
                                    ${employee.employmentType === 'Contract' ? 'selected' : ''}>
                                    Contract
                                </option>

                                <option
                                    ${employee.employmentType === 'Intern' ? 'selected' : ''}>
                                    Intern
                                </option>

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Status</label>
                            <select
                                id="editEmployeeStatus"
                                class="form-select">

                                <option
                                    ${employee.status === 'Active' ? 'selected' : ''}>
                                    Active
                                </option>

                                <option
                                    ${employee.status === 'Inactive' ? 'selected' : ''}>
                                    Inactive
                                </option>

                                <option
                                    ${employee.status === 'On Leave' ? 'selected' : ''}>
                                    On Leave
                                </option>

                                <option
                                    ${employee.status === 'Resigned' ? 'selected' : ''}>
                                    Resigned
                                </option>

                            </select>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                        Cancel

                    </button>

                    <button
                        class="btn btn-primary"
                        onclick="saveEmployeeEdit()">

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('editEmployeeModal')).show();
}

async function saveEmployeeEdit() {
  const employeeId = document.getElementById('editEmployeeId').value;

  const employee = await getEmployeeApi(Number(document.getElementById('editEmployeeId').value));

  if (!employee) {
    return;
  }

  const oldEmployee = {
    ...employee,
  };

  const oldLocation = employee.location || '';

  employee.firstName = document.getElementById('editEmployeeFirstName').value;

  employee.lastName = document.getElementById('editEmployeeLastName').value;

  employee.department = document.getElementById('editEmployeeDepartment').value;

  employee.designation = document.getElementById('editEmployeeDesignation').value;

  employee.phone = document.getElementById('editEmployeePhone').value.trim();

  employee.email = document.getElementById('editEmployeeEmail').value;

  employee.manager = document.getElementById('editEmployeeManager').value;

  const newLocation = document.getElementById('editEmployeeLocation').value;

  employee.location = newLocation;

  employee.joiningDate = document.getElementById('editEmployeeJoiningDate').value;

  employee.leavingDate = document.getElementById('editEmployeeLeavingDate').value;

  employee.employmentType = document.getElementById('editEmployeeType').value;

  employee.status = document.getElementById('editEmployeeStatus').value;

  await addActivityApi(`Employee ${employee.firstName} ${employee.lastName} updated`);

  const changes = [];

  if (oldEmployee.firstName !== employee.firstName)
    changes.push(`First Name: ${oldEmployee.firstName} → ${employee.firstName}`);

  if (oldEmployee.lastName !== employee.lastName)
    changes.push(`Last Name: ${oldEmployee.lastName} → ${employee.lastName}`);

  if (oldEmployee.email !== employee.email)
    changes.push(`Email: ${oldEmployee.email} → ${employee.email}`);

  if (oldEmployee.department !== employee.department)
    changes.push(`Department: ${oldEmployee.department} → ${employee.department}`);

  if (oldEmployee.designation !== employee.designation)
    changes.push(`Designation: ${oldEmployee.designation} → ${employee.designation}`);

  if (oldEmployee.manager !== employee.manager)
    changes.push(`Manager: ${oldEmployee.manager} → ${employee.manager}`);

  if (oldEmployee.location !== employee.location)
    changes.push(`Location: ${oldEmployee.location} → ${employee.location}`);

  if (oldEmployee.status !== employee.status)
    changes.push(`Status: ${oldEmployee.status} → ${employee.status}`);

  if (oldEmployee.employmentType !== employee.employmentType)
    changes.push(`Employment Type: ${oldEmployee.employmentType} → ${employee.employmentType}`);

  const assignedAssets = getAssignments().filter(
    (a) => a.employeeId === employee.id && a.status === 'Assigned'
  );

  if (
    (employee.status === 'Resigned' || employee.status === 'Inactive') &&
    assignedAssets.length > 0
  ) {
    alert(
      `Cannot mark employee as Resigned / Inactive.\n\nOutstanding Assets:\n\n${assignedAssets
        .map((a) => a.assetName)
        .join('\n')}`
    );

    return;
  }

  if (oldLocation && oldLocation !== newLocation) {
    addEmployeeTransfer({
      id: Date.now(),

      employeeId: employee.id,

      employeeName: `${employee.firstName} ${employee.lastName}`,

      fromLocation: oldLocation,

      toLocation: newLocation,

      effectiveDate: formatDateTime(),

      remarks: 'Location changed via Employee Edit',
    });

    await addActivityApi(
      `Employee ${employee.name} transferred from ${oldLocation} to ${newLocation}`
    );

    await addEmployeeHistoryApi(employee.id, 'Transferred', `${oldLocation} → ${newLocation}`);
  }

  await updateEmployeeApi(employee.id, employee);

  await addEmployeeHistoryApi(
    employee.id,
    'Updated',
    changes.length > 0 ? changes.join('<br>') : 'No changes detected'
  );

  bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal')).hide();

  loadWorkforce();
}

async function viewEmployee(employeeId) {
  const employee = await getEmployeeApi(employeeId);

  const departments = await getDepartments('active');
  const departmentInfo = departments.find((d) => d.name === employee.department);

  const departmentCode = departmentInfo?.code || employee.department;

  const assignments = getAssignments();

  if (!employee) {
    return;
  }

  const employeeAssets = assignments.filter(
    (item) => item.employeeId === employeeId && item.status === 'Assigned'
  );

  const history = await getEmployeeHistoryApi(employeeId);

  const modalHtml = `

    <div class="modal fade"
         id="employeeProfileModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

            <div class="asset-hero d-flex align-items-center position-relative px-4 py-4">

                <div class="asset-image me-4">

                    <div class="avatar"
                        style="width:72px;height:72px;font-size:26px;">

                        ${employee.firstName.charAt(0)}
                        ${employee.lastName.charAt(0)}

                    </div>

                </div>

                <div>

                    <h2 class="mb-1">
                        ${employee.firstName}
                        ${employee.lastName}
                    </h2>

                    <div class="text-muted fw-semibold">
                        ${employee.employeeId}
                        •
                        ${employee.designation}
                        •
                        ${employee.department}
                    </div>

                    <span class="status-badge ${employee.status.toLowerCase().replace(/\s/g, '-')}">
                        ${employee.status}
                    </span>

                </div>

                <button
                    type="button"
                    class="btn-close position-absolute"
                    style="top:24px; right:24px;"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="row g-4 mt-1">

                    <div class="col-md-3">

                        <div class="asset-stat-card">

                            <div class="asset-stat-icon">

                                <i class="fas fa-laptop"></i>

                            </div>

                            <div>

                                <small>Assets</small>

                                <h5>${employeeAssets.length}</h5>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-3">

                        <div class="asset-stat-card">

                            <div class="asset-stat-icon">

                                <i class="fas fa-building"></i>

                            </div>

                            <div>

                                <small>Department</small>

                                <h6>${departmentCode}</h6>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-3">

                        <div class="asset-stat-card">

                            <div class="asset-stat-icon">

                                <i class="fas fa-user-tie"></i>

                            </div>

                            <div>

                                <small>Manager</small>

                                <h6>${employee.manager || '-'}</h6>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-3">

                        <div class="asset-stat-card">

                            <div class="asset-stat-icon">

                                <i class="fas fa-map-marker-alt"></i>

                            </div>

                            <div>

                                <small>Location</small>

                                <h6>${employee.location}</h6>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-6">

                        <div class="asset-info-card">

                            <h6>General Information</h6>

                            <div class="info-grid">

                                <div>Employee ID</div>
                                <strong>${employee.employeeId}</strong>

                                <div>Email</div>
                                <strong>${employee.email || '-'}</strong>

                                <div>Phone</div>
                                <strong>${employee.phone || '-'}</strong>

                                <div>Location</div>
                                <strong>${employee.location || '-'}</strong>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-6">

                        <div class="asset-info-card">

                            <h6>Employment Information</h6>

                            <div class="info-grid">

                                <div>Department</div>
                                <strong>${employee.department}</strong>

                                <div>Designation</div>
                                <strong>${employee.designation}</strong>

                                <div>Manager</div>
                                <strong>${employee.manager || '-'}</strong>

                                <div>Employment</div>
                                <strong>${employee.employmentType}</strong>

                                <div>Joined</div>
                                <strong>${employee.joiningDate.substring(0, 10)}</strong>

                            </div>

                        </div>

                    </div>

                    <hr class="mt-4">

                    <ul class="nav nav-tabs asset-tabs mb-3" role="tablist">

                        <li class="nav-item">

                            <button
                                class="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#empTimeline">

                                <i class="fas fa-stream me-2"></i>
                                Timeline

                            </button>

                        </li>

                        <li class="nav-item">

                            <button
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#empAssets">

                                <i class="fas fa-laptop me-2"></i>
                                Assigned Assets

                            </button>

                        </li>

                    </ul>

                    <div class="tab-content">
                    <div class="tab-pane fade show active"
                        id="empTimeline">

                        <div class="timeline">

                            ${
                              history.length
                                ? history
                                    .map(
                                      (item) => `

                                <div class="timeline-item">

                                    <div class="timeline-dot ${getTimelineColor(item.action)}"></div>

                                    <div class="timeline-content">

                                        <strong>${item.action}</strong>

                                        <div class="text-muted">

                                            ${item.details}

                                        </div>

                                        <small>

                                            ${formatActivityDate(item.createdAt)}

                                        </small>

                                    </div>

                                </div>

                                `
                                    )
                                    .join('')
                                : `
                                <div class="text-center py-5 text-muted">

                                    <i class="fas fa-history fa-2x mb-3"></i>

                                    <p>No employee history found.</p>

                                </div>
                                `
                            }

                        </div>

                    </div>
                    <div class="tab-pane fade"
                        id="empAssets">

                        ${
                          employeeAssets.length
                            ? `

                            <table class="table align-middle">

                                <thead>

                                    <tr>

                                        <th>Asset</th>
                                        <th>Category</th>
                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    ${employeeAssets
                                      .map(
                                        (asset) => `

                                    <tr>

                                        <td>

                                            <strong>

                                                ${asset.assetName}

                                            </strong>

                                        </td>

                                        <td>

                                            ${asset.assettype}

                                        </td>

                                        <td>

                                            <span class="status-badge assigned">

                                                Assigned

                                            </span>

                                        </td>

                                    </tr>

                                    `
                                      )
                                      .join('')}

                                </tbody>

                            </table>

                            `
                            : `

                            <div class="text-center py-5">

                                <i class="fas fa-laptop fa-2x text-muted mb-3"></i>

                                <p class="text-muted">

                                    No assets assigned.

                                </p>

                            </div>

                            `
                        }

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
`;

  const existingModal = document.getElementById('employeeProfileModal');

  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('employeeProfileModal')).show();

  await addActivityApi(`Viewed employee profile: ${employee.firstName} ${employee.lastName}`);
}

function getTimelineColor(action) {
  if (action.includes('Created')) return 'bg-success';

  if (action.includes('Assigned')) return 'bg-primary';

  if (action.includes('Returned')) return 'bg-warning';

  if (action.includes('Transferred')) return 'bg-info';

  if (action.includes('Deleted')) return 'bg-danger';

  return 'bg-secondary';
}

function getEmployeeName(employee) {
  return [employee.firstName, employee.lastName].join(' ');
}

function formatActivityDate(date) {
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
