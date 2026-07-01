let assetFilter = "all";

const AssetSpecifications = {

    Laptop: [

        { key: "manufacturer", label: "Manufacturer" },
        { key: "model", label: "Model" },
        { key: "processor", label: "Processor" },
        { key: "ram", label: "Memory (RAM)" },
        { key: "storage", label: "Storage" },
        { key: "graphics", label: "Graphics" },
        { key: "display", label: "Display" },
        { key: "operatingSystem", label: "Operating System" }

    ],

    Desktop: [

        { key: "manufacturer", label: "Manufacturer" },
        { key: "model", label: "Model" },
        { key: "processor", label: "Processor" },
        { key: "ram", label: "Memory (RAM)" },
        { key: "storage", label: "Storage" },
        { key: "graphics", label: "Graphics" },
        { key: "motherboard", label: "Motherboard" },
        { key: "operatingSystem", label: "Operating System" }

    ],

    Monitor: [

        { key: "manufacturer", label: "Manufacturer" },
        { key: "model", label: "Model" },
        { key: "screenSize", label: "Screen Size" },
        { key: "resolution", label: "Resolution" },
        { key: "refreshRate", label: "Refresh Rate" },
        { key: "panelType", label: "Panel Type" },
        { key: "ports", label: "Ports" }

    ],

    Mobile: [

        { key: "manufacturer", label: "Manufacturer" },
        { key: "model", label: "Model" },
        { key: "processor", label: "Processor" },
        { key: "ram", label: "Memory (RAM)" },
        { key: "storage", label: "Storage" },
        { key: "battery", label: "Battery" },
        { key: "display", label: "Display" },
        { key: "imei1", label: "IMEI 1" },
        { key: "imei2", label: "IMEI 2" }

    ],

    Printer: [

        { key: "manufacturer", label: "Manufacturer" },
        { key: "model", label: "Model" },
        { key: "technology", label: "Technology" },
        { key: "colorMode", label: "Color / Mono" },
        { key: "connectivity", label: "Connectivity" },
        { key: "duplex", label: "Duplex" }

    ],

    Server: [

        { key: "manufacturer", label: "Manufacturer" },
        { key: "model", label: "Model" },
        { key: "processor", label: "Processor" },
        { key: "ram", label: "Memory" },
        { key: "storage", label: "Storage" },
        { key: "raid", label: "RAID" },
        { key: "network", label: "Network Ports" }

    ],

    Network: [
        { key:"manufacturer", label:"Manufacturer" },
        { key:"model", label:"Model" },
        { key:"deviceType", label:"Device Type" },
        { key:"ports", label:"Ports" },
        { key:"speed", label:"Speed" },
        { key:"macAddress", label:"MAC Address" },
        { key:"firmware", label:"Firmware Version" }
    ],

};

function getSpecificationTemplate(category){

    return AssetSpecifications[category] || [];

}

function buildSpecificationFields(category, values = {}, prefix = "spec") {

    const specs = getSpecificationTemplate(category);

    return specs.map(field => `

        <div class="mb-3">

            <label class="form-label">

                ${field.label}

            </label>

            <input
                type="text"
                class="form-control"
                id="${prefix}_${field.key}"
                value="${values[field.key] || ""}"
            >

        </div>

    `).join("");

}

function renderSpecificationFields(
    categorySelectId,
    containerId,
    values = {},
    prefix = "spec"
){

    const category =
        document.getElementById(categorySelectId).value;

    document.getElementById(containerId).innerHTML =
        buildSpecificationFields(
            category,
            values,
            prefix
        );
}

function buildSpecificationCard(asset){

    const specs =
        asset.specifications || {};

    const fields =
        getSpecificationTemplate(asset.category);

    return `

        <div class="asset-info-card">

            <h6>

                <i class="fas fa-microchip text-primary me-2"></i>

                Specifications

            </h6>

            <div class="info-grid">

                ${fields.map(field => `

                    <div>

                        ${field.label}

                    </div>

                    <strong>

                        ${specs[field.key] || "Not Specified"}

                    </strong>

                `).join("")}

            </div>

        </div>

    `;

}

