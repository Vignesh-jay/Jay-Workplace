let departmentFilter = 'active';

async function loadDepartments() {
  const departments = await getDepartments(departmentFilter);
  setActiveMenu('nav-administration');

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">
            Departments
        </h2>

        <p class="text-muted">
            Manage organization departments.
        </p>

    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar d-flex justify-content-between">

    <select
        class="form-select"
        style="width:180px;"
        onchange="changeDepartmentFilter(this.value)">

        <option value="active">Active</option>
        <option value="disabled">Disabled</option>
        <option value="all">All</option>

    </select>

    <button
        class="btn btn-primary"
        onclick="showAddDepartmentModal()">

        Add Department

    </button>

</div>

    <table class="table mt-4">

        <thead>

            <tr>

                <th style="width:120px;">
                    Code
                </th>

                <th>
                    Department
                </th>

                <th>
                    Description
                </th>

                <th>Status</th>

                <th style="width:150px;">
                    Actions
                </th>

            </tr>

            </thead>

        <tbody>

            ${departments
              .map(
                (dep) => `

            <tr>

                <td>${dep.code}</td>

                <td>${dep.name}</td>

                <td>${dep.description || '-'}</td>

                <td>
                    ${
                      dep.status
                        ? `<span class="badge bg-success">Active</span>`
                        : `<span class="badge bg-secondary">Disabled</span>`
                    }
                </td>

                <td>

                    <td class="text-nowrap">

                        ${
                          dep.status
                            ? `
                            <button
                                class="btn btn-light btn-sm asset-action-btn"
                                title="Edit"
                                onclick="showEditDepartmentModal(${dep.id})">

                                <i class="fas fa-pen"></i>

                            </button>

                            <button
                                class="btn btn-light btn-sm asset-action-btn text-warning"
                                title="Disable"
                                onclick="disableDepartmentClick(${dep.id})">

                                <i class="fas fa-ban"></i>

                            </button>
                            `
                            : `
                            <button
                                class="btn btn-light btn-sm asset-action-btn text-success"
                                title="Enable"
                                onclick="enableDepartmentClick(${dep.id})">

                                <i class="fas fa-check"></i>

                            </button>

                            <button
                                class="btn btn-light btn-sm asset-action-btn text-danger"
                                title="Delete"
                                onclick="deleteDepartmentClick(${dep.id})">

                                <i class="fas fa-trash"></i>

                            </button>
                            `
                        }

                    </td>

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

function showAddDepartmentModal() {
  const existing = document.getElementById('addDepartmentModal');

  if (existing) {
    existing.remove();
  }
  const modalHtml = `

    <div class="modal fade"
         id="addDepartmentModal">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">
                        Add Department
                    </h5>

                </div>

                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Department Code</label>

                        <input
                            id="departmentCode"
                            class="form-control"
                            placeholder="Example: IT">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Department Name</label>

                        <input
                            id="departmentName"
                            class="form-control"
                            placeholder="Information Technology">
                    </div>

                    <div>
                        <label class="form-label">Description</label>

                        <textarea
                            id="departmentDescription"
                            class="form-control"
                            rows="3"
                            placeholder="Optional"></textarea>
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
                        onclick="saveDepartment()">

                        Save

                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('addDepartmentModal')).show();
}

async function saveDepartment() {
  const code = document.getElementById('departmentCode').value.trim();
  const name = document.getElementById('departmentName').value.trim();
  const description = document.getElementById('departmentDescription').value.trim();

  if (!code || !name) {
    alert('Department Code and Department Name are required.');
    return;
  }

  try {
    await createDepartment({
      code,
      name,
      description,
    });

    addActivity(`Department ${name} created`);

    bootstrap.Modal.getInstance(document.getElementById('addDepartmentModal')).hide();

    await loadDepartments();
  } catch (error) {
    alert(error.message);
  }
}

async function disableDepartmentClick(id) {
  if (!confirm('Disable this department?')) {
    return;
  }

  try {
    await disableDepartment(id);

    addActivity('Department disabled');

    await loadDepartments();
  } catch (error) {
    alert(error.message);
  }
}

async function showEditDepartmentModal(id) {
  const departments = await getDepartments();

  const department = departments.find((dep) => dep.id === id);

  if (!department) {
    alert('Department not found.');
    return;
  }

  const existing = document.getElementById('editDepartmentModal');

  if (existing) {
    existing.remove();
  }

  const modalHtml = `

<div class="modal fade"
     id="editDepartmentModal">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    Edit Department

                </h5>

            </div>

            <div class="modal-body">

                <div class="mb-3">

                    <label class="form-label">

                        Department Code

                    </label>

                    <input
                        id="editDepartmentCode"
                        class="form-control"
                        value="${department.code}">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Department Name

                    </label>

                    <input
                        id="editDepartmentName"
                        class="form-control"
                        value="${department.name}">

                </div>

                <div>

                    <label class="form-label">

                        Description

                    </label>

                    <textarea
                        id="editDepartmentDescription"
                        class="form-control"
                        rows="3">${department.description || ''}</textarea>

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
                    onclick="updateDepartmentClick(${department.id})">

                    Update

                </button>

            </div>

        </div>

    </div>

</div>
`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('editDepartmentModal')).show();
}

async function updateDepartmentClick(id) {
  const code = document.getElementById('editDepartmentCode').value.trim();

  const name = document.getElementById('editDepartmentName').value.trim();

  const description = document.getElementById('editDepartmentDescription').value.trim();

  if (!code || !name) {
    alert('Department Code and Name are required.');
    return;
  }

  try {
    await updateDepartment(id, {
      code,
      name,
      description,
      status: true,
    });

    addActivity(`Department ${name} updated`);

    bootstrap.Modal.getInstance(document.getElementById('editDepartmentModal')).hide();

    await loadDepartments();
  } catch (error) {
    alert(error.message);
  }
}

function changeDepartmentFilter(filter) {
  departmentFilter = filter;

  loadDepartments();
}

async function enableDepartmentClick(id) {
  if (!confirm('Enable this department?')) return;

  try {
    await enableDepartment(id);

    addActivity('Department enabled');

    await loadDepartments();
  } catch (error) {
    alert(error.message);
  }
}

async function deleteDepartmentClick(id) {
  if (!confirm('Permanently delete this department?')) return;

  try {
    await deleteDepartment(id);

    addActivity('Department deleted');

    await loadDepartments();
  } catch (error) {
    alert(error.message);
  }
}
