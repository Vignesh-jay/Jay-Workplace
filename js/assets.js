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
            document.getElementById("assetId").value,

        name:
            document.getElementById("assetName").value,

        category:
            document.getElementById("assetCategory").value,

        status: "Available"
    };

    addAsset(asset);

    loadAssets();

    bootstrap.Modal.getInstance(
        document.getElementById("addAssetModal")
    ).hide();
}

function deleteAsset(assetId) {

    if (!confirm("Delete this asset?")) {
        return;
    }

    deleteAssetById(assetId);

    loadAssets();
}

function editAsset(assetId) {
    alert("Edit Asset Coming Soon");
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

                    <h6>Assignment History</h6>

                    <table class="table">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Employee</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            ${history.map(item => `
                                <tr>

                                    <td>
                                        ${item.assignedDate}
                                    </td>

                                    <td>
                                        ${item.employeeName}
                                    </td>

                                    <td>
                                        ${item.status}
                                    </td>

                                </tr>
                            `).join('')}

                        </tbody>

                    </table>

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