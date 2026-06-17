function loadDepartments() {

    const departments =
        getDepartments();

    setActiveMenu(
        'nav-administration'
    );

    document.getElementById(
        "content"
    ).innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">
            Departments
        </h2>

        <p class="text-muted">
            Manage organization departments.
        </p>

    </div>

</div>

<div class="card-custom">

    <div class="table-toolbar">

        <button
            class="btn btn-primary"
            onclick="showAddDepartmentModal()">

            Add Department

        </button>

    </div>

    <table class="table mt-4">

        <thead>

            <tr>

                <th>
                    Department Name
                </th>

                <th>
                    Actions
                </th>

            </tr>

        </thead>

        <tbody>

            ${departments.map(dep => `

            <tr>

                <td>${dep}</td>

                <td>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteDepartment('${dep}')">

                        Delete

                    </button>

                </td>

            </tr>

            `).join('')}

        </tbody>

    </table>

</div>

`;

}

function showAddDepartmentModal() {

    const modalHtml = `

    <div class="modal fade"
         id="addDepartmentModal">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">
                        Add Department
                    </h5>

                </div>

                <div class="modal-body">

                    <input
                        id="departmentName"
                        class="form-control"
                        placeholder="Department Name">

                </div>

                <div class="modal-footer">

                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                        Cancel

                    </button>

                    <button
                        class="btn btn-primary"
                        onclick="saveDepartment()">

                        Save

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
            "addDepartmentModal"
        )
    ).show();

}

function saveDepartment() {

    const departmentName =
        document.getElementById(
            "departmentName"
        ).value.trim();

    if (!departmentName) {

        alert(
            "Department name required"
        );

        return;
    }

    const departments =
        getDepartments();

    if (
        departments.includes(
            departmentName
        )
    ) {

        alert(
            "Department already exists"
        );

        return;
    }

    departments.push(
        departmentName
    );

    saveDepartments(
        departments
    );

    addActivity(
        `Department ${departmentName} created`
    );

    loadDepartments();

}

function deleteDepartment(name) {

    const employees = getEmployees();

    const inUse = employees.some(
        emp => emp.department === name
    );

    if (inUse) {

        alert(
            "Department is assigned to employees and cannot be deleted."
        );

        return;
    }

    if (!confirm("Delete department?")) {
        return;
    }

    const departments = getDepartments();

    const updated =
        departments.filter(
            dep => dep !== name
        );

    saveDepartments(updated);

    addActivity(
        `Department ${name} deleted`
    );

    loadDepartments();

}