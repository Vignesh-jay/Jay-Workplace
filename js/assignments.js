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
            </tr>
        </thead>

        <tbody>

            ${assignmentList.map(item => `

            <tr>

                <td>${item.assetName || item.asset}</td>

                <td>${item.employeeName || item.employee}</td>

                <td>${item.assignedDate}</td>

                <td>
                    <span class="status-badge active">
                        ${item.status}
                    </span>
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