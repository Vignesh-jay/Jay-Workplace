function loadWorkforce() {
setActiveMenu('nav-workforce');
document.getElementById("content").innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Workforce</h2>
        <p class="text-muted">
            Manage employees and workforce information.
        </p>
    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar">

        <input
            type="text"
            class="form-control search-input"
            placeholder="Search employee..."
        >

        <button class="btn btn-primary">
            <i class="fas fa-plus"></i>
            Add Employee
        </button>

    </div>

    <table class="table align-middle mt-4">

        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>

            ${employees.map(emp => `

            <tr>

                <td>${emp.id}</td>

                <td>${emp.name}</td>

                <td>${emp.department}</td>

                <td>${emp.designation}</td>

                <td>
                    <span class="status-badge active">
                        ${emp.status}
                    </span>
                </td>

            </tr>

            `).join("")}

        </tbody>

    </table>

</div>

`;

}