function loadAssets(){

    let assetList = getAssets();

    const assignments = getAssignments();

    const totalAssets = assetList.length;

    const assignedAssets = assignments.filter(
        a => a.status === "Assigned"
    ).length;

    const availableAssets = assetList.filter(
        a => a.status === "Available"
    ).length;

    const expiringWarranty = getExpiringAssets(30).length;

    const searchText =
    document.getElementById("assetSearch")?.value || "";

    setActiveMenu('nav-assets');

    switch(assetFilter){

        case "assigned":

            assetList = assetList.filter(asset =>
                assignments.some(a =>
                    a.assetId === asset.id &&
                    a.status === "Assigned"
                )
            );

            break;

        case "available":

            assetList = assetList.filter(asset =>
                asset.status === "Available"
            );

            break;

        case "warranty":

            assetList = getExpiringAssets(30);

            break;

    }

document.getElementById("content").innerHTML = `

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

            ${getLocations().map(location => `
                <option value="${location.name}">
                    ${location.name}
                </option>
            `).join("")}

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

            ${assetList.map(asset => {

                const activeAssignment =
                    getAssignments().find(
                        a =>
                            a.assetId === asset.id &&
                            a.status === "Assigned"
                    );

                const displayStatus =
                    activeAssignment
                        ? "Assigned"
                        : asset.status;

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
                                asset.serialNumber
                                    ? `<div class="asset-meta">
                                        S/N : ${asset.serialNumber}
                                    </div>`
                                    : ""
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
                        ${asset.location || "-"}
                    </td>

                    <td>
                        ${
                            asset.warrantyExpiry
                                ? (() => {

                                    const days = Math.ceil(
                                        (new Date(asset.warrantyExpiry) - new Date())
                                        / (1000*60*60*24)
                                    );

                                    if(days < 0)
                                        return `<span class="badge bg-danger">
                                                    Expired
                                                </span>`;

                                    if(days <=30)
                                        return `<span class="badge bg-danger">
                                                    ${days} Days
                                                </span>`;

                                    if(days <=90)
                                        return `<span class="badge bg-warning">
                                                    ${days} Days
                                                </span>`;

                                    return `<span class="badge bg-success">
                                                ${days} Days
                                            </span>`;

                                })()
                                : "-"
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
                            asset.status !== "Transferred"
                            ? `
                            <button
                                class="btn btn-light btn-sm asset-action-btn"
                                title="Edit"
                                onclick="editAsset('${asset.id}')">

                                <i class="fas fa-pen"></i>

                            </button>

                            <button
                                class="btn btn-light btn-sm asset-action-btn text-danger"
                                title="Delete"
                                onclick="deleteAsset('${asset.id}')">

                                <i class="fas fa-trash"></i>

                            </button>
                            `
                            : ""
                        }

                    </td>

                </tr>
                `;

            }).join("")}

        </tbody>

    </table>

</div>

`;
const searchInput =
    document.getElementById("assetSearch");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterAssets
    );

}

document.querySelectorAll(".dashboard-card").forEach(card=>{

        card.classList.remove("active");

        if(card.dataset.filter===assetFilter){

            card.classList.add("active");

        }

    });

}

function setAssetFilter(filter){

    assetFilter = filter;

    loadAssets();

}

function showAddAssetModal() {

    const existingModal =
        document.getElementById("addAssetModal");

    if (existingModal) {
        existingModal.remove();
    }

    const modalHtml = `
    <div class="modal fade"
         id="addAssetModal"
         tabindex="-1">

        <div class="modal-dialog">

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

                    <hr>

                    <h6 class="fw-bold mb-3">

                        <i class="fas fa-microchip me-2 text-primary"></i>

                        Specifications

                    </h6>

                    <div id="technicalFieldsContainer">

                    </div>

                    <div class="mb-3">

                        <label>Location</label>

                        <select
                            id="assetLocation"
                            class="form-control">

                            ${getLocations().map(location => `
                                <option value="${location.name}">
                                    ${location.name}
                                </option>
                            `).join("")}

                        </select>

                    </div>

                    <div class="mb-3">
                        <label>Serial Number</label>
                        <input
                            id="assetSerial"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Vendor</label>
                        <input
                            id="assetVendor"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Purchase Date</label>
                        <input
                            type="date"
                            id="purchaseDate"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Warranty Expiry</label>
                        <input
                            type="date"
                            id="warrantyExpiry"
                            class="form-control">
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
                        onclick="saveAsset()">
                        Save Asset
                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

    document.body.insertAdjacentHTML(
        "beforeend",
        modalHtml
    );

    const modal = new bootstrap.Modal(
        document.getElementById("addAssetModal")
    );

    modal.show();
    renderSpecificationFields(
    "assetCategory",
    "technicalFieldsContainer",
    {},
    "addSpec"
);
}

