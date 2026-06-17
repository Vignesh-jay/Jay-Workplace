function loadAssets(){

    const assetList = getAssets();

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

            </tr>

            `).join('')}

        </tbody>

    </table>

</div>

`;

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