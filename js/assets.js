let assetFilter = 'all';

const SPEC_OPTIONS = {
  // =========================
  // Brands
  // =========================
  manufacturers: {
    Laptop: ['Dell', 'HP', 'Lenovo', 'Apple', 'Acer', 'ASUS', 'MSI'],

    Desktop: ['Dell', 'HP', 'Lenovo', 'Apple', 'Acer', 'ASUS'],

    Monitor: ['Dell', 'LG', 'Samsung', 'BenQ', 'Acer', 'ViewSonic'],

    Mobile: ['Samsung', 'Apple', 'Google', 'Motorola', 'OnePlus', 'Nothing'],

    Printer: ['HP', 'Canon', 'Brother', 'Epson', 'Xerox'],

    Server: ['Dell', 'HP Enterprise', 'Lenovo', 'Supermicro'],

    Network: ['Cisco', 'Fortinet', 'Juniper', 'Aruba', 'TP-Link', 'Ubiquiti'],
  },

  // =========================
  // Processor
  // =========================
  processors: {
    Laptop: [
      'Intel Core i3',
      'Intel Core i5',
      'Intel Core i7',
      'Intel Core Ultra 5',
      'Intel Core Ultra 7',
      'AMD Ryzen 5',
      'AMD Ryzen 7',
      'Apple M1',
      'Apple M2',
      'Apple M3',
      'Apple M4',
    ],

    Desktop: [
      'Intel Core i3',
      'Intel Core i5',
      'Intel Core i7',
      'Intel Core i9',
      'AMD Ryzen 5',
      'AMD Ryzen 7',
      'AMD Ryzen 9',
    ],

    Mobile: ['Snapdragon', 'Exynos', 'Apple Silicon', 'Google Tensor', 'MediaTek Dimensity'],

    Server: ['Intel Xeon Silver', 'Intel Xeon Gold', 'AMD EPYC'],
  },

  // =========================
  // Memory
  // =========================
  ram: {
    Laptop: ['8 GB', '16 GB', '24 GB', '32 GB', '64 GB'],

    Desktop: ['8 GB', '16 GB', '32 GB', '64 GB', '128 GB'],

    Server: ['32 GB', '64 GB', '128 GB', '256 GB', '512 GB'],
    Mobile: ['4 GB', '6 GB', '8 GB', '12 GB', '16 GB'],
  },

  // =========================
  // Storage
  // =========================
  storage: {
    Laptop: ['256 GB SSD', '512 GB SSD', '1 TB SSD'],

    Desktop: ['512 GB SSD', '1 TB SSD', '2 TB SSD', '1 TB HDD'],

    Server: ['1 TB SSD', '2 TB SSD', '4 TB SSD'],
    Mobile: ['32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB'],
  },

  // =========================
  // Operating System
  // =========================
  os: {
    Laptop: ['Windows 11 Pro', 'Windows 11 Home', 'Ubuntu 24.04 LTS', 'macOS Sequoia'],

    Desktop: ['Windows 11 Pro', 'Ubuntu 24.04 LTS'],

    Server: [
      'Windows Server',
      'Ubuntu Server',
      'Red Hat Enterprise Linux',
      'VMware ESXi',
      'Proxmox VE',
    ],

    Network: ['Cisco IOS', 'FortiOS', 'JunOS', 'ArubaOS'],

    Printer: ['Embedded'],
    Mobile: ['Android', 'iOS', 'Others'],
  },
  screenSizes: ['19"', '21.5"', '22"', '23.8"', '24"', '27"', '32"'],

  resolutions: ['HD', 'Full HD', '2K', '4K'],

  printerTypes: ['Laser', 'Inkjet', 'Thermal', 'Dot Matrix'],

  connectivity: ['USB', 'LAN', 'WiFi', 'USB + LAN', 'USB + WiFi', 'USB + LAN + WiFi'],

  deviceTypes: ['Switch', 'Router', 'Firewall', 'Access Point'],

  refreshRates: ['60 Hz', '75 Hz', '100 Hz', '120 Hz', '144 Hz', '165 Hz', '240 Hz'],

  batteryCapacity: ['3000 mAh', '4000 mAh', '5000 mAh', '6000 mAh'],

  displaySizes: ['5.5"', '6.1"', '6.5"', '6.7"', '7.0"'],

  printerTechnology: ['Laser', 'Inkjet', 'Thermal', 'Dot Matrix'],

  colorModes: ['Monochrome', 'Colour'],

  duplexModes: ['Manual', 'Automatic'],

  raidLevels: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'],

  networkSpeeds: ['100 Mbps', '1 Gbps', '2.5 Gbps', '10 Gbps', '40 Gbps', '100 Gbps'],

  displayInputs: ['HDMI', 'DisplayPort', 'VGA', 'DVI', 'USB-C', 'Thunderbolt'],

  networkPorts: ['4', '8', '16', '24', '48'],

  networkInterfaces: ['2 x 1GbE', '4 x 1GbE', '2 x 10GbE', '4 x 10GbE'],
};

const SPEC_FIELDS = {
  // =========================
  // Common
  // =========================

  manufacturer: {
    key: 'manufacturer',
    label: 'Manufacturer',
    type: 'select',
    optionType: 'manufacturers',
  },

  model: {
    key: 'model',
    label: 'Model',
  },

  serialNumber: {
    key: 'serialNumber',
    label: 'Serial Number',
  },

  // =========================
  // Computer Specs
  // =========================

  processor: {
    key: 'processor',
    label: 'Processor',
    type: 'select',
    optionType: 'processors',
  },

  ram: {
    key: 'ram',
    label: 'Memory (RAM)',
    type: 'select',
    optionType: 'ram',
  },

  storage: {
    key: 'storage',
    label: 'Storage',
    type: 'select',
    optionType: 'storage',
  },

  operatingSystem: {
    key: 'operatingSystem',
    label: 'Operating System',
    type: 'select',
    optionType: 'os',
  },

  // =========================
  // Monitor
  // =========================

  screenSize: {
    key: 'screenSize',
    label: 'Screen Size',
    type: 'select',
    options: SPEC_OPTIONS.screenSizes,
  },

  resolution: {
    key: 'resolution',
    label: 'Resolution',
    type: 'select',
    options: SPEC_OPTIONS.resolutions,
  },
  refreshRate: {
    key: 'refreshRate',
    label: 'Refresh Rate',
    type: 'select',
    options: SPEC_OPTIONS.refreshRates,
  },

  displayInput: {
    key: 'displayInput',
    label: 'Display Input',
    type: 'select',
    options: SPEC_OPTIONS.displayInputs,
  },

  // =========================
  // Mobile
  // =========================

  imei1: {
    key: 'imei1',
    label: 'IMEI 1',
  },

  imei2: {
    key: 'imei2',
    label: 'IMEI 2',
  },
  battery: {
    key: 'battery',
    label: 'Battery',
    type: 'select',
    options: SPEC_OPTIONS.batteryCapacity,
  },

  display: {
    key: 'display',
    label: 'Display Size',
    type: 'select',
    options: SPEC_OPTIONS.displaySizes,
  },

  // =========================
  // Printer
  // =========================

  printerType: {
    key: 'printerType',
    label: 'Printer Type',
    type: 'select',
    options: SPEC_OPTIONS.printerTypes,
  },

  connectivity: {
    key: 'connectivity',
    label: 'Connectivity',
    type: 'select',
    options: SPEC_OPTIONS.connectivity,
  },
  technology: {
    key: 'technology',
    label: 'Technology',
    type: 'select',
    options: SPEC_OPTIONS.printerTechnology,
  },

  colorMode: {
    key: 'colorMode',
    label: 'Print Mode',
    type: 'select',
    options: SPEC_OPTIONS.colorModes,
  },

  duplex: {
    key: 'duplex',
    label: 'Duplex Printing',
    type: 'select',
    options: SPEC_OPTIONS.duplexModes,
  },

  // =========================
  // Server
  // =========================

  raid: {
    key: 'raid',
    label: 'RAID',
    type: 'select',
    options: SPEC_OPTIONS.raidLevels,
  },

  network: {
    key: 'network',
    label: 'Network Adapter',
    type: 'select',
    options: SPEC_OPTIONS.networkInterfaces,
  },

  // =========================
  // Network
  // =========================

  deviceType: {
    key: 'deviceType',
    label: 'Device Type',
    type: 'select',
    options: SPEC_OPTIONS.deviceTypes,
  },

  networkPorts: {
    key: 'networkPorts',
    label: 'RJ45 Ports',
    type: 'select',
    options: SPEC_OPTIONS.networkPorts,
  },

  managementIP: {
    key: 'managementIP',
    label: 'Management IP',
  },
  speed: {
    key: 'speed',
    label: 'Speed',
    type: 'select',
    options: SPEC_OPTIONS.networkSpeeds,
  },

  macAddress: {
    key: 'macAddress',
    label: 'MAC Address',
  },

  firmware: {
    key: 'firmware',
    label: 'Firmware Version',
  },
};