function saveAsset() {

    const asset = {

        id:
            document.getElementById(
                "assetId"
            ).value.trim(),

        name:
            document.getElementById(
                "assetName"
            ).value.trim(),

        category:
            document.getElementById(
                "assetCategory"
            ).value,

        location:
            document.getElementById(
                "assetLocation"
            ).value,

        serialNumber:
            document.getElementById(
                "assetSerial"
            ).value.trim(),

        vendor:
            document.getElementById(
                "assetVendor"
            ).value.trim(),

        purchaseDate:
            document.getElementById(
                "purchaseDate"
            ).value,

        warrantyExpiry:
            document.getElementById(
                "warrantyExpiry"
            ).value,

        status: "Available",

        retiredDate: "",

        retirementReason: "",

        transferredTo: "",

        previousAssetId: "",

        transferDate: "",

        transferRemarks: ""

    };

    const specifications = {};

    getSpecificationTemplate(asset.category).forEach(field => {

        specifications[field.key] =

            document.getElementById(`addSpec_${field.key}`)?.value.trim() || "";
    });

    asset.specifications = specifications;

    if (!asset.id || !asset.name) {

        alert(
            "Asset ID and Asset Name are required."
        );

        return;

    }

    addAsset(asset);

    addAssetHistory(
        asset.id,
        "Added to Inventory",
        `${asset.name} added to inventory`
    );

    bootstrap.Modal.getInstance(
        document.getElementById(
            "addAssetModal"
        )
    ).hide();

    loadAssets();

}

function deleteAsset(assetId) {

    const asset =
        getAssets().find(
            a => a.id === assetId
        );

    if (
        asset.status === "Transferred"
    ) {

        alert(
            "Transferred assets cannot be deleted."
        );

        return;

    }

    const activeAssignment =
        getAssignments().find(
            a =>
                a.assetId === assetId &&
                a.status === "Assigned"
        );

    if (activeAssignment) {

        alert(
            "Assigned assets cannot be deleted."
        );

        return;
    }

    if (!confirm("Delete this asset?")) {
        return;
    }

    deleteAssetById(assetId);

    addAssetHistory(
        asset.id,
        "Deleted",
        `${asset.name} removed from inventory`
    );

    loadAssets();
}

function getAssetIcon(category){

    const icons = {
        Laptop: "💻",
        Desktop: "🖥️",
        Monitor: "🖥",
        Mobile: "📱",
        Printer: "🖨️",
        Server: "🖧",
        Network: "🌐",
        Tablet: "📲"
    };

    return icons[category] || "📦";

}

