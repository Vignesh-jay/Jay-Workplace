let locationFilter = 'active';

async function loadLocations() {
  const locations = await getLocations(locationFilter);
  setActiveMenu('nav-administration');

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">
            Locations
        </h2>

        <p class="text-muted">
            Manage organization Locations.
        </p>

    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar d-flex justify-content-between">

    <select
        class="form-select"
        style="width:180px;"
        onchange="changeLocationFilter(this.value)">

        <option value="active"
            ${locationFilter === 'active' ? 'selected' : ''}>
            Active
        </option>

        <option value="disabled"
            ${locationFilter === 'disabled' ? 'selected' : ''}>
            Disabled
        </option>

        <option value="all"
            ${locationFilter === 'all' ? 'selected' : ''}>
            All
        </option>

    </select>

    <button
        class="btn btn-primary"
        onclick="showAddLocationModal()">

        Add location

    </button>

</div>

    <table class="table mt-4">

        <thead>

            <tr>

                <th style="width:120px;">
                    Code
                </th>

                <th>
                    Location
                </th>

                <th>
                    State
                </th>

                <th>Status</th>

                <th style="width:150px;">
                    Actions
                </th>

            </tr>

            </thead>

        <tbody>

            ${locations
              .map(
                (location) => `

            <tr>

                <td>${location.code}</td>

                <td>${location.name}</td>

                <td>${location.state || '-'}</td>

                <td>
                    ${
                      location.status
                        ? `<span class="badge bg-success">Active</span>`
                        : `<span class="badge bg-secondary">Disabled</span>`
                    }
                </td>

                    <td class="text-nowrap">

                        ${
                          location.status
                            ? `
                            <button
                                class="btn btn-light btn-sm asset-action-btn"
                                title="Edit"
                                onclick="showEditLocationModal(${location.id})">

                                <i class="fas fa-pen"></i>

                            </button>

                            <button
                                class="btn btn-light btn-sm asset-action-btn text-warning"
                                title="Disable"
                                onclick="disableLocationClick(${location.id})">

                                <i class="fas fa-ban"></i>

                            </button>
                            `
                            : `
                            <button
                                class="btn btn-light btn-sm asset-action-btn text-success"
                                title="Enable"
                                onclick="enableLocationClick(${location.id})">

                                <i class="fas fa-check"></i>

                            </button>

                            <button
                                class="btn btn-light btn-sm asset-action-btn text-danger"
                                title="Delete"
                                onclick="deleteLocationClick(${location.id})">

                                <i class="fas fa-trash"></i>

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

function showAddLocationModal() {
  const existing = document.getElementById('addLocationModal');

  if (existing) {
    existing.remove();
  }
  const modalHtml = `

    <div class="modal fade"
         id="addLocationModal">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">
                        Add Location
                    </h5>

                </div>

                <div class="modal-body">

                    <div class="mb-3">
                        <label class="form-label">Location Code</label>

                        <input
                            id="locationCode"
                            class="form-control"
                            placeholder="Example: BLR">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Location Name</label>

                        <input
                            id="locationName"
                            class="form-control"
                            placeholder="Bangalore Office">
                    </div>

                    <div>
                        <label class="form-label">State</label>

                        <input
                            id="locationState"
                            class="form-control"
                            rows="3"
                            placeholder="Karnataka"></input>
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
                        onclick="saveLocation()">

                        Save

                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('addLocationModal')).show();
}

async function saveLocation() {
  const code = document.getElementById('locationCode').value.trim();
  const name = document.getElementById('locationName').value.trim();
  const state = document.getElementById('locationState').value.trim();

  if (!code || !name) {
    alert('location Code and location Name are required.');
    return;
  }

  try {
    await createLocation({
      code,
      name,
      state,
    });

    await logActivity({
      module: 'Locations',
      action: 'Created',
      description: `Location ${name} created`,
      entityType: 'Location',
      entityId: null,
      entityCode: code,
    });

    bootstrap.Modal.getInstance(document.getElementById('addLocationModal')).hide();

    await loadLocations();
  } catch (error) {
    alert(error.message);
  }
}

async function disableLocationClick(id) {
  if (!confirm('Disable this location?')) return;

  try {
    const locations = await getLocations('all');
    const location = locations.find((loc) => loc.id === id);

    if (!location) {
      alert('Location not found.');
      return;
    }

    const employees = await getEmployeesApi();
    const assets = await getAssetsApi();

    const assignedEmployees = employees.filter((emp) => emp.location === location.name);

    const assignedAssets = assets.filter((asset) => asset.location === location.name);

    if (assignedEmployees.length > 0 || assignedAssets.length > 0) {
      let message = `Cannot disable "${location.name}".\n\n`;

      if (assignedEmployees.length > 0) {
        message += `Employees Assigned:\n`;
        message += assignedEmployees
          .map((emp) => `${emp.employeeId} - ${emp.firstName} ${emp.lastName}`)
          .join('\n');
        message += '\n\n';
      }

      if (assignedAssets.length > 0) {
        message += `Assets Assigned:\n`;
        message += assignedAssets.map((asset) => `${asset.assetId} - ${asset.name}`).join('\n');
      }

      alert(message);
      return;
    }

    await disableLocation(id);

    await logActivity({
      module: 'Locations',
      action: 'Disabled',
      description: `Location "${location.name}" disabled`,
      entityType: 'Location',
      entityId: location.id,
      entityCode: location.code,
    });

    await loadLocations();
  } catch (error) {
    alert(error.message);
  }
}

async function showEditLocationModal(id) {
  const locations = await getLocations();

  const location = locations.find((location) => location.id === id);

  if (!location) {
    alert('Location not found.');
    return;
  }

  const existing = document.getElementById('editLocationModal');

  if (existing) {
    existing.remove();
  }

  const modalHtml = `

<div class="modal fade"
     id="editLocationModal">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    Edit Location

                </h5>

            </div>

            <div class="modal-body">

                <div class="mb-3">

                    <label class="form-label">

                        Location Code

                    </label>

                    <input
                        id="editLocationCode"
                        class="form-control"
                        value="${location.code}">

                </div>

                <div class="mb-3">

                    <label class="form-label">

                        Location Name

                    </label>

                    <input
                        id="editLocationName"
                        class="form-control"
                        value="${location.name}">

                </div>

                <div>

                    <label class="form-label">

                        State

                    </label>

                    <input
                        id="editLocationState"
                        class="form-control"
                        value=${location.state}>

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
                    onclick="updateLocationClick(${location.id})">

                    Update

                </button>

            </div>

        </div>

    </div>

</div>
`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('editLocationModal')).show();
}

async function updateLocationClick(id) {
  const code = document.getElementById('editLocationCode').value.trim();

  const name = document.getElementById('editLocationName').value.trim();

  const state = document.getElementById('editLocationState').value.trim();

  if (!code || !name) {
    alert('Location Code and Name are required.');
    return;
  }

  try {
    await updateLocation(id, {
      code,
      name,
      state,
      status: true,
    });

    await logActivity({
      module: 'Locations',
      action: 'Updated',
      description: `Location ${name} updated`,
      entityType: 'Location',
      entityId: id,
      entityCode: code,
    });

    bootstrap.Modal.getInstance(document.getElementById('editLocationModal')).hide();

    await loadLocations();
  } catch (error) {
    alert(error.message);
  }
}

function changeLocationFilter(filter) {
  locationFilter = filter;

  loadLocations();
}

async function enableLocationClick(id) {
  if (!confirm('Enable this location?')) return;

  try {
    const locations = await getLocations('all');
    const location = locations.find((loc) => loc.id === id);

    await enableLocation(id);

    await logActivity({
      module: 'Locations',
      action: 'Enabled',
      description: `Location "${location.name}" enabled`,
      entityType: 'Location',
      entityId: id,
      entityCode: location.code,
    });

    await loadLocations();
  } catch (error) {
    alert(error.message);
  }
}

async function deleteLocationClick(id) {
  if (!confirm('Delete this location permanently?')) return;

  try {
    const locations = await getLocations('all');
    const location = locations.find((loc) => loc.id === id);

    if (!location) {
      alert('Location not found.');
      return;
    }

    const employees = await getEmployeesApi();
    const assets = await getAssetsApi();

    const assignedEmployees = employees.filter((emp) => emp.location === location.name);

    const assignedAssets = assets.filter((asset) => asset.location === location.name);

    if (assignedEmployees.length > 0 || assignedAssets.length > 0) {
      let message = `Cannot delete "${location.name}".\n\n`;

      if (assignedEmployees.length > 0) {
        message += `Employees Assigned:\n`;
        message += assignedEmployees
          .map((emp) => `${emp.employeeId} - ${emp.firstName} ${emp.lastName}`)
          .join('\n');
        message += '\n\n';
      }

      if (assignedAssets.length > 0) {
        message += `Assets Assigned:\n`;
        message += assignedAssets.map((asset) => `${asset.assetId} - ${asset.name}`).join('\n');
      }

      alert(message);
      return;
    }

    await deleteLocation(id);

    await logActivity({
      module: 'Locations',
      action: 'Deleted',
      description: `Location "${location.name}" deleted`,
      entityType: 'Location',
      entityId: location.id,
      entityCode: location.code,
    });

    await loadLocations();
  } catch (error) {
    alert(error.message);
  }
}