const PURCHASE_FIELDS = {
  invoiceNumber: {
    key: 'invoiceNumber',
    label: 'Invoice Number',
  },

  poNumber: {
    key: 'poNumber',
    label: 'Purchase Order Number',
  },

  vendor: {
    key: 'vendor',
    label: 'Vendor',
  },

  purchasePrice: {
    key: 'purchasePrice',
    label: 'Purchase Price (₹)',
    type: 'number',
  },

  purchaseDate: {
    key: 'purchaseDate',
    label: 'Purchase Date',
    type: 'date',
  },

  warrantyExpiry: {
    key: 'warrantyExpiry',
    label: 'Warranty Expiry',
    type: 'date',
  },

  warrantyType: {
    key: 'warrantyType',
    label: 'Warranty Type',
    type: 'select',
    options: ['Manufacturer Warranty', 'Extended Warranty', 'AMC', 'No Warranty'],
  },

  remarks: {
    key: 'remarks',
    label: 'Remarks',
    type: 'textarea',
  },
};

const AssetSpecifications = {
  Laptop: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.processor,
    SPEC_FIELDS.ram,
    SPEC_FIELDS.storage,
    SPEC_FIELDS.operatingSystem,
  ],

  Desktop: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.processor,
    SPEC_FIELDS.ram,
    SPEC_FIELDS.storage,
    SPEC_FIELDS.operatingSystem,
  ],

  Monitor: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.screenSize,
    SPEC_FIELDS.resolution,
    SPEC_FIELDS.refreshRate,
    SPEC_FIELDS.displayInput,
  ],

  Mobile: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.processor,
    SPEC_FIELDS.ram,
    SPEC_FIELDS.storage,
    SPEC_FIELDS.operatingSystem,
    SPEC_FIELDS.battery,
    SPEC_FIELDS.display,
    SPEC_FIELDS.imei1,
    SPEC_FIELDS.imei2,
  ],

  Printer: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.technology,
    SPEC_FIELDS.colorMode,
    SPEC_FIELDS.connectivity,
    SPEC_FIELDS.duplex,
  ],

  Server: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.processor,
    SPEC_FIELDS.ram,
    SPEC_FIELDS.storage,
    SPEC_FIELDS.raid,
    SPEC_FIELDS.network,
    SPEC_FIELDS.operatingSystem,
  ],

  Network: [
    SPEC_FIELDS.manufacturer,
    SPEC_FIELDS.model,
    SPEC_FIELDS.serialNumber,
    SPEC_FIELDS.deviceType,
    SPEC_FIELDS.networkPorts,
    SPEC_FIELDS.speed,
    SPEC_FIELDS.macAddress,
    SPEC_FIELDS.firmware,
  ],
};

const PURCHASE_LAYOUT = [
  PURCHASE_FIELDS.invoiceNumber,
  PURCHASE_FIELDS.poNumber,
  PURCHASE_FIELDS.vendor,
  PURCHASE_FIELDS.purchasePrice,
  PURCHASE_FIELDS.purchaseDate,
  PURCHASE_FIELDS.warrantyExpiry,
  PURCHASE_FIELDS.warrantyType,
  PURCHASE_FIELDS.remarks,
];

function renderPurchaseFields(containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  let html = '';

  PURCHASE_LAYOUT.forEach((field) => {
    switch (field.type) {
      case 'select':
        html += `
                    <div class="mb-3">

                        <label class="form-label">
                            ${field.label}
                        </label>

                        <select
                            id="${field.key}"
                            class="form-select">

                            ${field.options
                              .map(
                                (option) => `
                                <option value="${option}">
                                    ${option}
                                </option>
                            `
                              )
                              .join('')}

                        </select>

                    </div>
                `;

        break;

      case 'date':
        html += `
                    <div class="mb-3">

                        <label class="form-label">
                            ${field.label}
                        </label>

                        <input
                            type="date"
                            id="${field.key}"
                            class="form-control">

                    </div>
                `;

        break;

      case 'number':
        html += `
                    <div class="mb-3">

                        <label class="form-label">
                            ${field.label}
                        </label>

                        <input
                            type="number"
                            id="${field.key}"
                            class="form-control">

                    </div>
                `;

        break;

      case 'textarea':
        html += `
                    <div class="mb-3">

                        <label class="form-label">
                            ${field.label}
                        </label>

                        <textarea
                            id="${field.key}"
                            rows="3"
                            class="form-control"></textarea>

                    </div>
                `;

        break;

      default:
        html += `
                    <div class="mb-3">

                        <label class="form-label">
                            ${field.label}
                        </label>

                        <input
                            id="${field.key}"
                            class="form-control">

                    </div>
                `;
    }
  });

  container.innerHTML = html;
}

function renderAssetReview() {
  const container = document.getElementById('assetReviewContainer');

  if (!container) return;

  const assetId = document.getElementById('assetId')?.value || '-';

  const assetName = document.getElementById('assetName')?.value || '-';

  const category = document.getElementById('assetCategory')?.value || '-';

  const specs = AssetSpecifications[category] || [];

  let specificationRows = '';

  let purchaseRows = '';

  specs.forEach((field) => {
    const value = document.getElementById(`addSpec_${field.key}`)?.value || '-';

    specificationRows += `

        <tr>

            <th width="35%">

                ${field.label}

            </th>

            <td>

                ${value}

            </td>

        </tr>

    `;
  });

  PURCHASE_LAYOUT.forEach((field) => {
    const value = document.getElementById(field.key)?.value || '-';

    purchaseRows += `

        <tr>

            <th width="35%">

                ${field.label}

            </th>

            <td>

                ${value}

            </td>

        </tr>

    `;
  });

  const location = document.getElementById('assetLocation')?.value || '-';

  container.innerHTML = `

        <div class="card">

            <div class="card-body">

                <h5 class="mb-4">

                    <i class="fas fa-check-circle text-success me-2"></i>

                    Review Asset

                </h5>

                <div class="card-header bg-primary text-white">

                    <i class="fas fa-folder-open me-2"></i>

                    Basic Information

                </div>

                <table class="table table-bordered">

                    <tr>

                        <th width="35%">
                            Asset ID
                        </th>

                        <td>${assetId}</td>

                    </tr>

                    <tr>

                        <th>
                            Asset Name
                        </th>

                        <td>${assetName}</td>

                    </tr>

                    <tr>

                        <th>
                            Category
                        </th>

                        <td>${category}</td>

                    </tr>

                    <tr>

                        <th>
                            Location
                        </th>

                        <td>${location}</td>

                    </tr>

                </table>

                <h5 class="mt-4">

                    <div class="card-header bg-primary text-white">

                        <i class="fas fa-microchip text-white me-2"></i>

                        Technical Specifications

                    </div>

                </h5>

                <table class="table table-bordered">

                    ${specificationRows}

                </table>

                <h5 class="mt-4">

                    <div class="card-header bg-primary text-white">

                        <i class="fas fa-file-invoice-dollar text-white me-2"></i>

                        Purchase Details

                    </div>

                </h5>

                <table class="table table-bordered">

                    ${purchaseRows}

                </table>

            </div>

        </div>

    `;
}

