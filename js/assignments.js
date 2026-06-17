function loadAssignments(){

    const assignmentList = getAssignments();

    setActiveMenu('nav-assignments');

document.getElementById("content").innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Assignments</h2>
        <p class="text-muted">
            Manage asset allocation and assignments.
        </p>
    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar">

        <input
            type="text"
            class="form-control search-input"
            placeholder="Search assignment..."
            id="assignmentSearch"
            onkeyup="filterAssignments()"
        >

        <button
            class="btn btn-primary"
            onclick="showAssignAssetModal()">
            <i class="fas fa-plus"></i>
            Assign Asset
        </button>

    </div>

    <table class="table align-middle mt-4">

        <thead>
            <tr>
                <th>Asset</th>
                <th>Employee</th>
                <th>Assigned Date</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>

            ${assignmentList.map(item => `

            <tr>

                <td>${item.assetName || item.asset}</td>

                <td>${item.employeeName || item.employee}</td>

                <td>${item.assignedDate}</td>

                <td>
                    <span class="status-badge ${
                        item.status === "Assigned"
                            ? "assigned"
                            : "available"
                    }">
                        ${item.status}
                    </span>
                </td>

                <td>

                ${item.status === "Assigned" ? `

                    <button
                        class="btn btn-sm btn-outline-success"
                        onclick="returnAsset('${item.assetId}')">

                        Return

                    </button>

                ` : `
                    <span class="text-muted">
                        Completed
                    </span>
                `}

            </td>

            </tr>

            `).join('')}

        </tbody>

    </table>

</div>

`;

}

function showAssignAssetModal() {

    const employees = getEmployees();

    const assets = getAssets().filter(
        asset => asset.status === "Available"
    );

    const modalHtml = `
    <div class="modal fade"
         id="assignAssetModal"
         tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        Assign Asset
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">

                    <div class="mb-3">
                        <label>Employee</label>

                        <select
                            id="employeeSelect"
                            class="form-control">

                            ${employees.map(emp => `
                                <option value="${emp.id}">
                                    ${emp.name}
                                </option>
                            `).join('')}

                        </select>
                    </div>

                    <div class="mb-3">
                        <label>Asset</label>

                        <select
                            id="assetSelect"
                            class="form-control">

                            ${assets.map(asset => `
                                <option value="${asset.id}">
                                    ${asset.name}
                                </option>
                            `).join('')}

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
                        onclick="saveAssignment()">
                        Assign
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
        document.getElementById("assignAssetModal")
    ).show();
}

function returnAsset(assetId) {

    if (!confirm("Return this asset?")) {
        return;
    }

    const assets = getAssets();

    const assignments = getAssignments();

    const asset =
        assets.find(a => a.id === assetId);

    const assignment =
        assignments.find(
            a =>
                a.assetId === assetId &&
                a.status === "Assigned"
        );

    if (!asset || !assignment) {
        return;
    }

    asset.status = "Available";

    assignment.status = "Returned";

    assignment.returnedDate =
        new Date().toLocaleString(
            'en-IN'
        );

    addAssetHistory(
        asset.id,
        "Returned",
        `Returned by ${assignment.employeeName}`
    );

    saveAssets(assets);

    saveAssignments(assignments);

    addEmployeeHistory(
    assignment.employeeId,
    "Asset Returned",
    asset.name
);

    addActivity(
        `${asset.name} returned by ${assignment.employeeName}`
    );

    loadAssignments();
}

function filterAssignments() {

    const searchText =
        document
            .getElementById("assignmentSearch")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText
                .toLowerCase()
                .includes(searchText)
            ? ""
            : "none";

    });

}