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
            onkeyup="filterAssets()"
        >

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
                <th>Status</th>
                <th>Actions</th>
            </tr>
            
        </thead>

        <tbody>

            ${assetList.map(asset => `

            <tr>

                <td>${asset.id}</td>

                <td>${asset.name}</td>

                <td>${asset.category}</td>

                <td>
                    <span class="status-badge ${asset.status.toLowerCase()}">
                        ${asset.status}
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

            `).join('')}

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

        status: "Available"

    };

    if (!asset.id || !asset.name) {

        alert(
            "Asset ID and Asset Name are required."
        );

        return;

    }

    addAsset(asset);

    addActivity(
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

    if (!confirm("Delete this asset?")) {
        return;
    }

    deleteAssetById(assetId);

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

    const history = assignments.filter(
        a => a.assetId === assetId
    );

    const currentAssignment =
        history.find(
            a => a.status === "Assigned"
        );

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
                                ${asset.status}
                            </p>

                        </div>

                        <div class="col-md-6">

                            <p>
                                <strong>Current Holder:</strong>
                                ${
                                    currentAssignment
                                    ? currentAssignment.employeeName
                                    : "Not Assigned"
                                }
                            </p>

                        </div>

                    </div>

                    <hr>

                    <h6 class="mt-4">
                        Asset Timeline
                    </h6>

                    <div class="timeline mt-3">

                        <div class="timeline-item">

                            <div class="timeline-dot bg-primary"></div>

                            <div class="timeline-content">

                                <strong>
                                    Asset Added
                                </strong>

                                <br>

                                <small class="text-muted">
                                    ${asset.purchaseDate || "Unknown Date"}
                                </small>

                            </div>

                        </div>

                        ${history.map(item => `

                            <div class="timeline-item">

                                <div class="timeline-dot ${
                                    item.status === "Assigned"
                                    ? "bg-success"
                                    : "bg-warning"
                                }"></div>

                                <div class="timeline-content">

                                    <strong>

                                        ${item.status}

                                    </strong>

                                    <br>

                                    ${item.employeeName}

                                    <br>

                                    <small class="text-muted">

                                        ${item.assignedDate}

                                    </small>

                                </div>

                            </div>

                        `).join('')}

                    </div>

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
            "assetDetailsModal"
        )
    ).show();
}

function filterAssets() {

    const searchText =
        document
            .getElementById("assetSearch")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll(
            "tbody tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(searchText)
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

    const modalHtml = `

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
                            class="form-control">

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

    addActivity(
        `Asset ${asset.name} updated`
    );

    saveAssets(assets);

    bootstrap.Modal.getInstance(
        document.getElementById(
            "editAssetModal"
        )
    ).hide();

    loadAssets();
}