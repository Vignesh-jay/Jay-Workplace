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

  const status = document.getElementById('editAssetStatus')?.value || '-';
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

            <tr><th>Status</th><td>${status}</td></tr>

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
  const specs = asset;

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

async function loadAssets() {
  let assetList = await getAssetsApi();

  const assignments = await getAssignmentsApi();

  const totalAssets = assetList.length;

  const assignedAssets = assignments.filter((a) => a.status === 'Assigned').length;

  const availableAssets = assetList.filter((a) => a.status === 'Available').length;

  const transferredAssets = assetList.filter((a) => a.status === 'Transferred').length;

  const expiringWarranty = assetList.filter((asset) => {
    if (asset.status === 'Transferred') return false;

    if (!asset.warrantyExpiry) return false;

    const days = Math.ceil((new Date(asset.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24));

    return days >= 0 && days <= 30;
  }).length;

  const searchText = document.getElementById('assetSearch')?.value || '';

  const locations = await getLocations();

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
      assetList = (await getExpiringAssets(30)).filter((asset) => asset.status !== 'Transferred');
      break;

    case 'transferred':
      assetList = assetList.filter((asset) => asset.status === 'Transferred');
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

    <div class="col">

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

    <div class="col">

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

    <div class="col">

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

    <div class="col">

    <div
        class="card dashboard-card h-100"
        data-filter="transferred"
        onclick="setAssetFilter('transferred')">

        <div class="card-body">

            <div class="text-muted small">

                Transferred

            </div>

            <h2>${transferredAssets}</h2>

            <i class="fas fa-exchange-alt fa-2x text-secondary"></i>

        </div>

    </div>

</div>

    <div class="col">

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
                const activeAssignment = assignments.find(
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
                                ${asset.assetId}
                            </div>

                            <div class="asset-meta">
                                ${asset.category}
                            </div>

                            ${
                              asset.serialNumber
                                ? `<div class="asset-meta">
                                        S/N : ${asset.serialNumber}
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
                                        ${
                                          activeAssignment.employee
                                            ? `${activeAssignment.employee.firstName} ${activeAssignment.employee.lastName}`
                                            : 'Unknown'
                                        }
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
                          asset.warrantyExpiry
                            ? (() => {
                                const days = Math.ceil(
                                  (new Date(asset.warrantyExpiry) - new Date()) /
                                    (1000 * 60 * 60 * 24)
                                );

                                if (days < 0) return `<span class="badge bg-danger">Expired</span>`;

                                if (days <= 30)
                                  return `<span class="badge bg-orange">${days} Days</span>`;

                                if (days <= 60)
                                  return `<span class="badge bg-warning text-dark">${days} Days</span>`;

                                if (days <= 90)
                                  return `<span class="badge bg-info">${days} Days</span>`;

                                return `<span class="badge bg-success">${days} Days</span>`;
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

async function buildAddAssetModal() {
  const locations = await getLocations();
  const statuses = await getAssetStatuses('active');
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

async function buildEditAssetModal(asset) {
  const locations = await getLocations();
  const statuses = await getAssetStatuses('active');
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
                                value="${asset.assetId}">
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
                                class="form-control" disabled>

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
                        <div class="mb-3">

                            <label>Status</label>

                            <select
                                id="editAssetStatus"
                                class="form-select">

                                ${statuses
                                  .map(
                                    (status) => `
                                            <option
                                                value="${status.name}"
                                                ${asset.status === status.name ? 'selected' : ''}>
                                                ${status.name}
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

async function showAddAssetModal() {
  removeExistingAssetModal();

  const modalHtml = await buildAddAssetModal();

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

async function showEditAssetModal(assetId) {
  const asset = await getAssetApi(assetId);

  if (!asset) {
    alert('Asset not found.');
    return;
  }
  const existingModal = document.getElementById('editAssetModal');

  if (existingModal) {
    existingModal.remove();
  }
  const modalHtml = await buildEditAssetModal(asset);

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modalElement = document.getElementById('editAssetModal');

  // Set current values
  document.getElementById('editAssetCategory').value = asset.category;
  document.getElementById('editAssetLocation').value = asset.location;
  const specValues = {
    manufacturer: asset.manufacturer,

    model: asset.model,

    serialNumber: asset.serialNumber,

    processor: asset.processor,

    ram: asset.ram,

    storage: asset.storage,

    operatingSystem: asset.operatingSystem,

    screenSize: asset.screenSize,

    resolution: asset.resolution,

    refreshRate: asset.refreshRate,

    displayInput: asset.displayInput,

    imei1: asset.imei1,

    imei2: asset.imei2,

    battery: asset.battery,

    display: asset.display,

    printerType: asset.printerType,

    connectivity: asset.connectivity,

    technology: asset.technology,

    colorMode: asset.colorMode,

    duplex: asset.duplex,

    raid: asset.raid,

    network: asset.network,

    deviceType: asset.deviceType,

    networkPorts: asset.networkPorts,

    managementIP: asset.managementIP,

    speed: asset.speed,

    macAddress: asset.macAddress,

    firmware: asset.firmware,
  };

  renderSpecificationFields(
    'editAssetCategory',
    'editTechnicalFieldsContainer',
    specValues,
    'editSpec'
  );

  renderPurchaseFields('editPurchaseFieldsContainer', 'editPurchase');
  // Populate purchase details
  PURCHASE_LAYOUT.forEach((field) => {
    const input = document.getElementById(field.key);

    if (!input) return;

    let value = asset[field.key];

    if (field.type === 'date' && value) {
      value = value.split('T')[0];
    }

    input.value = value || '';
  });
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

async function saveAsset() {
  const asset = {
    assetId: document.getElementById('assetId').value.trim(),
    name: document.getElementById('assetName').value.trim(),
    category: document.getElementById('assetCategory').value,
    location: document.getElementById('assetLocation').value,
    status: 'Available',

    // Technical Specifications
    manufacturer: document.getElementById('addSpec_manufacturer')?.value || '',
    model: document.getElementById('addSpec_model')?.value || '',
    serialNumber: document.getElementById('addSpec_serialNumber')?.value || '',
    processor: document.getElementById('addSpec_processor')?.value || '',
    ram: document.getElementById('addSpec_ram')?.value || '',
    storage: document.getElementById('addSpec_storage')?.value || '',
    operatingSystem: document.getElementById('addSpec_operatingSystem')?.value || '',
    screenSize: document.getElementById('addSpec_screenSize')?.value || '',
    resolution: document.getElementById('addSpec_resolution')?.value || '',
    refreshRate: document.getElementById('addSpec_refreshRate')?.value || '',
    displayInput: document.getElementById('addSpec_displayInput')?.value || '',
    imei1: document.getElementById('addSpec_imei1')?.value || '',
    imei2: document.getElementById('addSpec_imei2')?.value || '',
    battery: document.getElementById('addSpec_battery')?.value || '',
    display: document.getElementById('addSpec_display')?.value || '',
    printerType: document.getElementById('addSpec_printerType')?.value || '',
    connectivity: document.getElementById('addSpec_connectivity')?.value || '',
    technology: document.getElementById('addSpec_technology')?.value || '',
    colorMode: document.getElementById('addSpec_colorMode')?.value || '',
    duplex: document.getElementById('addSpec_duplex')?.value || '',
    raid: document.getElementById('addSpec_raid')?.value || '',
    network: document.getElementById('addSpec_network')?.value || '',
    deviceType: document.getElementById('addSpec_deviceType')?.value || '',
    networkPorts: document.getElementById('addSpec_networkPorts')?.value || '',
    managementIP: document.getElementById('addSpec_managementIP')?.value || '',
    speed: document.getElementById('addSpec_speed')?.value || '',
    macAddress: document.getElementById('addSpec_macAddress')?.value || '',
    firmware: document.getElementById('addSpec_firmware')?.value || '',

    // Purchase
    invoiceNumber: document.getElementById('invoiceNumber')?.value || '',
    poNumber: document.getElementById('poNumber')?.value || '',
    vendor: document.getElementById('vendor')?.value || '',
    purchasePrice: Number(document.getElementById('purchasePrice')?.value || 0),
    purchaseDate: document.getElementById('purchaseDate')?.value || null,
    warrantyExpiry: document.getElementById('warrantyExpiry')?.value || null,
    warrantyType: document.getElementById('warrantyType')?.value || '',
    remarks: document.getElementById('remarks')?.value || '',

    retiredDate: null,
    retirementReason: '',
    transferredTo: '',
    previousAssetId: '',
    transferDate: null,
    transferRemarks: '',
  };

  if (!asset.assetId || !asset.name) {
    alert('Asset ID and Asset Name are required.');

    return;
  }

  try {
    const createdAsset = await createAssetApi(asset);

    await addAssetHistoryApi(
      createdAsset.id,
      'Added to Inventory',
      `${createdAsset.name} added to inventory`
    );

    await addActivityApi(`${createdAsset.name} added to inventory`);

    bootstrap.Modal.getInstance(document.getElementById('addAssetModal')).hide();

    await loadAssets();
    alert('✅ Asset created successfully.');
  } catch (error) {
    console.error(error);
    alert('Failed to create asset.');
  }
}

function getAssetChanges(oldAsset, newAsset) {
  const fields = [
    { key: 'assetId', label: 'Asset ID' },
    { key: 'name', label: 'Asset Name' },
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },

    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'model', label: 'Model' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'processor', label: 'Processor' },
    { key: 'ram', label: 'Memory (RAM)' },
    { key: 'storage', label: 'Storage' },
    { key: 'operatingSystem', label: 'Operating System' },

    { key: 'screenSize', label: 'Screen Size' },
    { key: 'resolution', label: 'Resolution' },
    { key: 'refreshRate', label: 'Refresh Rate' },
    { key: 'displayInput', label: 'Display Input' },

    { key: 'imei1', label: 'IMEI 1' },
    { key: 'imei2', label: 'IMEI 2' },
    { key: 'battery', label: 'Battery' },
    { key: 'display', label: 'Display Size' },

    { key: 'printerType', label: 'Printer Type' },
    { key: 'technology', label: 'Technology' },
    { key: 'connectivity', label: 'Connectivity' },
    { key: 'colorMode', label: 'Colour Mode' },
    { key: 'duplex', label: 'Duplex' },

    { key: 'raid', label: 'RAID' },
    { key: 'network', label: 'Network Adapter' },

    { key: 'deviceType', label: 'Device Type' },
    { key: 'networkPorts', label: 'Network Ports' },
    { key: 'managementIP', label: 'Management IP' },
    { key: 'speed', label: 'Speed' },
    { key: 'macAddress', label: 'MAC Address' },
    { key: 'firmware', label: 'Firmware' },

    { key: 'invoiceNumber', label: 'Invoice Number' },
    { key: 'poNumber', label: 'PO Number' },
    { key: 'vendor', label: 'Vendor' },
    { key: 'purchasePrice', label: 'Purchase Price' },
    { key: 'purchaseDate', label: 'Purchase Date' },
    { key: 'warrantyExpiry', label: 'Warranty Expiry' },
    { key: 'warrantyType', label: 'Warranty Type' },
    { key: 'remarks', label: 'Remarks' },
  ];

  const changes = [];

  fields.forEach(({ key, label }) => {
    let oldValue = oldAsset[key] ?? '';
    let newValue = newAsset[key] ?? '';

    // Normalize dates
    if (key === 'purchaseDate' || key === 'warrantyExpiry') {
      oldValue = oldValue ? oldValue.toString().substring(0, 10) : '';
      newValue = newValue ? newValue.toString().substring(0, 10) : '';
    }

    if (String(oldValue) !== String(newValue)) {
      changes.push(`<strong>${label}</strong><br>${oldValue || '-'} → ${newValue || '-'}`);
    }
  });

  return changes;
}

async function updateAsset(assetId) {
  const asset = {
    assetId: document.getElementById('editAssetId').value.trim(),
    name: document.getElementById('editAssetName').value.trim(),
    category: document.getElementById('editAssetCategory').value,
    location: document.getElementById('editAssetLocation').value,
    status: document.getElementById('editAssetStatus').value,

    // Technical Specifications
    manufacturer: document.getElementById('editSpec_manufacturer')?.value || '',
    model: document.getElementById('editSpec_model')?.value || '',
    serialNumber: document.getElementById('editSpec_serialNumber')?.value || '',
    processor: document.getElementById('editSpec_processor')?.value || '',
    ram: document.getElementById('editSpec_ram')?.value || '',
    storage: document.getElementById('editSpec_storage')?.value || '',
    operatingSystem: document.getElementById('editSpec_operatingSystem')?.value || '',
    screenSize: document.getElementById('editSpec_screenSize')?.value || '',
    resolution: document.getElementById('editSpec_resolution')?.value || '',
    refreshRate: document.getElementById('editSpec_refreshRate')?.value || '',
    displayInput: document.getElementById('editSpec_displayInput')?.value || '',
    imei1: document.getElementById('editSpec_imei1')?.value || '',
    imei2: document.getElementById('editSpec_imei2')?.value || '',
    battery: document.getElementById('editSpec_battery')?.value || '',
    display: document.getElementById('editSpec_display')?.value || '',
    printerType: document.getElementById('editSpec_printerType')?.value || '',
    connectivity: document.getElementById('editSpec_connectivity')?.value || '',
    technology: document.getElementById('editSpec_technology')?.value || '',
    colorMode: document.getElementById('editSpec_colorMode')?.value || '',
    duplex: document.getElementById('editSpec_duplex')?.value || '',
    raid: document.getElementById('editSpec_raid')?.value || '',
    network: document.getElementById('editSpec_network')?.value || '',
    deviceType: document.getElementById('editSpec_deviceType')?.value || '',
    networkPorts: document.getElementById('editSpec_networkPorts')?.value || '',
    managementIP: document.getElementById('editSpec_managementIP')?.value || '',
    speed: document.getElementById('editSpec_speed')?.value || '',
    macAddress: document.getElementById('editSpec_macAddress')?.value || '',
    firmware: document.getElementById('editSpec_firmware')?.value || '',

    // Purchase Details
    invoiceNumber: document.getElementById('invoiceNumber')?.value || '',
    poNumber: document.getElementById('poNumber')?.value || '',
    vendor: document.getElementById('vendor')?.value || '',
    purchasePrice: Number(document.getElementById('purchasePrice')?.value || 0),
    purchaseDate: document.getElementById('purchaseDate')?.value || null,
    warrantyExpiry: document.getElementById('warrantyExpiry')?.value || null,
    warrantyType: document.getElementById('warrantyType')?.value || '',
    remarks: document.getElementById('remarks')?.value || '',

    retiredDate: null,
    retirementReason: '',
    transferredTo: '',
    previousAssetId: '',
    transferDate: null,
    transferRemarks: '',
  };

  const oldAsset = await getAssetApi(assetId);

  const changes = getAssetChanges(oldAsset, asset);

  try {
    await updateAssetApi(assetId, asset);

    await addAssetHistoryApi(
      assetId,
      'Updated',
      changes.length ? changes.join('<hr class="my-2">') : 'No changes detected.'
    );

    await addActivityApi(`${asset.name} updated`);

    bootstrap.Modal.getInstance(document.getElementById('editAssetModal')).hide();

    await loadAssets();

    alert('✅ Asset updated successfully.');
  } catch (error) {
    console.error(error);

    alert('Failed to update asset.');
  }
}

async function deleteAsset(assetId) {
  const asset = await getAssetApi(assetId);

  if (asset.status === 'Transferred') {
    alert('Transferred assets cannot be deleted.');

    return;
  }
  const assignments = await getAssignmentsApi();
  const activeAssignment = assignments.find(
    (a) => a.assetId === asset.id && a.status === 'Assigned'
  );

  if (activeAssignment) {
    alert('Assigned assets cannot be deleted.');

    return;
  }

  if (!confirm('Delete this asset?')) {
    return;
  }

  await deleteAssetApi(assetId);

  await addActivityApi(`${asset.name} deleted`);

  await loadAssets();
}

function getAssetIcon(category) {
  const icons = {
    Laptop: 'fas fa-laptop',

    Desktop: 'fas fa-desktop',

    Monitor: 'fas fa-desktop',

    Mobile: 'fas fa-mobile-alt',

    Printer: 'fas fa-print',

    Server: 'fas fa-server',

    Network: 'fas fa-network-wired',

    Tablet: 'fas fa-tablet-alt',
  };

  return icons[category] || 'fas fa-box';
}

async function viewAsset(assetId) {
  const asset = await getAssetApi(assetId);

  if (!asset) {
    alert('Asset not found.');
    return;
  }

  const assignments = await getAssignmentsApi();

  const history = await getAssetHistoryApi(assetId);

  const warrantyDaysRemaining = asset.warrantyExpiry
    ? Math.ceil((new Date(asset.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const assetAgeDays = asset.purchaseDate
    ? Math.ceil((new Date() - new Date(asset.purchaseDate)) / (1000 * 60 * 60 * 24))
    : null;

  const currentAssignment = assignments.find(
    (a) => a.assetId === asset.id && a.status === 'Assigned'
  );

  const assignmentHistory = assignments
    .filter((a) => a.assetId === asset.id)
    .sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));

  const transferHistory = (await getAssetTransfersApi()).filter(
    (t) => t.oldAssetId === asset.id || t.newAssetId === asset.id
  );

  const displayStatus = currentAssignment ? 'Assigned' : asset.status;

  const totalAssignments = assignmentHistory.length;

  const heroSection = `

    <div class="asset-hero">

        <div class="row align-items-center g-4">

            <div class="col-auto">

                <div class="asset-image">

                    <i class="${getAssetIcon(asset.category)} asset-header-icon"></i>

                </div>

            </div>

            <div class="col">

                <h2 class="fw-bold mb-1">

                    ${asset.name}

                </h2>

                <div class="asset-id">

                    ${asset.assetId}

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

                        ${
                          currentAssignment?.employee
                            ? `${currentAssignment.employee.firstName} ${currentAssignment.employee.lastName}`
                            : 'Inventory'
                        }

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
                    <strong>${asset.assetId}</strong>

                    <div>Category</div>
                    <strong>${asset.category}</strong>

                    <div>Serial Number</div>
                    <strong>${asset.serialNumber || '-'}</strong>

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
                    <strong>${asset.vendor || '-'}</strong>

                    <div>Purchase Date</div>
                    <strong>${formatDate(asset.purchaseDate)}</strong>

                    <div>Warranty Expiry</div>
                    <strong>${formatDate(asset.warrantyExpiry)}</strong>

                    <div>Current Holder</div>
                    <strong>
                        ${
                          currentAssignment?.employee
                            ? `${currentAssignment.employee.firstName} ${currentAssignment.employee.lastName}`
                            : 'In Inventory'
                        }
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

                        ${
                          item.employee
                            ? `${item.employee.firstName} ${item.employee.lastName} (${item.employee.employeeId})`
                            : '-'
                        }

                    </td>

                    <td>

                        ${formatDate(item.assignedDate)}

                    </td>

                    <td>

                        ${formatDate(item.returnedDate) || '-'}

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
                        <strong>${item.oldAsset?.assetId || '-'}</strong><br>
                        <small>${item.oldAsset?.name || ''}</small>
                    </td>

                    <td>
                        <strong>${item.newAsset?.assetId || '-'}</strong><br>
                        <small>${item.newAsset?.name || ''}</small>
                    </td>

                    <td>${item.fromLocation}</td>

                    <td>${item.toLocation}</td>

                    <td>${formatDate(item.transferDate)}</td>

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

                        ${formatDate(item.createdAt || item.timestamp)}

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

                    Date : ${
                      asset.purchaseDate ? formatDate(asset.purchaseDate) : 'Unknown Date'
                    }<br>

                    Warranty Expiry : ${
                      asset.warrantyExpiry
                        ? formatDate(asset.warrantyExpiry)
                        : 'Unknown Warranty Expiry'
                    }

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

async function showAssetTransferModal(assetId) {
  const asset = await getAssetApi(assetId);

  if (!asset) {
    alert('Asset not found.');
    return;
  }

  const assignments = await getAssignmentsApi();
  const activeAssignment = assignments.find(
    (a) => a.assetId === asset.id && a.status === 'Assigned'
  );

  if (activeAssignment) {
    alert(
      `Asset is currently assigned to ${
        activeAssignment.employee
          ? `${activeAssignment.employee.firstName} ${activeAssignment.employee.lastName}`
          : 'Unknown'
      }.

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

async function showTransferAssetForm(asset) {
  const locations = await getLocations();

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
    value="${asset.assetId}"
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
  toggleTransferMode();
}

async function saveAssetTransfer(oldAssetId) {
  const oldAsset = await getAssetApi(oldAssetId);

  if (!oldAsset) {
    alert('Asset not found.');
    return;
  }

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

    const assets = await getAssetsApi();

    const existingAsset = assets.find((a) => a.assetId === newAssetId);

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

    await createAssetTransferApi({
      oldAssetId: oldAsset.id,

      newAssetId: oldAsset.id,

      fromLocation: oldLocation,

      toLocation: newLocation,

      remarks,

      transferMode: 'KeepSameAssetId',
    });

    await addAssetHistoryApi(
      oldAsset.id,
      'Transferred',
      `Transferred from ${oldLocation} to ${newLocation}`
    );

    await addActivityApi(`${oldAsset.name} transferred from ${oldLocation} to ${newLocation}`);

    const updatedAsset = {
      ...oldAsset,

      location: newLocation,

      transferDate: new Date(),

      transferRemarks: remarks,

      transferredTo: newLocation,
    };

    await updateAssetApi(oldAsset.id, updatedAsset);

    alert('Asset location updated successfully.');

    const transferModal = document.querySelector('.modal.show');

    if (transferModal) {
      transferModal.remove();
    }

    document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());

    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');

    await loadAssets();

    document.querySelector('.modal.show')?.remove();

    return;
  }

  // ==================================================
  // New Asset ID Workflow
  // ==================================================

  // Create the new asset record
  const newAsset = {
    ...oldAsset,

    assetId: newAssetId,

    location: newLocation,

    previousAssetId: oldAsset.assetId,

    status: 'Available',

    transferredTo: '',

    transferDate: null,

    transferRemarks: '',
  };

  // Remove Prisma primary key so a new row is created
  delete newAsset.id;

  // Create the new asset
  const createdAsset = await createAssetApi(newAsset);

  // Mark old asset as transferred
  const updatedOldAsset = {
    ...oldAsset,

    status: 'Transferred',

    transferredTo: createdAsset.assetId,

    transferDate: new Date(),

    transferRemarks: remarks,
  };

  await updateAssetApi(oldAsset.id, updatedOldAsset);

  // Save transfer record
  await createAssetTransferApi({
    oldAssetId: oldAsset.id,

    newAssetId: createdAsset.id,

    fromLocation: oldLocation,

    toLocation: newLocation,

    remarks,

    transferMode: 'NewAssetId',
  });

  // Old asset history
  await addAssetHistoryApi(oldAsset.id, 'Transferred', `Transferred to ${createdAsset.assetId}`);

  // New asset history
  await addAssetHistoryApi(createdAsset.id, 'Received', `Received from ${oldAsset.assetId}`);

  // Activity Log
  await addActivityApi(`${oldAsset.assetId} transferred to ${createdAsset.assetId}`);

  alert('Asset transferred successfully.');

  // Close modal
  document.querySelector('.modal.show')?.remove();

  document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());

  document.body.classList.remove('modal-open');

  document.body.style.removeProperty('padding-right');

  // Reload assets
  await loadAssets();
}

function toggleTransferMode() {
  const keepSame = document.getElementById('keepSameAssetId').checked;

  const newAssetGroup = document.getElementById('newAssetIdGroup');

  const label = document.getElementById('transferModeLabel');

  const description = document.getElementById('transferModeDescription');

  if (keepSame) {
    newAssetGroup.classList.add('d-none');

    label.innerHTML = '📍 Keep Same Asset ID';

    description.textContent = 'Move the existing asset to another location.';
  } else {
    newAssetGroup.classList.remove('d-none');

    label.innerHTML = '🆕 Create New Asset ID';

    description.textContent = 'Create a new asset record for the destination location.';
  }
}

function formatDate(date) {
  if (!date) return '-';

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
