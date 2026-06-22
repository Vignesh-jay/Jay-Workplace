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
            id="employeeSearch"
            onkeyup="filterEmployees()"
        >

        <select
            id="locationFilter"
            class="form-select"
            onchange="filterEmployees()">

            <option value="">
                All Locations
            </option>

            ${getLocations().map(location => `
                <option value="${location.name}">
                    ${location.name}
                </option>
            `).join("")}

        </select>

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
            <th>Location</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>

        <tbody>

            ${employeeList.map(emp => `

            <tr>

                <td>${emp.id}</td>

                <td>
                    ${emp.firstName}
                    ${emp.lastName}
                </td>

                <td>${emp.department}</td>

                <td>${emp.location || '-'}</td>

                <td>${emp.designation}</td>

                <td>
                    <span class="status-badge active">
                        ${emp.status}
                    </span>
                </td>
                <td>
                    <button
                        class="btn btn-sm btn-outline-info"
                        onclick="viewEmployee('${emp.id}')">

                        View

                    </button>
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

    const locations = getLocations();

    const modalHtml = `
    <div class="modal fade"
         id="addEmployeeModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

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
        <div class="text-muted small mb-3">
            Fields marked with
            <span class="text-danger">*</span>
            are required.
        </div>
        <div class="row g-3">

            <div class="col-md-6">

                <label class="form-label">
                    Employee ID
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeId"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Email Address
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeEmail"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    First Name
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeFirstName"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Last Name
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeLastName"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Department
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeDepartment"
                    class="form-select">

                    ${getDepartments().map(dep => `
                        <option>${dep}</option>
                    `).join('')}

                </select>

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Designation
                    <span class="text-danger">*</span>
                </label>

                <input
                    id="employeeDesignation"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Manager
                </label>

                <input
                    id="employeeManager"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Location
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeLocation"
                    class="form-select">

                    <option value="">
                        Select Location
                    </option>

                    ${locations.map(location => `
                        <option value="${location.name}">
                            ${location.name}
                        </option>
                    `).join("")}

                </select>

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Date of Joining
                    <span class="text-danger">*</span>
                </label>

                <input
                    type="date"
                    id="employeeJoiningDate"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Date of Leaving (if Applicable)
                </label>

                <input
                    type="date"
                    id="employeeLeavingDate"
                    class="form-control">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Employment Type
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeType"
                    class="form-select">

                    <option>Full Time</option>
                    <option>Contract</option>
                    <option>Intern</option>

                </select>

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Status
                    <span class="text-danger">*</span>
                </label>

                <select
                    id="employeeStatus"
                    class="form-select">

                    <option>Active</option>
                    <option>Inactive</option>
                    <option>On Leave</option>
                    <option>Resigned</option>

                </select>

            </div>

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
            document.getElementById(
                "employeeId"
            ).value,

        firstName:
            document.getElementById(
                "employeeFirstName"
            ).value,

        lastName:
            document.getElementById(
                "employeeLastName"
            ).value,

        email:
            document.getElementById(
                "employeeEmail"
            ).value,

        department:
            document.getElementById(
                "employeeDepartment"
            ).value,

        designation:
            document.getElementById(
                "employeeDesignation"
            ).value,

        manager:
            document.getElementById(
                "employeeManager"
            ).value,

        joiningDate:
            document.getElementById(
                "employeeJoiningDate"
            ).value,

        leavingDate:
            document.getElementById(
                "employeeLeavingDate"
            ).value,

        location:
            document.getElementById(
                "employeeLocation"
            ).value,

        employmentType:
            document.getElementById(
                "employeeType"
            ).value,

        status:
            document.getElementById(
                "employeeStatus"
            ).value

    };

    if (
        !employee.id ||
        !employee.department ||
        !employee.designation ||
        !employee.status ||
        !employee.email ||  
        !employee.joiningDate ||
        !employee.employmentType ||
        !employee.location ||
        !employee.firstName ||
        !employee.lastName
    ) {

        alert("Please fill all Required fields");

        return;
    }

    employee.name =
    `${employee.firstName} ${employee.lastName}`;
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

    addEmployeeHistory(
        employee.id,
        "Created",
        "Employee onboarded"
    );

    alert(
        `Employee ${employee.firstName} ${employee.lastName} added successfully`
    );

    loadWorkforce();

    bootstrap.Modal.getInstance(
        document.getElementById("addEmployeeModal")
    ).hide();
}

