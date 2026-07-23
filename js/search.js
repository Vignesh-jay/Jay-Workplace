// ======================================
// JΛY Workplace - Global Search Engine
// ======================================

async function globalSearch(query) {
  query = query.trim().toLowerCase();

  if (!query) {
    return {
      assets: [],
      employees: [],
      departments: [],
      locations: [],
    };
  }

  const [assets, employees, departments, locations] = await Promise.all([
    searchAssets(query),
    searchEmployees(query),
    searchDepartments(query),
    searchLocations(query),
  ]);

  return {
    assets,
    employees,
    departments,
    locations,
  };
}

function getAssetIcon(category) {
  switch ((category || '').toLowerCase()) {
    case 'laptop':
      return 'fas fa-laptop';

    case 'desktop':
      return 'fas fa-desktop';

    case 'monitor':
      return 'fas fa-tv';

    case 'mobile':
    case 'phone':
      return 'fas fa-mobile-alt';

    case 'tablet':
      return 'fas fa-tablet-alt';

    case 'printer':
      return 'fas fa-print';

    case 'scanner':
      return 'fas fa-scanner';

    case 'server':
      return 'fas fa-server';

    case 'network':
    case 'router':
    case 'switch':
      return 'fas fa-network-wired';

    case 'keyboard':
      return 'fas fa-keyboard';

    case 'mouse':
      return 'fas fa-computer-mouse';

    case 'headset':
      return 'fas fa-headphones';

    case 'camera':
    case 'webcam':
      return 'fas fa-camera';

    case 'storage':
    case 'hard disk':
    case 'ssd':
      return 'fas fa-hard-drive';

    default:
      return 'fas fa-box';
  }
}

async function searchAssets(query) {
  const assets = await getAssetsApi();

  return assets.filter((asset) => {
    return [
      asset.assetId,
      asset.name,
      asset.category,
      asset.location,
      asset.status,
      asset.manufacturer,
      asset.model,
      asset.serialNumber,
    ]
      .filter(Boolean)
      .some((value) => value.toString().toLowerCase().includes(query));
  });
}

async function searchEmployees(query) {
  const employees = await getEmployeesApi();

  return employees.filter((employee) => {
    return [
      employee.employeeId,

      employee.firstName,

      employee.lastName,

      employee.email,

      employee.phone,

      employee.department,

      employee.designation,

      employee.location,
    ]
      .filter(Boolean)
      .some((value) => value.toString().toLowerCase().includes(query));
  });
}

async function searchDepartments(query) {
  const departments = await getDepartments();

  return departments.filter((department) => {
    return [department.code, department.name, department.description]
      .filter(Boolean)
      .some((value) => value.toString().toLowerCase().includes(query));
  });
}

async function searchLocations(query) {
  const locations = await getLocations();

  return locations.filter((location) => {
    return [
      location.code,
      location.name,
      location.city,
      location.state,
      location.country,
      location.address,
    ]
      .filter(Boolean)
      .some((value) => value.toString().toLowerCase().includes(query));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('globalSearchInput');

  if (!input) return;

  input.addEventListener('input', handleGlobalSearch);
});

async function handleGlobalSearch(e) {
  const query = e.target.value;

  const results = await globalSearch(query);

  const clearBtn = document.getElementById('clearSearchBtn');

  if (query.trim()) {
    clearBtn.classList.remove('d-none');
  } else {
    clearBtn.classList.add('d-none');
  }

  if (!query.trim()) {
    document.getElementById('globalSearchResults').classList.add('d-none');

    return;
  }

  renderGlobalSearch(results);
}

function renderGlobalSearch(results) {
  const container = document.getElementById('globalSearchResults');

  let html = '';

  // Assets
  if (results.assets.length) {
    html += `
            <div class="global-search-section">
                Assets (${results.assets.length})
            </div>
        `;

    results.assets.slice(0, 5).forEach((asset) => {
      html += `
                <div
                    class="global-search-item"
                    onclick="openAsset('${asset.id}')">

                    <strong>

                        <i class="${getAssetIcon(asset.category)} search-asset-icon"></i>

                        ${asset.name}

                    </strong><br>

                    <small class="text-muted">

                        ${asset.assetId}

                        •

                        ${asset.category}

                        •

                        ${asset.location}

                    </small>

                </div>
            `;
    });
  }

  // Employees
  if (results.employees.length) {
    html += `
            <div class="global-search-section">
                Employees (${results.employees.length})
            </div>
        `;

    results.employees.slice(0, 5).forEach((employee) => {
      html += `
                <div class="global-search-item" onclick="openEmployee('${employee.id}')">

                    <strong>

                        👤

                        ${employee.firstName}

                        ${employee.lastName}

                    </strong>

                    <br>

                    <small class="text-muted">

                        ${employee.employeeId || employee.id || ''}

                        •

                        ${employee.department}

                    </small>

                </div>
            `;
    });
  }

  // Locations
  if (results.locations.length) {
    html += `
        <div class="global-search-section">
            Locations (${results.locations.length})
        </div>
    `;

    results.locations.forEach((location) => {
      const locationName = location.name ?? location;

      html += `
        <div
            class="global-search-item"
            onclick="alert('${locationName}')">

            📍 ${locationName}

        </div>
        `;
    });
  }

  // Departments
  if (results.departments.length) {
    html += `
        <div class="global-search-section">
            Departments (${results.departments.length})
        </div>
    `;

    results.departments.forEach((department) => {
      const departmentName = department.name ?? department;

      html += `
        <div
            class="global-search-item"
            onclick="alert('${departmentName}')">

            🏢 ${departmentName}

        </div>
        `;
    });
  }

  if (!html) {
    html = `
            <div class="global-search-empty">

                No Results Found

            </div>
        `;
  }

  container.innerHTML = html;

  container.classList.remove('d-none');
}

function closeGlobalSearch() {
  const results = document.getElementById('globalSearchResults');
  const input = document.getElementById('globalSearchInput');

  if (results) {
    results.classList.add('d-none');
  }

  if (input) {
    input.blur(); // Optional: remove focus
  }
}

function openAsset(assetId) {
  closeGlobalSearch();

  viewAsset(assetId);
}

function openEmployee(employeeId) {
  closeGlobalSearch();

  viewEmployee(employeeId);
}

document.addEventListener('click', (e) => {
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('globalSearchResults');

  if (!searchInput || !searchResults) return;

  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    closeGlobalSearch();
  }
});

function clearGlobalSearch() {
  const input = document.getElementById('globalSearchInput');

  input.value = '';

  document.getElementById('clearSearchBtn').classList.add('d-none');

  closeGlobalSearch();

  input.focus();
}