function viewAsset(assetId) {

    const assets = getAssets();

    const assignments = getAssignments();

    const asset =
        assets.find(a => a.id === assetId);

    if (!asset) {
        return;
    }

    const history = getAssetHistory()
        .filter(h => h.assetId === assetId)
        .sort(
            (a, b) =>
                new Date(b.timestamp) -
                new Date(a.timestamp)
        );

    const totalAssignments =
        history.filter(
            h => h.action === "Assigned"
        ).length;

    const warrantyDaysRemaining =
        asset.warrantyExpiry
            ? Math.ceil(
                (
                    new Date(
                        asset.warrantyExpiry
                    ) -
                    new Date()
                ) /
                (1000 * 60 * 60 * 24)
            )
            : null;

    const assetAgeDays =
        asset.purchaseDate
            ? Math.ceil(
                (
                    new Date() -
                    new Date(
                        asset.purchaseDate
                    )
                ) /
                (1000 * 60 * 60 * 24)
            )
            : null;

    const currentAssignment =
        getAssignments().find(
            a =>
                a.assetId === assetId &&
                a.status === "Assigned"
        );

    const assignmentHistory =
        getAssignments()
            .filter(
                a => a.assetId === assetId
            )
            .sort(
                (a, b) =>
                    new Date(b.assignedDate) -
                    new Date(a.assignedDate)
            );

    const transferHistory =
        getAssetTransfers()
            .filter(
                t =>
                    t.oldAssetId === asset.id ||
                    t.newAssetId === asset.id
            )
            .sort(
                (a, b) =>
                    new Date(b.transferDate) -
                    new Date(a.transferDate)
            );

    const displayStatus =
        currentAssignment
            ? "Assigned"
            : asset.status;


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
                    ${asset.location || "Unknown Location"}

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
                            currentAssignment
                                ? currentAssignment.employeeName
                                : "Inventory"
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

                        ${
                            warrantyDaysRemaining
                                ? warrantyDaysRemaining + " Days"
                                : "-"

                        }

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

                        ${
                            assetAgeDays
                                ? assetAgeDays + " Days"
                                : "-"

                        }

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
                    <strong>${asset.serialNumber || "-"}</strong>

                    <div>Location</div>
                    <strong>${asset.location || "-"}</strong>

                </div>

            </div>

        </div>

        <div class="col-xl-4">

            <div class="asset-info-card">

                <h6>Purchase Information</h6>

                <div class="info-grid">

                    <div>Vendor</div>
                    <strong>${asset.vendor || "-"}</strong>

                    <div>Purchase Date</div>
                    <strong>${asset.purchaseDate || "-"}</strong>

                    <div>Warranty Expiry</div>
                    <strong>${asset.warrantyExpiry || "-"}</strong>

                    <div>Current Holder</div>
                    <strong>
                        ${
                            currentAssignment
                                ? currentAssignment.employeeName
                                : "In Inventory"
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

    const existingModal =
        document.getElementById(
            "assetDetailsModal"
        );

        if (existingModal) {

            existingModal.remove();

        }

        document.body.insertAdjacentHTML(
            "beforeend",
            modalHtml
        );

        new bootstrap.Modal(
            document.getElementById(
                "assetDetailsModal"
            )
        ).show();
}

function buildAssignmentHistory(assignmentHistory){

    if(assignmentHistory.length === 0){

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

            ${assignmentHistory.map(item => `

                <tr>

                    <td>

                        ${item.employeeName}

                    </td>

                    <td>

                        ${item.assignedDate}

                    </td>

                    <td>

                        ${item.returnedDate || "-"}

                    </td>

                    <td>

                        <span class="badge ${

                            item.status === "Assigned"

                                ? "bg-success"

                                : "bg-secondary"

                        }">

                            ${item.status}

                        </span>

                    </td>

                </tr>

            `).join("")}

        </tbody>

    </table>

    `;

}

function buildTransferHistory(transferHistory){

    if(transferHistory.length === 0){

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

            ${transferHistory.map(item => `

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

            `).join("")}

        </tbody>

    </table>

    `;

}

function buildTimeline(history, asset){

    return `

    <div class="timeline mt-3">

        ${history.map(item => `

            <div class="timeline-item">

                <div class="timeline-dot ${

                    item.action === "Assigned"
                        ? "bg-success"

                    : item.action === "Returned"
                        ? "bg-warning"

                    : item.action === "Updated"
                        ? "bg-info"

                    : item.action === "Deleted"
                        ? "bg-danger"

                    : "bg-primary"

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

        `).join("")}

        <div class="timeline-item">

            <div class="timeline-dot bg-secondary"></div>

            <div class="timeline-content">

                <strong>

                    Asset Purchased

                </strong>

                <br>

                <small class="text-muted">

                    Date : ${asset.purchaseDate || "Unknown Date"}<br>
                    Warranty Expiry : ${asset.warrantyExpiry || "Unknown Warranty Expiry"}

                </small>

            </div>

        </div>

    </div>

    `;

}

function filterAssets() {

    const searchText =
        document
            .getElementById(
                "assetSearch"
            )
            .value
            .toLowerCase();

    const selectedLocation =
        document
            .getElementById(
                "assetLocationFilter"
            )
            .value;

    const rows =
        document.querySelectorAll(
            "tbody tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        const location = row.children[2]
            ?.textContent
            .trim();

        const matchesSearch =
            text.includes(searchText);

        const matchesLocation =
            selectedLocation === "" ||
            location.trim() === selectedLocation.trim();

        row.style.display =
            matchesSearch &&
            matchesLocation
                ? ""
                : "none";

    });

}

function editAsset(assetId) {

    const existingModal =
        document.getElementById(
            "editAssetModal"
        );

    if (existingModal) {
        existingModal.remove();
    }

    const assets = getAssets();

    const asset =
        assets.find(
            a => a.id === assetId
        );

    if (asset.status === "Transferred") {

        alert(
            "Transferred assets cannot be edited."
        );

        return;

    }

    if (!asset) {
            return;
        }

    if (asset.status === "Transferred") {

        alert(
            "Transferred assets cannot be edited."
        );

        return;
    }

    const activeAssignment =
        getAssignments().find(
            a =>
                a.assetId === asset.id &&
                a.status === "Assigned"
        );

    const isAssigned =
        !!activeAssignment; 

    const modalHtml = `

    ${isAssigned ? `

    <div class="modal-body">

        This asset is currently assigned to
        ${activeAssignment.employeeName}.

        Return the asset before changing
        status, location, retiring or
        transferring.

    </div>

    ` : ""}

    <input
        type="hidden"
        id="editAssetId"
        value="${asset.id}">

    <div class="modal fade"
         id="editAssetModal"
         tabindex="-1">

        <div class="modal-dialog">

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

                    <input
                        type="hidden"
                        id="editAssetId"
                        value="${asset.id}">

                    <div class="mb-3">

                        <label>Asset ID</label>

                        <input
                            class="form-control"
                            value="${asset.id}"
                            readonly>

                    </div>

                    <div class="mb-3">

                        <label>Asset Name</label>

                        <input
                            id="editAssetName"
                            class="form-control"
                            value="${asset.name}">

                    </div>

                    <div class="mb-3">

                        <label>Category</label>

                        <select
                            id="editAssetCategory"
                            class="form-select"
                            onchange="
                            renderSpecificationFields(
                                'editAssetCategory',
                                'editTechnicalFieldsContainer',
                                asset.specifications || {},
                                'editSpec'
                            )
                            ">

                            <option ${asset.category=="Laptop"?"selected":""}>Laptop</option>
                            <option ${asset.category=="Desktop"?"selected":""}>Desktop</option>
                            <option ${asset.category=="Monitor"?"selected":""}>Monitor</option>
                            <option ${asset.category=="Mobile"?"selected":""}>Mobile</option>
                            <option ${asset.category=="Printer"?"selected":""}>Printer</option>
                            <option ${asset.category=="Server"?"selected":""}>Server</option>
                            <option ${asset.category=="Network"?"selected":""}>Network</option>

                        </select>

                    </div>

                    <hr>

                    <h6 class="fw-bold mb-3">

                        <i class="fas fa-microchip me-2 text-primary"></i>

                        Specifications

                    </h6>

                    <div id="editTechnicalFieldsContainer">

                    </div>

                    <div class="mb-3">

                        <label>Location</label>

                        <input
                            class="form-control"
                            value="${asset.location || ''}"
                            readonly>

                    </div>

                    <div class="mb-3">
                        <label>Serial Number</label>
                        <input
                            id="editAssetSerial"
                            class="form-control"
                            value="${asset.serialNumber || ''}">
                    </div>

                    <div class="mb-3">
                        <label>Vendor</label>
                        <input
                            id="editAssetVendor"
                            class="form-control"
                            value="${asset.vendor || ''}">
                    </div>

                    <div class="mb-3">
                        <label>Purchase Date</label>
                        <input
                            type="date"
                            id="editAssetPurchaseDate"
                            class="form-control"
                            value="${asset.purchaseDate || ''}">
                    </div>

                    <div class="mb-3">
                        <label>Warranty Expiry</label>
                        <input
                            type="date"
                            id="editAssetWarrantyExpiry"
                            class="form-control"
                            value="${asset.warrantyExpiry || ''}">
                    </div>

                    <div class="mb-3">

                        <label>Status</label>

                        <select
                            id="editAssetStatus"
                            class="form-control"
                            ${isAssigned ? "disabled" : ""}
                            onchange="toggleRetirementReason()">

                            <option ${asset.status === "Available" ? "selected" : ""}>
                                Available
                            </option>

                            <option ${asset.status === "Maintenance" ? "selected" : ""}>
                                Maintenance
                            </option>

                            <option ${asset.status === "Retired" ? "selected" : ""}>
                                Retired
                            </option>

                        </select>

                    </div>

                <div
                        class="mb-3"
                        id="retirementReasonContainer"
                        style="
                            display:
                            ${asset.status === 'Retired'
                                ? 'block'
                                : 'none'
                            };
                        "
                    >

                        <label>
                            Retirement Reason
                        </label>

                        <select
                            id="retirementReason"
                            class="form-control">

                            <option
                                ${asset.retirementReason === "End of Life" ? "selected" : ""}
                            >
                                End of Life
                            </option>

                            <option
                                ${asset.retirementReason === "Hardware Failure" ? "selected" : ""}
                            >
                                Hardware Failure
                            </option>

                            <option
                                ${asset.retirementReason === "Lost" ? "selected" : ""}
                            >
                                Lost
                            </option>

                            <option
                                ${asset.retirementReason === "Stolen" ? "selected" : ""}
                            >
                                Stolen
                            </option>

                            <option
                                ${asset.retirementReason === "Disposed" ? "selected" : ""}
                            >
                                Disposed
                            </option>

                        </select>

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
                        onclick="saveAssetEdit()">

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    </div>
    `;

    document.body.insertAdjacentHTML(
        "beforeend",
        modalHtml
    );

    new bootstrap.Modal(
        document.getElementById(
            "editAssetModal"
        )
    ).show();
    renderSpecificationFields(
    "editAssetCategory",
    "editTechnicalFieldsContainer",
    asset.specifications || {},
    "editSpec"
);
}

function saveAssetEdit() {

    const assetId =
        document.getElementById(
            "editAssetId"
        ).value;

    const assets =
        getAssets();

    const asset =
        assets.find(
            a => a.id === assetId
        );

    if (!asset) {
        return;
    }

    const oldAsset = {
        ...asset
    };

    asset.name =
        document.getElementById(
            "editAssetName"
        ).value;

    asset.category =
        document.getElementById(
            "editAssetCategory"
        ).value;

    asset.status =
        document.getElementById(
            "editAssetStatus"
        ).value;
    asset.serialNumber =
        document.getElementById(
            "editAssetSerial"
        ).value;

    asset.vendor =
        document.getElementById(
            "editAssetVendor"
        ).value;

    asset.purchaseDate =
        document.getElementById(
            "editAssetPurchaseDate"
        ).value;

    asset.warrantyExpiry =
        document.getElementById(
            "editAssetWarrantyExpiry"
        ).value;

    const specifications = {};

    getSpecificationTemplate(asset.category).forEach(field=>{

        specifications[field.key]=

            document.getElementById(`editSpec_${field.key}`)?.value.trim() || "";

    });

    asset.specifications = specifications;

    if (asset.status === "Retired") {

        asset.retirementReason =
            document.getElementById(
                "retirementReason"
            ).value;

        if (!asset.retiredDate) {

            asset.retiredDate =
                formatDateTime();

        }

    }

    addActivity(
        `Asset ${asset.name} updated`
    );

    if (asset.status === "Retired") {

        const activeAssignment =
            getAssignments().find(
                a =>
                    a.assetId === asset.id &&
                    a.status === "Assigned"
            );

        if (activeAssignment) {

            alert(
                "Asset is currently assigned and cannot be retired."
            );

            return;
        }
    }

    if (
        oldAsset.status !== "Retired" &&
        asset.status === "Retired"
    ) {

        addAssetHistory(
            asset.id,
            "Retired",
            `Reason: ${asset.retirementReason}`
        );

    }

    saveAssets(assets);

    const changes = [];

    if (oldAsset.name !== asset.name)
        changes.push(
            `Asset Name: ${oldAsset.name} → ${asset.name}`
        );

    if (oldAsset.category !== asset.category)
        changes.push(
            `Category: ${oldAsset.category} → ${asset.category}`
        );

    if (oldAsset.serialNumber !== asset.serialNumber)
        changes.push(
            `Serial Number: ${oldAsset.serialNumber || "-"} → ${asset.serialNumber || "-"}`
        );

    if (oldAsset.vendor !== asset.vendor)
        changes.push(
            `Vendor: ${oldAsset.vendor || "-"} → ${asset.vendor || "-"}`
        );

    if (oldAsset.purchaseDate !== asset.purchaseDate)
        changes.push(
            `Purchase Date: ${oldAsset.purchaseDate || "-"} → ${asset.purchaseDate || "-"}`
        );

    if (oldAsset.warrantyExpiry !== asset.warrantyExpiry)
        changes.push(
            `Warranty Expiry: ${oldAsset.warrantyExpiry || "-"} → ${asset.warrantyExpiry || "-"}`
        );

    if (oldAsset.status !== asset.status)
        changes.push(
            `Status: ${oldAsset.status} → ${asset.status}`
        );

    addAssetHistory(
        asset.id,
        "Updated",
        changes.length > 0
            ? changes.join("<br>")
            : "No changes detected"
    );

    bootstrap.Modal.getInstance(
        document.getElementById(
            "editAssetModal"
        )
    ).hide();

    loadAssets();
}

function toggleRetirementReason() {

    const status =
        document.getElementById(
            "editAssetStatus"
        ).value;

    document.getElementById(
        "retirementReasonContainer"
    ).style.display =
        status === "Retired"
            ? "block"
            : "none";

}

function showAssetTransferModal(
    assetId
) {

    const assets =
        getAssets();

    const asset =
        assets.find(
            a => a.id === assetId
        );

    if (!asset) {
        return;
    }

    const activeAssignment =
        getAssignments().find(
            a =>
                a.assetId === asset.id &&
                a.status === "Assigned"
        );

    if (activeAssignment) {

        alert(
            `Asset is currently assigned to ${activeAssignment.employeeName}.
            
Please return the asset before transferring.`
        );

        return;
    }

    if (
        asset.status === "Retired"
    ) {

        alert(
            "Retired assets cannot be transferred."
        );

        return;
    }

    if (
        asset.status === "Transferred"
    ) {

        alert(
            "Asset already transferred."
        );

        return;
    }

    showTransferAssetForm(
        asset
    );

}

function showTransferAssetForm(
    asset
) {

    const locations =
        getLocations();

    const modal =
        document.createElement("div");

    modal.className =
        "modal fade show";

    modal.style.display =
        "block";

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

<div class="mb-3">

<label>
New Asset ID
</label>

<input
    id="transferAssetId"
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
.filter(
    l =>
        l.name !== asset.location
)
.map(
    l => `
<option>
${l.name}
</option>
`
).join("")}

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

    document.body.appendChild(
        modal
    );

}

