async function loadAssignments() {
  const assignmentList = await getAssignmentsApi();

  const totalAssignments = assignmentList.length;

  const activeAssignments = assignmentList.filter((a) => a.status === 'Assigned').length;

  const returnedAssignments = assignmentList.filter((a) => a.status === 'Returned').length;

  const assets = await getAssetsApi();

  const availableAssets = assets.filter((a) => a.status === 'Available').length;

  setActiveMenu('nav-assignments');

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">
            Assignments
        </h2>

        <p class="text-muted">
            Manage asset allocation and assignments.
        </p>

    </div>

</div>

<div class="row g-3 mb-4">

    <div class="col-md-3">

        <div class="card dashboard-card active">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Total Assignments
                    </small>

                    <h2>${totalAssignments}</h2>

                </div>

                <i class="fas fa-exchange-alt fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Active
                    </small>

                    <h2>${activeAssignments}</h2>

                </div>

                <i class="fas fa-user-check fa-2x text-success"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Returned
                    </small>

                    <h2>${returnedAssignments}</h2>

                </div>

                <i class="fas fa-rotate-left fa-2x text-warning"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card">

            <div class="card-body">

                <div>

                    <small class="text-muted">
                        Available Assets
                    </small>

                    <h2>${availableAssets}</h2>

                </div>

                <i class="fas fa-box-open fa-2x text-info"></i>

            </div>

        </div>

    </div>

</div>

<div class="card-custom">

    <div class="card-custom">

        <div class="table-toolbar">

            <input
                type="text"
                class="form-control search-input"
                id="assignmentSearch"
                placeholder="Search assignment..."
                onkeyup="filterAssignments()">

            <button
                class="btn btn-primary"
                onclick="showAssignAssetModal()">

                <i class="fas fa-plus"></i>

                Assign Asset

            </button>

        </div>

        <table class="table align-middle mt-4">

        <thead>

            <tr>

                <th>Asset</th>

                <th>Employee</th>

                <th>Assigned</th>

                <th>Returned</th>

                <th>Status</th>

                <th>Actions</th>

            </tr>

            </thead>

        <tbody>

            ${assignmentList
              .map(
                (item) => `

                <tr>

                    <td>

                        <div class="asset-name">

                            ${item.asset.name}

                        </div>

                        <div class="asset-meta">

                            ${item.asset.assetId}

                        </div>

                    </td>

                    <td>

                        <div class="asset-name">

                            ${item.employee.firstName} ${item.employee.lastName}

                        </div>

                        <div class="asset-meta">

                            ${item.employee.employeeId}

                        </div>

                    </td>

                    <td>

                        ${formatDateTime(item.assignedDate)}

                    </td>

                    <td>

                        ${item.returnedDate ? formatDateTime(item.returnedDate) : '-'}

                    </td>

                    <td>

                        <span class="status-badge ${
                          item.status === 'Assigned' ? 'assigned' : 'available'
                        }">

                            ${item.status}

                        </span>

                    </td>

                    <td class="text-nowrap">

                        ${
                          item.status === 'Assigned'
                            ? `

                            <button
                                class="btn btn-light btn-sm asset-action-btn"
                                title="View"
                                onclick="viewAssignment('${item.id}')">

                                <i class="fas fa-eye"></i>

                            </button>

                            <button

                                class="btn btn-light btn-sm asset-action-btn text-success"

                                title="Return"

                                onclick="returnAsset(${item.id})">

                                <i class="fas fa-rotate-left"></i>

                            </button>

                            `
                            : `

                            <button
                                class="btn btn-light btn-sm asset-action-btn"
                                title="View"
                                onclick="viewAssignment('${item.id}')">

                                <i class="fas fa-eye"></i>

                            </button>

                            `
                        }

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

async function showAssignAssetModal() {
  const employees = await getEmployeesApi();
  const assets = (await getAssetsApi()).filter((asset) => asset.status === 'Available');

  const modalHtml = `
    <div class="modal fade"
         id="assignAssetModal"
         tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        Assign Asset
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">

                    <div class="mb-4">

                        <label class="form-label">

                            Employee

                        </label>

                        <select
                            id="employeeSelect"
                            class="form-select">

                            ${employees
                              .map(
                                (emp) => `

                                <option value="${emp.id}">
                                    ${emp.employeeId}
                                    •
                                    ${emp.firstName} ${emp.lastName}
                                </option>

                            `
                              )
                              .join('')}

                        </select>

                    </div>

                    <div class="mb-4">

                        <label class="form-label">

                            Available Asset

                        </label>

                        <select
                            id="assetSelect"
                            class="form-select"
                            onchange="previewAssignmentAsset()">

                            <option value="">

                                Select Asset

                            </option>

                            ${assets
                              .map(
                                (asset) => `
                                    <option value="${asset.id}">
                                        ${asset.assetId}
                                        •
                                        ${asset.name}
                                        •
                                        ${asset.serialNumber}
                                    </option>
                                    `
                              )
                              .join('')}

                        </select>

                    </div>

                    <div
                        id="assignmentAssetPreview">

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
                        onclick="saveAssignment()">
                        Assign
                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('assignAssetModal')).show();
  previewAssignmentAsset();
}

async function previewAssignmentAsset() {
  const assetId = document.getElementById('assetSelect').value;

  const assets = await getAssetsApi();

  const asset = assets.find((a) => a.id === Number(assetId));

  const preview = document.getElementById('assignmentAssetPreview');

  if (!asset) {
    preview.innerHTML = '';

    return;
  }

  preview.innerHTML = `

    <div class="asset-info-card">

        <h6>

            Asset Details

        </h6>

        <div class="info-grid">

            <div>Asset ID</div>
            <strong>${asset.assetId}</strong>

            <div>Category</div>
            <strong>${asset.category}</strong>

            <div>Location</div>
            <strong>${asset.location}</strong>

            <div>Status</div>
            <strong>${asset.status}</strong>

            <div>Serial</div>
            <strong>${asset.serialNumber || '-'}</strong>

        </div>

    </div>

    `;
}

async function returnAsset(assignmentId) {
  if (!confirm('Return this asset?')) {
    return;
  }

  try {
    await updateAssignmentApi(assignmentId, {
      returnedBy: 'System',
      condition: 'Good',
      remarks: '',
    });

    const assignment = await getAssignmentApi(assignmentId);

    alert('Asset returned successfully.');

    await loadAssignments();
  } catch (error) {
    console.error(error);

    alert('Failed to return asset.');
  }
}

function filterAssignments() {
  const searchText = document.getElementById('assignmentSearch').value.toLowerCase();

  const rows = document.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    row.style.display = row.innerText.toLowerCase().includes(searchText) ? '' : 'none';
  });
}

