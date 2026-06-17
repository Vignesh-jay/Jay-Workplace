function loadWorkforce() {

    const employeeList = getEmployees();

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

        <button
            class="btn btn-primary"
            onclick="showAddEmployeeModal()">
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
            <th>Actions</th>
        </tr>
    </thead>

        <tbody>

            ${employeeList.map(emp => `

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
                <td>
                    <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="editEmployee('${emp.id}')">
                        Edit
                    </button>

                    <button
                        class="btn btn-sm btn-outline-danger"
                        onclick="deleteEmployee('${emp.id}')">
                        Delete
                    </button>
                </td>

            </tr>

            `).join("")}

        </tbody>

    </table>

</div>

`;

}

function showAddEmployeeModal() {

    const modalHtml = `
    <div class="modal fade"
         id="addEmployeeModal"
         tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        Add Employee
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>
                </div>

                <div class="modal-body">

                    <div class="mb-3">
                        <label>Employee ID</label>
                        <input
                            id="employeeId"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Name</label>
                        <input
                            id="employeeName"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Department</label>
                        <input
                            id="employeeDepartment"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label>Designation</label>
                        <input
                            id="employeeDesignation"
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
                        onclick="saveEmployee()">
                        Save Employee
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
        document.getElementById("addEmployeeModal")
    ).show();
}

function saveEmployee() {

    const employee = {

        id:
            document.getElementById("employeeId").value,

        name:
            document.getElementById("employeeName").value,

        department:
            document.getElementById("employeeDepartment").value,

        designation:
            document.getElementById("employeeDesignation").value,

        status: "Active"
    };

    if (
        !employee.id ||
        !employee.name ||
        !employee.department ||
        !employee.designation
    ) {

        alert("Please fill all fields");

        return;
    }
    const existingEmployees = getEmployees();

    const employeeExists = existingEmployees.some(
        emp => emp.id === employee.id
    );

    if (employeeExists) {

        alert(
            `Employee ID ${employee.id} already exists`
        );

        return;
    }

    addEmployee(employee);
    loadWorkforce();

    bootstrap.Modal.getInstance(
        document.getElementById("addEmployeeModal")
    ).hide();
}

function deleteEmployee(employeeId) {

    if (!confirm("Delete this employee?")) {
        return;
    }

    deleteEmployeeById(employeeId);

    loadWorkforce();
}

function editEmployee(employeeId) {
    alert("Edit Employee Coming Soon");
}