function loadAssets(){

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

        <button class="btn btn-primary">
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

            ${assets.map(asset => `

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