function renderEditAssetReview() {
  const container = document.getElementById('EditAssetReviewContainer');

  if (!container) return;

  const assetId = document.getElementById('editAssetId')?.value || '-';

  const assetName = document.getElementById('editAssetName')?.value || '-';

  const category = document.getElementById('editAssetCategory')?.value || '-';

  const location = document.getElementById('editAssetLocation')?.value || '-';

  const specs = getSpecificationTemplate(category);

  let specificationRows = '';

  specs.forEach((field) => {
    const value = document.getElementById(`editSpec_${field.key}`)?.value || '-';

    specificationRows += `
            <tr>
                <th width="35%">${field.label}</th>
                <td>${value}</td>
            </tr>
        `;
  });

  let purchaseRows = '';

  PURCHASE_LAYOUT.forEach((field) => {
    const value = document.getElementById(field.key)?.value || '-';

    purchaseRows += `
            <tr>
                <th width="35%">${field.label}</th>
                <td>${value}</td>
            </tr>
        `;
  });

  container.innerHTML = `

<div class="card">

    <div class="card-body">

        <h5 class="mb-4">
            <i class="fas fa-check-circle text-success me-2"></i>
            Review Changes
        </h5>

        <div class="card-header bg-primary text-white">
            Basic Information
        </div>

        <table class="table table-bordered">

            <tr><th>Asset ID</th><td>${assetId}</td></tr>

            <tr><th>Asset Name</th><td>${assetName}</td></tr>

            <tr><th>Category</th><td>${category}</td></tr>

            <tr><th>Location</th><td>${location}</td></tr>

        </table>

        <div class="card-header bg-primary text-white mt-3">
            Technical Specifications
        </div>

        <table class="table table-bordered">

            ${specificationRows}

        </table>

        <div class="card-header bg-primary text-white mt-3">
            Purchase Details
        </div>

        <table class="table table-bordered">

            ${purchaseRows}

        </table>

    </div>

</div>

`;
}

function getSpecificationTemplate(category) {
  return AssetSpecifications[category] || [];
}

function buildSpecificationFields(category, values = {}, prefix = 'spec') {
  const specs = getSpecificationTemplate(category);

  return specs
    .map((field) => {
      if (field.type === 'select') {
        const options = field.optionType
          ? SPEC_OPTIONS[field.optionType]?.[category] || []
          : field.options || [];
        return `
            <div class="mb-3">

                <label class="form-label">
                    ${field.label}
                </label>

                <select
                    class="form-select"
                    id="${prefix}_${field.key}">

                    ${options
                      .map(
                        (option) => `
                        <option
                            value="${option}"
                            ${values[field.key] === option ? 'selected' : ''}>
                            ${option}
                        </option>
                    `
                      )
                      .join('')}

                </select>

            </div>
        `;
      }

      return `

        <div class="mb-3">

            <label class="form-label">

                ${field.label}

            </label>

            <input
                type="text"
                class="form-control"
                id="${prefix}_${field.key}"
                value="${values[field.key] || ''}"
            >

                </div>
    `;
    })
    .join('');
}

function renderSpecificationFields(categorySelectId, containerId, values = {}, prefix = 'spec') {
  const category = document.getElementById(categorySelectId).value;

  document.getElementById(containerId).innerHTML = buildSpecificationFields(
    category,
    values,
    prefix
  );
}

function buildSpecificationCard(asset) {
  const specs = asset.specifications || {};

  const fields = getSpecificationTemplate(asset.category);

  return `

        <div class="asset-info-card">

            <h6>

                <i class="fas fa-microchip text-primary me-2"></i>

                Specifications

            </h6>

            <div class="info-grid">

                ${fields
                  .map(
                    (field) => `

                    <div>

                        ${field.label}

                    </div>

                    <strong>

                        ${specs[field.key] || 'Not Specified'}

                    </strong>

                `
                  )
                  .join('')}

            </div>

        </div>

    `;
}

function validateCurrentStep() {
  switch (ASSET_WIZARD.currentStep) {
    case 1:
      return validateStep1();

    case 2:
      return validateStep2();

    case 3:
      return validateStep3();

    default:
      return true;
  }
}

function validateStep1() {
  const required = ['assetId', 'assetName', 'assetCategory', 'assetLocation'];

  return validateRequiredFields(required);
}

function validateStep2() {
  const category = document.getElementById('assetCategory')?.value;

  if (!category) return false;

  const requiredFields = AssetSpecifications[category].map((field) => `addSpec_${field.key}`);

  return validateRequiredFields(requiredFields);
}

function validateStep3() {
  return validateRequiredFields(['vendor', 'purchaseDate']);
}

