function loadAssets(){

    let assetList = getAssets();
    const searchText =
    document.getElementById("assetSearch")?.value || "";

    setActiveMenu('nav-assets');

document.getElementById("content").innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Assets</h2>
        <p class="text-muted">
            Manage company assets and inventory.
        </p>
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
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Location</th>
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

                <td>${asset.id}</td>

                <td>${asset.name}</td>

                <td>${asset.category}</td>

                <td>${asset.location || "-"}</td>

                <td>
                    <span class="status-badge ${asset.status.toLowerCase()}">
                        ${displayStatus}
                    </span>
                </td>

                <td>
                    <button
                        class="btn btn-sm btn-outline-info"
                        onclick="viewAsset('${asset.id}')">
                        View
                    </button>
                    <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="editAsset('${asset.id}')">
                        Edit
                    </button>

                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="deleteAsset('${asset.id}')">
                        Delete
                    </button>
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

}

function showAddAssetModal() {

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
                        <label>Category</label>

                        <select
                            id="assetCategory"
                            class="form-control">

                            <option>Laptop</option>
                            <option>Desktop</option>
                            <option>Mobile</option>
                            <option>Monitor</option>

                        </select>
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

    const asset =
    getAssets().find(
        a => a.id === assetId
    );

    deleteAssetById(assetId);

    addAssetHistory(
        asset.id,
        "Deleted",
        `${asset.name} removed from inventory`
    );

    loadAssets();
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

    const displayStatus =
        currentAssignment
            ? "Assigned"
            : asset.status;

    const modalHtml = `
    <div class="modal fade"
         id="assetDetailsModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">
                        Asset Details
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>

                <div class="modal-body">

                    <div class="row">

                        <div class="col-md-6">

                            <p>
                                <strong>Asset ID:</strong>
                                ${asset.id}
                            </p>

                            <p>
                                <strong>Name:</strong>
                                ${asset.name}
                            </p>

                            <p>
                                <strong>Category:</strong>
                                ${asset.category}
                            </p>

                            <p>
                                <strong>Location:</strong>
                                ${asset.location || "-"}
                            </p>

                            <p>
                                <strong>Serial Number:</strong>
                                ${asset.serialNumber || "-"}
                            </p>

                            <p>
                                <strong>Vendor:</strong>
                                ${asset.vendor || "-"}
                            </p>

                            <p>
                                <strong>Purchase Date:</strong>
                                ${asset.purchaseDate || "-"}
                            </p>

                            <p>
                                <strong>Warranty Expiry:</strong>
                                ${asset.warrantyExpiry || "-"}
                            </p>
                            <p>
                                <strong>Status:</strong>
                                ${displayStatus}
                            </p>

                        </div>

                        <div class="col-md-3">

                            <small class="text-muted">

                                Current Holder

                            </small>

                            <div>

                                ${
                                    currentAssignment
                                        ? currentAssignment.employeeName
                                        : "Not Assigned"
                                }

                            </div>

                        </div>

                    </div>

                    <hr>
                    <div class="row">
                        <button
                            class="btn btn-warning"
                            onclick="
                                document.querySelectorAll('.modal').forEach(m => m.remove());
                                showAssetTransferModal('${asset.id}');
                                ">

                            <i class="fas fa-exchange-alt"></i>

                            Transfer Asset

                        </button>

                    </div>
                    <hr>
                    <div class="card border-0 bg-light mb-4">

                        <div class="card-body">

                            <h6 class="fw-bold">

                                Asset Statistics

                            </h6>

                            <div class="row mt-3">

                                <div class="col-md-3">

                                    <small class="text-muted">

                                        Status

                                    </small>

                                    <div>

                                        ${displayStatus}

                                    </div>

                                </div>

                                <div class="col-md-3">

                                    <small class="text-muted">

                                        Assignments

                                    </small>

                                    <div>

                                        ${totalAssignments}

                                    </div>

                                </div>

                                <div class="col-md-3">

                                    <small class="text-muted">

                                        Warranty Left

                                    </small>

                                    <div>

                                        ${
                                            warrantyDaysRemaining
                                                ? warrantyDaysRemaining <= 30

                                                    ? `<span class="badge bg-danger">
                                                            ${warrantyDaysRemaining} Days
                                                    </span>`

                                                    : warrantyDaysRemaining <= 90

                                                    ? `<span class="badge bg-warning">
                                                            ${warrantyDaysRemaining} Days
                                                    </span>`

                                                    : `<span class="badge bg-success">
                                                            ${warrantyDaysRemaining} Days
                                                    </span>`
                                                : "-"
                                        }

                                    </div>

                                </div>

                                <div class="col-md-3">

                                    <small class="text-muted">

                                        Asset Age

                                    </small>

                                    <div>

                                        ${
                                            assetAgeDays
                                                ? assetAgeDays + " Days"
                                                : "-"
                                        }

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                        <hr>

                        <h6>
                            Assignment History
                        </h6>

                        ${
                            assignmentHistory.length > 0

                            ? `

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

                                    `).join('')}

                                </tbody>

                            </table>

                            `

                            : `

                            <p class="text-muted">

                                No assignment history.

                            </p>

                            `
                        }

                    <h6 class="mt-4">
                        Asset Timeline
                    </h6>

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

                        `).join('')}

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

        const location =
            row.children[3]?.innerText;

        const matchesSearch =
            text.includes(searchText);

        const matchesLocation =
            !selectedLocation ||
            location === selectedLocation;

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

    if (!asset) {
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

    <div class="alert alert-warning">

        This asset is currently assigned to
        ${activeAssignment.employeeName}.

        Return the asset before changing
        status, location, retiring or
        transferring.

    </div>

    ` : ""}

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
                            class="form-control">

                            <option ${asset.category === "Laptop" ? "selected" : ""}>Laptop</option>

                            <option ${asset.category === "Desktop" ? "selected" : ""}>Desktop</option>

                            <option ${asset.category === "Mobile" ? "selected" : ""}>Mobile</option>

                            <option ${asset.category === "Monitor" ? "selected" : ""}>Monitor</option>

                        </select>

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

    loadAssets();

}