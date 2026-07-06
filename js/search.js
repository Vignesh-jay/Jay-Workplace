// ======================================
// JΛY Workplace - Global Search Engine
// ======================================

function globalSearch(query) {
  query = query.trim().toLowerCase();

  if (!query) {
    return {
      assets: [],
      employees: [],
      departments: [],
      locations: [],
    };
  }

  return {
    assets: searchAssets(query),

    employees: searchEmployees(query),

    departments: searchDepartments(query),

    locations: searchLocations(query),
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

function searchAssets(query) {
  return getAssets().filter((asset) => {
    return [
      asset.id,

      asset.name,

      asset.category,

      asset.location,

      asset.status,

      asset.specifications?.manufacturer,

      asset.specifications?.model,

      asset.specifications?.serialNumber,
    ]
      .filter(Boolean)
      .some((value) => value.toString().toLowerCase().includes(query));
  });
}

function searchEmployees(query) {
  return getEmployees().filter((employee) => {
    return [
      employee.employeeId,

      employee.firstName,

      employee.lastName,

      employee.email,

      employee.department,

      employee.designation,

      employee.location,
    ]
      .filter(Boolean)
      .some((value) => value.toString().toLowerCase().includes(query));
  });
}

function searchDepartments(query) {
  return getDepartments().filter((department) => {
    const name = typeof department === 'string' ? department : department?.name;

    return name?.toLowerCase().includes(query);
  });
}

function searchLocations(query) {
  return getLocations().filter((location) => {
    const name = typeof location === 'string' ? location : location?.name;

    return name?.toLowerCase().includes(query);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('globalSearchInput');

  if (!input) return;

  input.addEventListener('input', handleGlobalSearch);
});

function handleGlobalSearch(e) {
  const query = e.target.value;

  const results = globalSearch(query);

  const shortcut = document.querySelector('.search-shortcut');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (query.trim()) {
    shortcut.classList.add('d-none');
    clearBtn.classList.remove('d-none');
  } else {
    shortcut.classList.remove('d-none');
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

                        ${asset.id}

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

  document.querySelector('.search-shortcut').classList.remove('d-none');

  document.getElementById('clearSearchBtn').classList.add('d-none');

  closeGlobalSearch();

  input.focus();
}
