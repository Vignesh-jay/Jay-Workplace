function loadAssignments(){

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

        <button class="btn btn-primary">
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

            ${assignments.map(item => `

            <tr>

                <td>${item.asset}</td>

                <td>${item.employee}</td>

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