async function viewAssignment(assignmentId) {
  const assignment = await getAssignmentApi(assignmentId);

  if (!assignment) return;

  const asset = assignment.asset;

  const employee = assignment.employee;

  if (!asset || !employee) return;

  const modalHtml = `

    <div class="modal fade"
         id="viewAssignmentModal"
         tabindex="-1">

        <div class="modal-dialog modal-xl">

            <div class="modal-content">
                <div class="asset-hero d-flex align-items-center position-relative px-4 py-4">

    <div class="asset-image me-4">

        <div class="asset-icon-large">

            <i class="${getAssetIcon(asset.category)}"></i>

        </div>

    </div>

    <div>

        <h2 class="mb-1">

            ${asset.name}

        </h2>

        <div class="text-muted fw-semibold">

            ${asset.assetId}

            •

            ${asset.category}

            •

            ${asset.location}

        </div>

        <span class="status-badge ${assignment.status === 'Assigned' ? 'assigned' : 'available'}">

            ${assignment.status}

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
    <div class="row g-3 mb-4">

    <div class="col-md-3">

        <div class="asset-stat-card">

            <div class="asset-stat-icon">

                <i class="fas fa-user"></i>

            </div>

            <div>

                <small>Employee</small>

                <h6>

                    ${employee.firstName}
                    ${employee.lastName}

                </h6>

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

                <h6>${employee.department}</h6>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="asset-stat-card">

            <div class="asset-stat-icon">

                <i class="fas fa-calendar"></i>

            </div>

            <div>

                <small>Assigned</small>

                <h6>${formatDateTime(assignment.assignedDate)}</h6>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="asset-stat-card">

            <div class="asset-stat-icon">

                <i class="fas fa-rotate-left"></i>

            </div>

            <div>

                <small>Returned</small>

                <h6>${assignment.returnedDate ? formatDateTime(assignment.returnedDate) : '-'}</h6>

            </div>

        </div>

    </div>

</div>
<div class="asset-info-card mt-4">

    <h6>Assignment Information</h6>

    <div class="info-grid">

        <div>Employee</div>
        <strong>${employee.firstName} ${employee.lastName}</strong>

        <div>Department</div>
        <strong>${employee.department}</strong>

        <div>Assigned On</div>
        <strong>${formatDateTime(assignment.assignedDate)}</strong>

        <div>Returned On</div>
        <strong>${assignment.returnedDate ? formatDateTime(assignment.returnedDate) : '-'}</strong>

    </div>

</div>

</div>

</div>

</div>

</div>
`;

  const existingModal = document.getElementById('viewAssignmentModal');

  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('viewAssignmentModal')).show();
}

async function saveAssignment() {
  const employeeId = Number(document.getElementById('employeeSelect').value);

  const assetId = Number(document.getElementById('assetSelect').value);

  if (!employeeId || !assetId) {
    alert('Please select an employee and an asset.', 'warning');

    return;
  }

  try {
    const assignment = await createAssignmentApi({
      assetId,
      employeeId,
      assignedBy: 'System',
      remarks: '',
    });

    const asset = await getAssetApi(assetId);

    const employee = await getEmployeeApi(employeeId);

    bootstrap.Modal.getInstance(document.getElementById('assignAssetModal')).hide();

    await loadAssignments();

    alert('Asset assigned successfully.', 'success');
  } catch (error) {
    console.error(error);

    alert('Failed to assign asset.', 'danger');
  }
}