function deleteEmployee(employeeId) {

    const assignedAssets =
        getAssignments().filter(
            a =>
                a.employeeId === employeeId &&
                a.status === "Assigned"
        );

    if (assignedAssets.length > 0) {

        alert(
            `Cannot delete employee.\n\nOutstanding Assets:\n\n${
                assignedAssets
                    .map(a => a.assetName)
                    .join("\n")
            }`
        );

        return;
    }

    if (!confirm("Delete this employee?")) {
        return;
    }

    deleteEmployeeById(employeeId);

    addEmployeeHistory(
        employeeId,
        "Deleted",
        "Employee removed"
    );

    addActivity(
        `Employee with ID ${employeeId} deleted`
    );

    loadWorkforce();
}

function filterEmployees() {

    const searchText =
        document
            .getElementById("employeeSearch")
            .value
            .toLowerCase();

    const selectedLocation =
        document
            .getElementById("locationFilter")
            .value;

    const rows =
        document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        const rowText =
            row.innerText.toLowerCase();

        const locationCell =
            row.children[3]?.innerText || "";

        const matchesSearch =
            rowText.includes(searchText);

        const matchesLocation =
            !selectedLocation ||
            locationCell === selectedLocation;

        row.style.display =
            matchesSearch && matchesLocation
                ? ""
                : "none";

    });

}