function saveAssetTransfer(
    oldAssetId
) {

    const assets =
        getAssets();

    const oldAsset =
        assets.find(
            a =>
                a.id === oldAssetId
        );

    const newAssetId =
        document.getElementById(
            "transferAssetId"
        ).value.trim();

    const newLocation =
        document.getElementById(
            "transferLocation"
        ).value;

    const remarks =
        document.getElementById(
            "transferRemarks"
        ).value;

    if (!newAssetId) {

        alert(
            "Enter new Asset ID"
        );

        return;
    }

    const existingAsset =
        assets.find(
            a => a.id === newAssetId
        );

    if (existingAsset) {

        alert(
            "Asset ID already exists."
        );

        return;
    }

    const newAsset = {

        ...oldAsset,

        transferredTo: "",

        transferDate: "",

        transferRemarks: "",

        id:
            newAssetId,

        location:
            newLocation,

        previousAssetId:
            oldAsset.id,

        status:
            "Available"
    };

    oldAsset.status =
        "Transferred";

    oldAsset.transferredTo =
        newAssetId;

    oldAsset.transferDate =
        formatDateTime();

    oldAsset.transferRemarks =
        remarks;

    assets.push(
        newAsset
    );

    saveAssets(
        assets
    );

    addAssetTransfer({

        id: Date.now(),

        oldAssetId:
            oldAsset.id,

        newAssetId,

        fromLocation:
            oldAsset.location,

        toLocation:
            newLocation,

        remarks,

        transferDate:
            formatDateTime()

    });

    addActivity(
        `Asset transferred:
${oldAsset.id}
→
${newAssetId}`
    );

    alert(
        "Asset transferred successfully."
    );

    const transferModal =
        document.querySelector(
            ".modal.show"
        );

    if (transferModal) {
        transferModal.remove();
    }

    document
        .querySelectorAll(".modal-backdrop")
        .forEach(
            b => b.remove()
        );

    document.body.classList.remove(
        "modal-open"
    );

    document.body.style.removeProperty(
        "padding-right"
    );

    loadAssets();

}