function validateRequiredFields(fields) {
  let valid = true;

  fields.forEach((id) => {
    const field = document.getElementById(id);

    if (!field) return;

    const value = field.value.trim();

    if (!value) {
      field.classList.add('is-invalid');

      // Focus the first invalid field
      if (valid) {
        field.focus();
      }

      // Remove the red border when user starts typing
      field.addEventListener('input', () => field.classList.remove('is-invalid'), { once: true });

      // Also works for dropdowns
      field.addEventListener('change', () => field.classList.remove('is-invalid'), { once: true });

      valid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });

  return valid;
}

function loadAssets() {
  let assetList = getAssets();

  const assignments = getAssignments();

  const totalAssets = assetList.length;

  const assignedAssets = assignments.filter((a) => a.status === 'Assigned').length;

  const availableAssets = assetList.filter((a) => a.status === 'Available').length;

  const expiringWarranty = getExpiringAssets(30).length;

  const searchText = document.getElementById('assetSearch')?.value || '';

  setActiveMenu('nav-assets');

  switch (assetFilter) {
    case 'assigned':
      assetList = assetList.filter((asset) =>
        assignments.some((a) => a.assetId === asset.id && a.status === 'Assigned')
      );

      break;

    case 'available':
      assetList = assetList.filter((asset) => asset.status === 'Available');

      break;

    case 'warranty':
      assetList = getExpiringAssets(30);

      break;
  }

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Assets</h2>
        <p class="text-muted">
            Manage company assets and inventory.
        </p>
    </div>

</div>

<div class="row g-3 mb-4">

    <div class="col-md-3">

        <div class="card dashboard-card h-100" onclick="setAssetFilter('all')">

            <div class="card-body">

                <div class="text-muted small">
                    Total Assets
                </div>

                <h2>${totalAssets}</h2>

                <i class="fas fa-laptop fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card h-100" data-filter="assigned" onclick="setAssetFilter('assigned')">

            <div class="card-body">

                <div class="text-muted small">
                    Assigned
                </div>

                <h2>${assignedAssets}</h2>

                <i class="fas fa-user-check fa-2x text-success"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card h-100" data-filter="available" onclick="setAssetFilter('available')">

            <div class="card-body">

                <div class="text-muted small">
                    Available
                </div>

                <h2>${availableAssets}</h2>

                <i class="fas fa-box-open fa-2x text-info"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card h-100" data-filter="warranty" onclick="setAssetFilter('warranty')">

            <div class="card-body">

                <div class="text-muted small">
                    Warranty (30 Days)
                </div>

                <h2>${expiringWarranty}</h2>

                <i class="fas fa-shield-alt fa-2x text-warning"></i>

            </div>

        </div>

    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar">

        <input
            type="text"
            class="form-control search-input"
            placeholder="Search asset..."
            id="assetSearch"
        >

        <select
            id="assetLocationFilter"
            class="form-select"
            onchange="filterAssets()">

            <option value="">
                All Locations
            </option>

            ${getLocations()
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
            onclick="showAddAssetModal()"
>
            <i class="fas fa-plus"></i>
            Add Asset
        </button>

    </div>

    <table class="table align-middle mt-4">

        <thead>
            <tr>
                <th>Asset</th>
                <th>Assigned To</th>
                <th>Location</th>
                <th>Warranty</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>

        </thead>

        <tbody>

            ${assetList
              .map((asset) => {
                const activeAssignment = getAssignments().find(
                  (a) => a.assetId === asset.id && a.status === 'Assigned'
                );

                const displayStatus = activeAssignment ? 'Assigned' : asset.status;

                return `
                <tr>

                    <td>
                        <div class="d-flex flex-column">
                            <div class="asset-name">

                                ${asset.name}

                            </div>

                            <div class="asset-meta">
                                ${asset.id}
                            </div>

                            <div class="asset-meta">
                                ${asset.category}
                            </div>

                            ${
                              asset.specifications?.serialNumber
                                ? `<div class="asset-meta">
                                        S/N : ${asset.specifications?.serialNumber}
                                    </div>`
                                : ''
                            }
                        </div>
                    </td>

                    <td>
                        ${
                          activeAssignment
                            ? `
                                    <div>
                                        <i class="fas fa-user text-primary"></i>
                                        ${activeAssignment.employeeName}
                                    </div>
                                `
                            : `
                                    <span class="text-muted">
                                        <i class="fas fa-box"></i>
                                        In Inventory
                                    </span>
                                `
                        }
                    </td>

                    <td>
                        ${asset.location || '-'}
                    </td>

                    <td>
                        ${
                          asset.purchase?.warrantyExpiry
                            ? (() => {
                                const days = Math.ceil(
                                  (new Date(asset.purchase?.warrantyExpiry) - new Date()) /
                                    (1000 * 60 * 60 * 24)
                                );

                                if (days < 0)
                                  return `<span class="badge bg-danger">
                                                    Expired
                                                </span>`;

                                if (days <= 30)
                                  return `<span class="badge bg-danger">
                                                    ${days} Days
                                                </span>`;

                                if (days <= 90)
                                  return `<span class="badge bg-warning">
                                                    ${days} Days
                                                </span>`;

                                return `<span class="badge bg-success">
                                                ${days} Days
                                            </span>`;
                              })()
                            : '-'
                        }
                    </td>

                    <td>
                        <span class="status-badge ${displayStatus.toLowerCase()}">
                            ${displayStatus}
                        </span>
                    </td>

                    <td class="text-nowrap">

                        <button
                            class="btn btn-light btn-sm asset-action-btn"
                            title="View"
                            onclick="viewAsset('${asset.id}')">

                            <i class="fas fa-eye"></i>

                        </button>

                        ${
                          asset.status !== 'Transferred'
                            ? `
                            <button
                                class="btn btn-light btn-sm asset-action-btn"
                                title="Edit"
                                onclick="showEditAssetModal('${asset.id}')">

                                <i class="fas fa-pen"></i>

                            </button>

                            <button
                                class="btn btn-light btn-sm asset-action-btn text-danger"
                                title="Delete"
                                onclick="deleteAsset('${asset.id}')">

                                <i class="fas fa-trash"></i>

                            </button>
                            `
                            : ''
                        }

                    </td>

                </tr>
                `;
              })
              .join('')}

        </tbody>

    </table>

</div>

`;
  const searchInput = document.getElementById('assetSearch');

  if (searchInput) {
    searchInput.addEventListener('input', filterAssets);
  }

  document.querySelectorAll('.dashboard-card').forEach((card) => {
    card.classList.remove('active');

    if (card.dataset.filter === assetFilter) {
      card.classList.add('active');
    }
  });
}

function setAssetFilter(filter) {
  assetFilter = filter;

  loadAssets();
}

function removeExistingAssetModal() {
  const existingModal = document.getElementById('addAssetModal');

  if (existingModal) {
    existingModal.remove();
  }
}

function buildAddAssetModal() {
  return `
    <div class="modal fade"
         id="addAssetModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        Add Asset
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">

                <!-- Wizard Progress -->
                    <div class="mb-4">

                        <div class="d-flex justify-content-between align-items-center mb-2">

                            <span
                                id="wizardStepBadge"
                                class="badge bg-primary">
                                Step 1 of 4
                            </span>

                            <small
                                id="wizardStepTitle"
                                class="text-muted">
                                Basic Information
                            </small>

                        </div>

                        <div class="progress" style="height: 6px;">

                            <div
                                id="assetWizardProgress"
                                class="progress-bar"
                                style="width:25%">
                            </div>

                        </div>

                    </div>

                    <!-- ========================= -->
                    <!-- STEP 1 : Basic Information -->
                    <!-- ========================= -->
                    <div id="wizard-step-1">
                        <div class="mb-3">
                            <label>Asset ID</label>

                            <input
                                id="assetId"
                                class="form-control">
                        </div>

                        <div class="mb-3">
                            <label>Asset Name</label>

                            <input
                                id="assetName"
                                class="form-control">
                        </div>

                        <div class="mb-3">

                            <label class="form-label">

                                Category

                            </label>

                            <select
                            id="assetCategory"
                            class="form-select"
                            onchange="
                                renderSpecificationFields(
                                    'assetCategory',
                                    'technicalFieldsContainer',
                                    {},
                                    'addSpec'
                                )
                            ">

                                <option>Laptop</option>
                                <option>Desktop</option>
                                <option>Monitor</option>
                                <option>Mobile</option>
                                <option>Printer</option>
                                <option>Server</option>
                                <option>Network</option>

                            </select>

                        </div>

                        <div class="mb-3">

                            <label>Location</label>

                            <select
                                id="assetLocation"
                                class="form-control">

                                ${getLocations()
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

                    </div>

                    <!-- ================================ -->
                    <!-- STEP 2 : Technical Specifications -->
                    <!-- ================================ -->
                    <div id="wizard-step-2" class="d-none">
                        <h6 class="fw-bold mb-3">

                            <i class="fas fa-microchip me-2 text-primary"></i>

                            Specifications

                        </h6>

                        <div id="technicalFieldsContainer">

                        </div>
                    </div>

                    <!-- ========================= -->
                    <!-- STEP 3 : Purchase Details -->
                    <!-- ========================= -->
                    <div id="wizard-step-3" class="d-none">

                        <div id="purchaseFieldsContainer"></div>

                    </div>

                    <!-- ====================== -->
                    <!-- STEP 4 : Review & Save -->
                    <!-- ====================== -->
                    <div id="wizard-step-4" class="d-none">

                        <div class="alert alert-info">

                            <div id="assetReviewContainer"></div>

                        </div>

                    </div>

                </div>

                <div class="modal-footer justify-content-between">

                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <div>

                        <button
                            id="wizardPreviousBtn"
                            class="btn btn-outline-secondary"
                            disabled>
                            Previous
                        </button>

                        <button
                            id="wizardNextBtn"
                            class="btn btn-primary">
                            Next
                        </button>

                        <button
                            id="wizardSaveBtn"
                            class="btn btn-success d-none"
                            onclick="saveAsset()">
                            Save Asset
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>
    `;
}

function buildEditAssetModal(asset) {
  return `
    <div class="modal fade"
         id="editAssetModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        Edit Asset
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">

                <!-- Wizard Progress -->
                    <div class="mb-4">

                        <div class="d-flex justify-content-between align-items-center mb-2">

                            <span
                                id="editWizardStepBadge"
                                class="badge bg-primary">
                                Step 1 of 4
                            </span>

                            <small
                                id="editWizardStepTitle"
                                class="text-muted">
                                Basic Information
                            </small>

                        </div>

                        <div class="progress" style="height: 6px;">

                            <div
                                id="editAssetWizardProgress"
                                class="progress-bar"
                                style="width:25%">
                            </div>

                        </div>

                    </div>

                    <!-- ========================= -->
                    <!-- STEP 1 : Basic Information -->
                    <!-- ========================= -->
                    <div id="editWizard-step-1">
                        <div class="mb-3">
                            <label>Asset ID</label>

                            <input
                                id="editAssetId"
                                class="form-control"
                                readonly
                                value="${asset.id}">
                        </div>

                        <div class="mb-3">
                            <label>Asset Name</label>

                            <input
                                id="editAssetName"
                                class="form-control"
                                value="${asset.name}">
                        </div>

                        <div class="mb-3">

                            <label class="form-label">

                                Category

                            </label>

                            <select
                            id="editAssetCategory"
                            class="form-select"
                            onchange="
                                renderSpecificationFields(
                                    'editAssetCategory',
                                    'editTechnicalFieldsContainer',
                                    {},
                                    'editSpec'
                                )
                            ">

                                <option>Laptop</option>
                                <option>Desktop</option>
                                <option>Monitor</option>
                                <option>Mobile</option>
                                <option>Printer</option>
                                <option>Server</option>
                                <option>Network</option>

                            </select>

                        </div>

                        <div class="mb-3">

                            <label>Location</label>

                            <select
                                id="editAssetLocation"
                                class="form-control">

                                ${getLocations()
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

                    </div>

                    <!-- ================================ -->
                    <!-- STEP 2 : Technical Specifications -->
                    <!-- ================================ -->
                    <div id="editWizard-step-2" class="d-none">
                        <h6 class="fw-bold mb-3">

                            <i class="fas fa-microchip me-2 text-primary"></i>

                            Specifications

                        </h6>

                        <div id="editTechnicalFieldsContainer">

                        </div>
                    </div>

                    <!-- ========================= -->
                    <!-- STEP 3 : Purchase Details -->
                    <!-- ========================= -->
                    <div id="editWizard-step-3" class="d-none">

                        <div id="editPurchaseFieldsContainer"></div>

                    </div>

                    <!-- ====================== -->
                    <!-- STEP 4 : Review & Save -->
                    <!-- ====================== -->
                    <div id="editWizard-step-4" class="d-none">

                        <div class="alert alert-info">

                            <div id="EditAssetReviewContainer"></div>

                        </div>

                    </div>

                </div>

                <div class="modal-footer justify-content-between">

                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Cancel
                    </button>

                    <div>

                        <button
                            id="editWizardPreviousBtn"
                            class="btn btn-outline-secondary"
                            disabled>
                            Previous
                        </button>

                        <button
                            id="editWizardNextBtn"
                            class="btn btn-primary">
                            Next
                        </button>

                        <button
                            id="editWizardSaveBtn"
                            class="btn btn-success d-none"
                            onclick="updateAsset('${asset.id}')">
                            Update Asset
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>
    `;
}

function initializeAddAssetModal(modalElement) {
  document.getElementById('wizardNextBtn').addEventListener('click', nextWizardStep);

  document.getElementById('wizardPreviousBtn').addEventListener('click', previousWizardStep);
}

const ASSET_WIZARD = {
  currentStep: 1,
  totalSteps: 4,
  stepTitles: [
    'Basic Information',
    'Technical Specifications',
    'Purchase Details',
    'Review & Save',
  ],
};

let editWizardStep = 1;

const EDIT_WIZARD_TITLES = {
  1: 'Basic Information',
  2: 'Technical Specifications',
  3: 'Purchase Details',
  4: 'Review & Update',
};

function showWizardStep(step) {
  for (let i = 1; i <= ASSET_WIZARD.totalSteps; i++) {
    const section = document.getElementById(`wizard-step-${i}`);

    if (!section) continue;

    section.classList.toggle('d-none', i !== step);
  }
}

function nextWizardStep() {
  if (!validateCurrentStep()) {
    alert('Please complete all required fields.');

    return;
  }
  if (ASSET_WIZARD.currentStep >= ASSET_WIZARD.totalSteps) return;

  ASSET_WIZARD.currentStep++;

  showWizardStep(ASSET_WIZARD.currentStep);

  if (ASSET_WIZARD.currentStep === 4) {
    renderAssetReview();
  }

  updateWizardUI();
}

function previousWizardStep() {
  if (ASSET_WIZARD.currentStep <= 1) return;

  ASSET_WIZARD.currentStep--;

  showWizardStep(ASSET_WIZARD.currentStep);

  updateWizardUI();
}

function updateWizardUI() {
  const previousBtn = document.getElementById('wizardPreviousBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const saveBtn = document.getElementById('wizardSaveBtn');
  const stepBadge = document.getElementById('wizardStepBadge');
  const stepTitle = document.getElementById('wizardStepTitle');
  const progress = document.getElementById('assetWizardProgress');

  const percent = (ASSET_WIZARD.currentStep / ASSET_WIZARD.totalSteps) * 100;

  progress.style.width = `${percent}%`;

  stepBadge.textContent = `Step ${ASSET_WIZARD.currentStep} of ${ASSET_WIZARD.totalSteps}`;

  stepTitle.textContent = ASSET_WIZARD.stepTitles[ASSET_WIZARD.currentStep - 1];

  previousBtn.disabled = ASSET_WIZARD.currentStep === 1;

  nextBtn.classList.toggle('d-none', ASSET_WIZARD.currentStep === ASSET_WIZARD.totalSteps);

  saveBtn.classList.toggle('d-none', ASSET_WIZARD.currentStep !== ASSET_WIZARD.totalSteps);
}

function showAddAssetModal() {
  removeExistingAssetModal();

  const modalHtml = buildAddAssetModal();

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modalElement = document.getElementById('addAssetModal');

  const modal = new bootstrap.Modal(modalElement);

  initializeAddAssetModal(modalElement);

  modal.show();

  ASSET_WIZARD.currentStep = 1;

  showWizardStep(ASSET_WIZARD.currentStep);
  updateWizardUI();

  renderSpecificationFields('assetCategory', 'technicalFieldsContainer', {}, 'addSpec');
  renderPurchaseFields('purchaseFieldsContainer');
}

function showEditAssetModal(assetId) {
  const asset = getAssets().find((a) => a.id === assetId);

  if (!asset) {
    alert('Asset not found.');
    return;
  }
  const existingModal = document.getElementById('editAssetModal');

  if (existingModal) {
    existingModal.remove();
  }
  const modalHtml = buildEditAssetModal(asset);

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modalElement = document.getElementById('editAssetModal');
  document.getElementById('editAssetCategory').value = asset.category;
  document.getElementById('editAssetLocation').value = asset.location;
  renderSpecificationFields(
    'editAssetCategory',
    'editTechnicalFieldsContainer',
    asset.specifications || {},
    'editSpec'
  );
  renderPurchaseFields('editPurchaseFieldsContainer', 'editPurchase');
  // Populate purchase details
  if (asset.purchase) {
    PURCHASE_LAYOUT.forEach((field) => {
      const input = document.getElementById(field.key);

      if (input) {
        input.value = asset.purchase[field.key] || '';
      }
    });
  }
  document.getElementById('editWizardPreviousBtn').onclick = () => {
    if (editWizardStep > 1) {
      editWizardStep--;

      updateEditWizard();
    }
  };
  document.getElementById('editWizardNextBtn').onclick = () => {
    if (editWizardStep < 4) {
      editWizardStep++;

      if (editWizardStep === 4) {
        renderEditAssetReview();
      }

      updateEditWizard();
    }
  };
  editWizardStep = 1;

  updateEditWizard();

  const modal = new bootstrap.Modal(document.getElementById('editAssetModal'));

  modal.show();
}

function updateEditWizard() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`editWizard-step-${i}`).classList.add('d-none');
  }

  document.getElementById(`editWizard-step-${editWizardStep}`).classList.remove('d-none');

  document.getElementById('editWizardStepBadge').textContent = `Step ${editWizardStep} of 4`;

  document.getElementById('editWizardStepTitle').textContent = EDIT_WIZARD_TITLES[editWizardStep];

  document.getElementById('editAssetWizardProgress').style.width = `${editWizardStep * 25}%`;

  document.getElementById('editWizardPreviousBtn').disabled = editWizardStep === 1;

  document.getElementById('editWizardNextBtn').classList.toggle('d-none', editWizardStep === 4);

  document.getElementById('editWizardSaveBtn').classList.toggle('d-none', editWizardStep !== 4);
}

function saveAsset() {
  const asset = {
    id: document.getElementById('assetId').value.trim(),

    name: document.getElementById('assetName').value.trim(),

    category: document.getElementById('assetCategory').value,

    location: document.getElementById('assetLocation').value,

    status: 'Available',

    retiredDate: '',

    retirementReason: '',

    transferredTo: '',

    previousAssetId: '',

    transferDate: '',

    transferRemarks: '',
  };

  const specifications = {};

  getSpecificationTemplate(asset.category).forEach((field) => {
    specifications[field.key] = document.getElementById(`addSpec_${field.key}`)?.value.trim() || '';
  });

  asset.specifications = specifications;

  if (!asset.specifications) {
    asset.specifications = {};
  }

  asset.specifications.serialNumber = document.getElementById('addSpec_serialNumber').value.trim();

  const purchase = {};

  PURCHASE_LAYOUT.forEach((field) => {
    purchase[field.key] = document.getElementById(field.key)?.value.trim() || '';
  });

  asset.purchase = purchase;

  if (!asset.id || !asset.name) {
    alert('Asset ID and Asset Name are required.');

    return;
  }

  addAsset(asset);

  addAssetHistory(asset.id, 'Added to Inventory', `${asset.name} added to inventory`);

  bootstrap.Modal.getInstance(document.getElementById('addAssetModal')).hide();

  loadAssets();
}

function updateAsset(assetId) {
  const assets = getAssets();

  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    alert('Asset not found.');
    return;
  }

  // Basic Information
  asset.name = document.getElementById('editAssetName').value.trim();
  asset.category = document.getElementById('editAssetCategory').value;
  asset.location = document.getElementById('editAssetLocation').value;

  // Specifications
  asset.specifications = {};

  getSpecificationTemplate(asset.category).forEach((field) => {
    asset.specifications[field.key] = document.getElementById(`editSpec_${field.key}`)?.value || '';
  });

  // Purchase Details
  asset.purchase = {};

  PURCHASE_LAYOUT.forEach((field) => {
    const input = document.getElementById(field.key);

    asset.purchase[field.key] = input ? input.value : '';
  });

  // Save
  saveAssets(assets);

  addActivity(`${asset.name} updated`);

  addAssetHistory(asset.id, 'Updated', `${asset.name} information updated`);

  bootstrap.Modal.getInstance(document.getElementById('editAssetModal')).hide();

  loadAssets();
}

function deleteAsset(assetId) {
  const asset = getAssets().find((a) => a.id === assetId);

  if (asset.status === 'Transferred') {
    alert('Transferred assets cannot be deleted.');

    return;
  }

  const activeAssignment = getAssignments().find(
    (a) => a.assetId === assetId && a.status === 'Assigned'
  );

  if (activeAssignment) {
    alert('Assigned assets cannot be deleted.');

    return;
  }

  if (!confirm('Delete this asset?')) {
    return;
  }

  deleteAssetById(assetId);

  addAssetHistory(asset.id, 'Deleted', `${asset.name} removed from inventory`);

  loadAssets();
}

function getAssetIcon(category) {
  const icons = {
    Laptop: '💻',
    Desktop: '🖥️',
    Monitor: '🖥',
    Mobile: '📱',
    Printer: '🖨️',
    Server: '🖧',
    Network: '🌐',
    Tablet: '📲',
  };

  return icons[category] || '📦';
}

function viewAsset(assetId) {
  const assets = getAssets();

  const assignments = getAssignments();

  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return;
  }

  const history = getAssetHistory()
    .filter((h) => h.assetId === assetId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const totalAssignments = history.filter((h) => h.action === 'Assigned').length;

  const warrantyDaysRemaining = asset.purchase?.warrantyExpiry
    ? Math.ceil((new Date(asset.purchase.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const assetAgeDays = asset.purchase?.purchaseDate
    ? Math.ceil((new Date() - new Date(asset.purchase.purchaseDate)) / (1000 * 60 * 60 * 24))
    : null;

  const currentAssignment = getAssignments().find(
    (a) => a.assetId === assetId && a.status === 'Assigned'
  );

  const assignmentHistory = getAssignments()
    .filter((a) => a.assetId === assetId)
    .sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));

  const transferHistory = getAssetTransfers()
    .filter((t) => t.oldAssetId === asset.id || t.newAssetId === asset.id)
    .sort((a, b) => new Date(b.transferDate) - new Date(a.transferDate));

  const displayStatus = currentAssignment ? 'Assigned' : asset.status;

  const heroSection = `

    <div class="asset-hero">

        <div class="row align-items-center g-4">

            <div class="col-auto">

                <div class="asset-image">

                    ${getAssetIcon(asset.category)}

                </div>

            </div>

            <div class="col">

                <h2 class="fw-bold mb-1">

                    ${asset.name}

                </h2>

                <div class="asset-id">

                    ${asset.id}

                </div>

                <div class="mt-2">

                    <span class="status-badge ${displayStatus.toLowerCase()}">

                        ${displayStatus}

                    </span>

                </div>

                <div class="asset-subtitle mt-2">

                    ${asset.category}
                    •
                    ${asset.location || 'Unknown Location'}

                </div>

            </div>

        </div>

    </div>

    `;

  const statsSection = `
    <div class="row g-3 mb-4">

        <div class="col-md-3">

            <div class="asset-stat-card">

                <div class="asset-stat-icon">

                    <i class="fas fa-user"></i>

                </div>

                <div>

                    <small>Current Holder</small>

                    <h6>

                        ${currentAssignment ? currentAssignment.employeeName : 'Inventory'}

                    </h6>

                </div>

            </div>

        </div>

        <div class="col-md-3">

            <div class="asset-stat-card">

                <div class="asset-stat-icon">

                    <i class="fas fa-shield-alt"></i>

                </div>

                <div>

                    <small>Warranty</small>

                    <h6>

                        ${warrantyDaysRemaining ? warrantyDaysRemaining + ' Days' : '-'}

                    </h6>

                </div>

            </div>

        </div>

        <div class="col-md-3">

            <div class="asset-stat-card">

                <div class="asset-stat-icon">

                    <i class="fas fa-exchange-alt"></i>

                </div>

                <div>

                    <small>Assignments</small>

                    <h6>

                        ${totalAssignments}

                    </h6>

                </div>

            </div>

        </div>

        <div class="col-md-3">

            <div class="asset-stat-card">

                <div class="asset-stat-icon">

                    <i class="fas fa-calendar"></i>

                </div>

                <div>

                    <small>Asset Age</small>

                    <h6>

                        ${assetAgeDays ? assetAgeDays + ' Days' : '-'}

                    </h6>

                </div>

            </div>

        </div>

    </div>
    `;

  const infoSection = `
    <div class="row g-4">

        <div class="col-xl-4">

            <div class="asset-info-card">

                <h6>General Information</h6>

                <div class="info-grid">

                    <div>Asset ID</div>
                    <strong>${asset.id}</strong>

                    <div>Category</div>
                    <strong>${asset.category}</strong>

                    <div>Serial Number</div>
                    <strong>${asset.specifications?.serialNumber || '-'}</strong>

                    <div>Location</div>
                    <strong>${asset.location || '-'}</strong>

                </div>

            </div>

        </div>

        <div class="col-xl-4">

            <div class="asset-info-card">

                <h6>Purchase Information</h6>

                <div class="info-grid">

                    <div>Vendor</div>
                    <strong>${asset.purchase?.vendor || '-'}</strong>

                    <div>Purchase Date</div>
                    <strong>${asset.purchase?.purchaseDate || '-'}</strong>

                    <div>Warranty Expiry</div>
                    <strong>${asset.purchase?.warrantyExpiry || '-'}</strong>

                    <div>Current Holder</div>
                    <strong>
                        ${currentAssignment ? currentAssignment.employeeName : 'In Inventory'}
                    </strong>

                </div>

            </div>

        </div>

        <div class="col-xl-4">

            ${buildSpecificationCard(asset)}

        </div>

    </div>
    `;

  const actionSection = `
    <div class="d-flex justify-content-end my-4">

        <button
            class="btn btn-warning px-4"
            onclick="
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById('assetDetailsModal')
                );

                if(modal) modal.hide();

                showAssetTransferModal('${asset.id}');
            ">

            <i class="fas fa-exchange-alt me-2"></i>

            Transfer Asset

        </button>

    </div>
    `;

  const historySection = `

    <ul class="nav nav-tabs asset-tabs mb-4">

        <li class="nav-item">

            <button
                class="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#assignmentTab">

                <i class="fas fa-user me-2"></i>

                Assignment History

            </button>

        </li>

        <li class="nav-item">

            <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#transferTab">

                <i class="fas fa-exchange-alt me-2"></i>

                Transfer History

            </button>

        </li>

        <li class="nav-item">

            <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#timelineTab">

                <i class="fas fa-stream me-2"></i>

                Timeline

            </button>

        </li>

    </ul>

    <div class="tab-content">

        <div
            class="tab-pane fade show active"
            id="assignmentTab">

            ${buildAssignmentHistory(assignmentHistory)}

        </div>

        <div
            class="tab-pane fade"
            id="transferTab">

            ${buildTransferHistory(transferHistory)}

        </div>

        <div
            class="tab-pane fade"
            id="timelineTab">

            ${buildTimeline(history, asset)}

        </div>

    </div>
    `;

  const modalHtml = `
    <div class="modal fade"
         id="assetDetailsModal"
         tabindex="-1">

        <div class="modal-dialog modal-xl asset-details-modal">

            <div class="modal-content">

                <div class="modal-header">

                ${heroSection}

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>

                <div class="modal-body">

                    ${statsSection}

                    ${infoSection}

                    ${actionSection}

                    ${historySection}

                </div>

            </div>

        </div>

    </div>
    `;

  const existingModal = document.getElementById('assetDetailsModal');

  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  new bootstrap.Modal(document.getElementById('assetDetailsModal')).show();
}

function buildAssignmentHistory(assignmentHistory) {
  if (assignmentHistory.length === 0) {
    return `
            <p class="text-muted">

                No assignment history.

            </p>
        `;
  }

  return `

    <table class="table table-sm">

        <thead>

            <tr>

                <th>Employee</th>

                <th>Assigned</th>

                <th>Returned</th>

                <th>Status</th>

            </tr>

        </thead>

        <tbody>

            ${assignmentHistory
              .map(
                (item) => `

                <tr>

                    <td>

                        ${item.employeeName}

                    </td>

                    <td>

                        ${item.assignedDate}

                    </td>

                    <td>

                        ${item.returnedDate || '-'}

                    </td>

                    <td>

                        <span class="badge ${
                          item.status === 'Assigned' ? 'bg-success' : 'bg-secondary'
                        }">

                            ${item.status}

                        </span>

                    </td>

                </tr>

            `
              )
              .join('')}

        </tbody>

    </table>

    `;
}

function buildTransferHistory(transferHistory) {
  if (transferHistory.length === 0) {
    return `
            <p class="text-muted">

                No transfer history.

            </p>
        `;
  }

  return `

    <table class="table table-sm">

        <thead>

            <tr>

                <th>Old Asset</th>

                <th>New Asset</th>

                <th>From</th>

                <th>To</th>

                <th>Date</th>

            </tr>

        </thead>

        <tbody>

            ${transferHistory
              .map(
                (item) => `

                <tr>

                    <td>

                        ${item.oldAssetId}

                    </td>

                    <td>

                        ${item.newAssetId}

                    </td>

                    <td>

                        ${item.fromLocation}

                    </td>

                    <td>

                        ${item.toLocation}

                    </td>

                    <td>

                        ${item.transferDate}

                    </td>

                </tr>

            `
              )
              .join('')}

        </tbody>

    </table>

    `;
}

function buildTimeline(history, asset) {
  return `

    <div class="timeline mt-3">

        ${history
          .map(
            (item) => `

            <div class="timeline-item">

                <div class="timeline-dot ${
                  item.action === 'Assigned'
                    ? 'bg-success'
                    : item.action === 'Returned'
                      ? 'bg-warning'
                      : item.action === 'Updated'
                        ? 'bg-info'
                        : item.action === 'Deleted'
                          ? 'bg-danger'
                          : 'bg-primary'
                }"></div>

                <div class="timeline-content">

                    <strong>

                        ${item.action}

                    </strong>

                    <br>

                    ${item.details}

                    <br>

                    <small class="text-muted">

                        ${item.timestamp}

                    </small>

                </div>

            </div>

        `
          )
          .join('')}

        <div class="timeline-item">

            <div class="timeline-dot bg-secondary"></div>

            <div class="timeline-content">

                <strong>

                    Asset Purchased

                </strong>

                <br>

                <small class="text-muted">

                    Date : ${asset.purchase?.purchaseDate || 'Unknown Date'}<br>

                    Warranty Expiry : ${asset.purchase?.warrantyExpiry || 'Unknown Warranty Expiry'}

                </small>

            </div>

        </div>

    </div>

    `;
}

function filterAssets() {
  const searchText = document.getElementById('assetSearch').value.toLowerCase();

  const selectedLocation = document.getElementById('assetLocationFilter').value;

  const rows = document.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();

    const location = row.children[2]?.textContent.trim();

    const matchesSearch = text.includes(searchText);

    const matchesLocation = selectedLocation === '' || location.trim() === selectedLocation.trim();

    row.style.display = matchesSearch && matchesLocation ? '' : 'none';
  });
}

function saveAssetEdit() {
  const assetId = document.getElementById('editAssetId').value;

  const assets = getAssets();

  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return;
  }

  const oldAsset = {
    ...asset,
  };

  asset.name = document.getElementById('editAssetName').value;

  asset.category = document.getElementById('editAssetCategory').value;

  asset.status = document.getElementById('editAssetStatus').value;
  asset.specifications = asset.specifications || {};

  asset.specifications.serialNumber = document.getElementById('editAssetSerial').value;
  asset.purchase = asset.purchase || {};

  asset.purchase.vendor = document.getElementById('editAssetVendor').value;

  asset.purchase = asset.purchase || {};

  asset.purchase.purchaseDate = document.getElementById('editAssetPurchaseDate').value;

  asset.purchase ??= {};

  asset.purchase.warrantyExpiry = document.getElementById('editAssetWarrantyExpiry').value;

  const specifications = {};

  getSpecificationTemplate(asset.category).forEach((field) => {
    specifications[field.key] =
      document.getElementById(`editSpec_${field.key}`)?.value.trim() || '';
  });

  asset.specifications = specifications;
  if (!asset.specifications) {
    asset.specifications = {};
  }

  asset.specifications.serialNumber = document.getElementById('editAssetSerial').value.trim();

  if (asset.status === 'Retired') {
    asset.retirementReason = document.getElementById('retirementReason').value;

    if (!asset.retiredDate) {
      asset.retiredDate = formatDateTime();
    }
  }

  addActivity(`Asset ${asset.name} updated`);

  if (asset.status === 'Retired') {
    const activeAssignment = getAssignments().find(
      (a) => a.assetId === asset.id && a.status === 'Assigned'
    );

    if (activeAssignment) {
      alert('Asset is currently assigned and cannot be retired.');

      return;
    }
  }

  if (oldAsset.status !== 'Retired' && asset.status === 'Retired') {
    addAssetHistory(asset.id, 'Retired', `Reason: ${asset.retirementReason}`);
  }

  saveAssets(assets);

  const changes = [];

  if (oldAsset.name !== asset.name) changes.push(`Asset Name: ${oldAsset.name} → ${asset.name}`);

  if (oldAsset.category !== asset.category)
    changes.push(`Category: ${oldAsset.category} → ${asset.category}`);

  if (oldAsset.specifications?.serialNumber !== asset.specifications?.serialNumber)
    changes.push(
      `Serial Number: ${oldAsset.specifications?.serialNumber || '-'} → ${
        asset.specifications?.serialNumber || '-'
      }`
    );

  if (oldAsset.purchase?.vendor !== asset.purchase?.vendor)
    changes.push(`Vendor: ${oldAsset.purchase?.vendor || '-'} → ${asset.purchase?.vendor || '-'}`);

  if (oldAsset.purchase?.warrantyExpiry !== asset.purchase?.warrantyExpiry)
    changes.push(
      `Warranty Expiry: ${oldAsset.purchase?.warrantyExpiry || '-'} → ${
        asset.purchase?.warrantyExpiry || '-'
      }`
    );

  if (oldAsset.purchase?.warrantyExpiry !== asset.purchase?.warrantyExpiry) {
    changes.push(
      `Warranty Expiry: ${oldAsset.purchase?.warrantyExpiry || '-'} → ${
        asset.purchase?.warrantyExpiry || '-'
      }`
    );
  }

  if (oldAsset.status !== asset.status)
    changes.push(`Status: ${oldAsset.status} → ${asset.status}`);

  addAssetHistory(
    asset.id,
    'Updated',
    changes.length > 0 ? changes.join('<br>') : 'No changes detected'
  );

  bootstrap.Modal.getInstance(document.getElementById('editAssetModal')).hide();

  loadAssets();
}

function toggleRetirementReason() {
  const status = document.getElementById('editAssetStatus').value;

  document.getElementById('retirementReasonContainer').style.display =
    status === 'Retired' ? 'block' : 'none';
}

function toggleTransferMode() {
  const keepSame = document.getElementById('keepSameAssetId').checked;

  document.getElementById('newAssetIdGroup').classList.toggle('d-none', keepSame);

  const label = document.getElementById('transferModeLabel');

  const description = document.getElementById('transferModeDescription');

  if (keepSame) {
    label.textContent = '📍 Keep Same Asset ID';

    description.textContent = 'Move the existing asset to another location.';
  } else {
    label.textContent = '🔄 Use New Asset ID';

    description.textContent = 'Create a new asset and mark the existing asset as transferred.';
  }
}

function showAssetTransferModal(assetId) {
  const assets = getAssets();

  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return;
  }

  const activeAssignment = getAssignments().find(
    (a) => a.assetId === asset.id && a.status === 'Assigned'
  );

  if (activeAssignment) {
    alert(
      `Asset is currently assigned to ${activeAssignment.employeeName}.

Please return the asset before transferring.`
    );

    return;
  }

  if (asset.status === 'Retired') {
    alert('Retired assets cannot be transferred.');

    return;
  }

  if (asset.status === 'Transferred') {
    alert('Asset already transferred.');

    return;
  }

  showTransferAssetForm(asset);
}

function showTransferAssetForm(asset) {
  const locations = getLocations();

  const modal = document.createElement('div');

  modal.className = 'modal fade show';

  modal.style.display = 'block';

  modal.innerHTML = `

<div class="modal-dialog">

<div class="modal-content">

<div class="modal-header">

<h5>
Transfer Asset
</h5>

<button
    class="btn-close"
    onclick="this.closest('.modal').remove()">
</button>

</div>

<div class="modal-body">

<div class="mb-3">

<label>
Current Asset ID
</label>

<input
    class="form-control"
    value="${asset.id}"
    readonly>

</div>

<!-- Asset ID Strategy -->

<div class="form-check form-switch mb-3">

    <input
        class="form-check-input"
        type="checkbox"
        id="keepSameAssetId"
        checked
        onchange="toggleTransferMode()">

    <label
        id="transferModeLabel"
        class="form-check-label fw-semibold"
        for="keepSameAssetId">

        📍 Keep Same Asset ID

    </label>

    <div
        id="transferModeDescription"
        class="small text-muted">

        Move the existing asset to another location.

    </div>

</div>

<div id="newAssetIdGroup" class="d-none">

    <label class="form-label">
        New Asset ID
    </label>

    <input
        id="newAssetId"
        class="form-control">

</div>

<div class="mb-3">

<label>
Current Location
</label>

<input
    class="form-control"
    value="${asset.location}"
    readonly>

</div>

<div class="mb-3">

<label>
Transfer To
</label>

<select
    id="transferLocation"
    class="form-select">

${locations
  .filter((l) => l.name !== asset.location)
  .map(
    (l) => `
<option>
${l.name}
</option>
`
  )
  .join('')}

</select>

</div>

<div class="mb-3">

<label>
Remarks
</label>

<textarea
    id="transferRemarks"
    class="form-control">
</textarea>

</div>

</div>

<div class="modal-footer">

<button
    class="btn btn-secondary"
    onclick="this.closest('.modal').remove()">

Cancel

</button>

<button
    class="btn btn-primary"
    onclick="saveAssetTransfer('${asset.id}')">

Transfer

</button>

</div>

</div>

</div>

`;

  document.body.appendChild(modal);
}

function saveAssetTransfer(oldAssetId) {
  const assets = getAssets();

  const oldAsset = assets.find((a) => a.id === oldAssetId);

  const oldLocation = oldAsset.location;

  const newLocation = document.getElementById('transferLocation').value;

  const remarks = document.getElementById('transferRemarks').value;

  const keepSameAssetId = document.getElementById('keepSameAssetId').checked;

  const newAssetId = keepSameAssetId
    ? oldAsset.id
    : document.getElementById('newAssetId')?.value.trim();

  if (!keepSameAssetId) {
    if (!newAssetId) {
      alert('Enter new Asset ID');
      return;
    }

    const existingAsset = assets.find((a) => a.id === newAssetId);

    if (existingAsset) {
      alert('Asset ID already exists.');
      return;
    }
  }

  // ==================================================
  // Keep Same Asset ID
  // ==================================================

  if (keepSameAssetId) {
    oldAsset.location = newLocation;

    addAssetTransfer({
      id: Date.now(),
      oldAssetId: oldAsset.id,
      newAssetId: oldAsset.id,
      fromLocation: oldLocation,
      toLocation: newLocation,
      remarks,
      transferDate: formatDateTime(),
      transferMode: 'KeepSameAssetId',
    });

    addAssetHistory(oldAsset.id, 'Location Changed', `${oldLocation} → ${newLocation}`);

    addActivity(`${oldAsset.name} moved from ${oldLocation} to ${newLocation}`);

    saveAssets(assets);

    alert('Asset location updated successfully.');

    const transferModal = document.querySelector('.modal.show');

    if (transferModal) {
      transferModal.remove();
    }

    document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());

    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');

    loadAssets();

    return;
  }

  // ==================================================
  // Existing Transfer Logic
  // ==================================================

  const newAsset = {
    ...oldAsset,

    transferredTo: '',

    transferDate: '',

    transferRemarks: '',

    id: newAssetId,

    location: newLocation,

    previousAssetId: oldAsset.id,

    status: 'Available',
  };

  oldAsset.status = 'Transferred';

  oldAsset.transferredTo = newAssetId;

  oldAsset.transferDate = formatDateTime();

  oldAsset.transferRemarks = remarks;

  assets.push(newAsset);

  saveAssets(assets);

  addAssetTransfer({
    id: Date.now(),

    oldAssetId: oldAsset.id,

    newAssetId,

    fromLocation: oldLocation,

    toLocation: newLocation,

    remarks,

    transferDate: formatDateTime(),

    transferMode: 'NewAssetId',
  });

  addActivity(
    `Asset transferred:
${oldAsset.id}
→
${newAssetId}`
  );

  alert('Asset transferred successfully.');

  const transferModal = document.querySelector('.modal.show');

  if (transferModal) {
    transferModal.remove();
  }

  document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());

  document.body.classList.remove('modal-open');

  document.body.style.removeProperty('padding-right');

  loadAssets();
}