function editEmployee(employeeId) {

    const existingModal =
        document.getElementById(
            "editEmployeeModal"
        );

    if (existingModal) {
        existingModal.remove();
    }
    const employees = getEmployees();

    const employee =
        employees.find(
            e => e.id === employeeId
        );

    if (!employee) {
        return;
    }

    const locations = getLocations();
    const modalHtml = `

    <div class="modal fade"
         id="editEmployeeModal"
         tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">
                        Edit Employee
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
                        id="editEmployeeId"
                        value="${employee.id}">

                    <div class="row g-3">

                        <div class="col-md-6">
                            <label>First Name</label>
                            <input
                                id="editEmployeeFirstName"
                                class="form-control"
                                value="${employee.firstName || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Last Name</label>
                            <input
                                id="editEmployeeLastName"
                                class="form-control"
                                value="${employee.lastName || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Email Address</label>
                            <input
                                id="editEmployeeEmail"
                                class="form-control"
                                value="${employee.email || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Department</label>
                            <select
                                id="editEmployeeDepartment"
                                class="form-select">

                                ${getDepartments().map(dep => `
                                    <option
                                        value="${dep}"
                                        ${employee.department === dep ? 'selected' : ''}>
                                        ${dep}
                                    </option>
                                `).join('')}

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Designation</label>
                            <input
                                id="editEmployeeDesignation"
                                class="form-control"
                                value="${employee.designation || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Manager</label>
                            <input
                                id="editEmployeeManager"
                                class="form-control"
                                value="${employee.manager || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Location</label>
                            <select
                                id="editEmployeeLocation"
                                class="form-select">

                                ${locations.map(location => `
                                    <option
                                        value="${location.name}"
                                        ${employee.location === location.name ? 'selected' : ''}>
                                        ${location.name}
                                    </option>
                                `).join('')}

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Date of Joining</label>
                            <input
                                type="date"
                                id="editEmployeeJoiningDate"
                                class="form-control"
                                value="${employee.joiningDate || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Date of Leaving</label>
                            <input
                                type="date"
                                id="editEmployeeLeavingDate"
                                class="form-control"
                                value="${employee.leavingDate || ''}">
                        </div>

                        <div class="col-md-6">
                            <label>Employment Type</label>
                            <select
                                id="editEmployeeType"
                                class="form-select">

                                <option
                                    ${employee.employmentType === 'Full Time' ? 'selected' : ''}>
                                    Full Time
                                </option>

                                <option
                                    ${employee.employmentType === 'Contract' ? 'selected' : ''}>
                                    Contract
                                </option>

                                <option
                                    ${employee.employmentType === 'Intern' ? 'selected' : ''}>
                                    Intern
                                </option>

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label>Status</label>
                            <select
                                id="editEmployeeStatus"
                                class="form-select">

                                <option
                                    ${employee.status === 'Active' ? 'selected' : ''}>
                                    Active
                                </option>

                                <option
                                    ${employee.status === 'Inactive' ? 'selected' : ''}>
                                    Inactive
                                </option>

                                <option
                                    ${employee.status === 'On Leave' ? 'selected' : ''}>
                                    On Leave
                                </option>

                                <option
                                    ${employee.status === 'Resigned' ? 'selected' : ''}>
                                    Resigned
                                </option>

                            </select>
                        </div>

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
                        onclick="saveEmployeeEdit()">

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
            "editEmployeeModal"
        )
    ).show();
}

function saveEmployeeEdit() {

    const employeeId =
        document.getElementById(
            "editEmployeeId"
        ).value;

    const employees =
        getEmployees();

    const employee =
        employees.find(
            e => e.id === employeeId
        );

    if (!employee) {
        return;
    }

    const oldEmployee = {
        ...employee
    };

    const oldLocation =
        employee.location || "";

    employee.firstName =
        document.getElementById(
            "editEmployeeFirstName"
        ).value;

    employee.lastName =
        document.getElementById(
            "editEmployeeLastName"
        ).value;

    employee.department =
        document.getElementById(
            "editEmployeeDepartment"
        ).value;

    employee.designation =
        document.getElementById(
            "editEmployeeDesignation"
        ).value;

    employee.email =
    document.getElementById(
        "editEmployeeEmail"
    ).value;

    employee.manager =
        document.getElementById(
            "editEmployeeManager"
        ).value;

    const newLocation =
        document.getElementById(
            "editEmployeeLocation"
        ).value;

    employee.location =
        newLocation;

    employee.joiningDate =
        document.getElementById(
            "editEmployeeJoiningDate"
        ).value;

    employee.leavingDate =
        document.getElementById(
            "editEmployeeLeavingDate"
        ).value;

    employee.employmentType =
        document.getElementById(
            "editEmployeeType"
        ).value;

    employee.status =
        document.getElementById(
            "editEmployeeStatus"
        ).value;

    employee.name =
    `${employee.firstName} ${employee.lastName}`;

    addActivity(
        `Employee ${employee.firstName} ${employee.lastName} updated`
    );

    const changes = [];

    if (oldEmployee.firstName !== employee.firstName)
        changes.push(
            `First Name: ${oldEmployee.firstName} → ${employee.firstName}`
        );

    if (oldEmployee.lastName !== employee.lastName)
        changes.push(
            `Last Name: ${oldEmployee.lastName} → ${employee.lastName}`
        );

    if (oldEmployee.email !== employee.email)
        changes.push(
            `Email: ${oldEmployee.email} → ${employee.email}`
        );

    if (oldEmployee.department !== employee.department)
        changes.push(
            `Department: ${oldEmployee.department} → ${employee.department}`
        );

    if (oldEmployee.designation !== employee.designation)
        changes.push(
            `Designation: ${oldEmployee.designation} → ${employee.designation}`
        );

    if (oldEmployee.manager !== employee.manager)
        changes.push(
            `Manager: ${oldEmployee.manager} → ${employee.manager}`
        );

    if (oldEmployee.location !== employee.location)
        changes.push(
            `Location: ${oldEmployee.location} → ${employee.location}`
        );

    if (oldEmployee.status !== employee.status)
        changes.push(
            `Status: ${oldEmployee.status} → ${employee.status}`
        );

    if (oldEmployee.employmentType !== employee.employmentType)
        changes.push(
            `Employment Type: ${oldEmployee.employmentType} → ${employee.employmentType}`
        );

    const assignedAssets =
    getAssignments().filter(
        a =>
            a.employeeId === employee.id &&
            a.status === "Assigned"
    );

    if (
        (employee.status === "Resigned" || employee.status === "Inactive" )&&
        assignedAssets.length > 0
    ) {

        alert(
            `Cannot mark employee as Resigned / Inactive.\n\nOutstanding Assets:\n\n${
                assignedAssets
                    .map(a => a.assetName)
                    .join("\n")
            }`
        );

        return;
    }

    if (
        oldLocation &&
        oldLocation !== newLocation
    ) {

        addEmployeeTransfer({

            id: Date.now(),

            employeeId:
                employee.id,

            employeeName:
                `${employee.firstName} ${employee.lastName}`,

            fromLocation:
                oldLocation,

            toLocation:
                newLocation,

            effectiveDate:
                formatDateTime(),

            remarks:
                "Location changed via Employee Edit"

        });

        addActivity(
            `Employee ${employee.name} transferred from ${oldLocation} to ${newLocation}`
        );

        addEmployeeHistory(
            employee.id,
            "Transferred",
            `${oldLocation} → ${newLocation}`
        );

    }

    saveEmployees(employees);

    addEmployeeHistory(
        employee.id,
        "Updated",
        changes.length > 0
            ? changes.join("<br>")
            : "No changes detected"
    );

    bootstrap.Modal.getInstance(
        document.getElementById(
            "editEmployeeModal"
        )
    ).hide();

    loadWorkforce();
}

function viewEmployee(employeeId) {

    const employees =
        getEmployees();

    const assignments =
        getAssignments();

    const employee =
        employees.find(
            e => e.id === employeeId
        );

    if (!employee) {
        return;
    }

    const employeeAssets =
        assignments.filter(
            item =>
                item.employeeId === employeeId &&
                item.status === "Assigned"
        );

    const history =
    (getEmployeeHistory() || [])
        .filter(
            item =>
                item.employeeId === employeeId
        );

    const modalHtml = `

    <div class="modal fade"
         id="employeeProfileModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title">

                        Employee Profile

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
                                <strong>ID:</strong>
                                ${employee.id}
                            </p>

                            <p>
                                <strong>Name:</strong>
                                ${employee.firstName || ''}
                                ${employee.lastName || ''}
                            </p>

                            <p>
                                <strong>Department:</strong>
                                ${employee.department}
                            </p>

                            <p>
                                <strong>Designation:</strong>
                                ${employee.designation}
                            </p>

                            <p>
                                <strong>Status:</strong>
                                ${employee.status}
                            </p>

                            <p>
                                <strong>Email:</strong>
                                ${employee.email}
                            </p>

                            <p>
                                <strong>Manager:</strong>
                                ${employee.manager}
                            </p>

                            <p>
                                <strong>Location:</strong>
                                ${employee.location}
                            </p>

                            <p>
                                <strong>Employment Type:</strong>
                                ${employee.employmentType}
                            </p>

                            <p>
                                <strong>Joining Date:</strong>
                                ${employee.joiningDate}
                            </p>

                        </div>

                    </div>

                        <hr>

                        <h5>
                            Employee Timeline
                        </h5>

                        <div class="timeline">

                        ${history.length > 0 ?

                            history.map(item => `

                                <div class="timeline-item">

                                    <div class="timeline-dot"></div>

                                    <div class="timeline-content">

                                        <strong>
                                            ${item.action}
                                        </strong>

                                        <br>

                                        ${item.details}

                                        <br>

                                        <small class="text-muted">

                                            ${item.timestamp}

                                        </small>

                                    </div>

                                </div>

                            `).join('')

                        :

                            `<p class="text-muted">
                                No history available.
                            </p>`

                        }

                        </div>

                    <hr>
                    <h6>
                        Assigned Assets
                    </h6>

                    ${
                        employeeAssets.length > 0
                        ? `
                        <ul>

                            ${employeeAssets.map(asset => `

                                <li>
                                    ${asset.assetName}
                                </li>

                            `).join('')}

                        </ul>
                        `
                        : `
                        <p class="text-muted">
                            No assets assigned.
                        </p>
                        `
                    }

                </div>

            </div>

        </div>

    </div>
    `;

    const existingModal =
        document.getElementById(
            "employeeProfileModal"
        );

    if (existingModal) {
        existingModal.remove();
    }

    document.body.insertAdjacentHTML(
        "beforeend",
        modalHtml
    );

    new bootstrap.Modal(
        document.getElementById(
            "employeeProfileModal"
        )
    ).show();
    
    addActivity(
        `Viewed employee profile: ${employee.firstName} ${employee.lastName}`
    );
}

function getEmployeeName(employee) {

    return [
        employee.firstName,
        employee.lastName
    ].join(" ");

}