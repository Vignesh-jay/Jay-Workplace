function loadReports(){
    const employeeList = getEmployees();
const assetList = getAssets();
const assignmentList = getAssignments();

setActiveMenu('nav-reports');

document.getElementById("content").innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Reports</h2>
        <p class="text-muted">
            View workforce and asset reports.
        </p>
    </div>

</div>

<div class="row g-4">

    <div class="col-md-4">
        <div class="card-custom">
            <h6>Total Employees</h6>
            <div class="kpi-number">${employeeList.length}</div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card-custom">
            <h6>Total Assets</h6>
            <div class="kpi-number">${assetList.length}</div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card-custom">
            <h6>Total Assignments</h6>
            <div class="kpi-number">${assignmentList.length}</div>
        </div>
    </div>

</div>

<div class="card-custom mt-4">

    <h5 class="mb-4">Export Reports</h5>

    <div class="d-grid gap-3">

        <button
            class="btn btn-outline-primary"
            onclick="exportEmployees()">

            Export Employee Report

        </button>

        <button
            class="btn btn-outline-primary"
            onclick="exportAssets()">

            Export Asset Report

        </button>

        <button
            class="btn btn-outline-primary"
            onclick="exportAssignments()">

            Export Assignment Report

        </button>

    </div>

</div>

`;

}

function downloadCSV(filename, csvContent) {

    const blob = new Blob(
        [csvContent],
        { type: "text/csv" }
    );

    const url =
        window.URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    window.URL.revokeObjectURL(url);
}

function exportEmployees() {

    const employees =
        getEmployees();

    let csv =
        "Employee ID,Name,Department,Designation,Status\n";

    employees.forEach(emp => {

        csv +=
            `${emp.id},${emp.name},${emp.department},${emp.designation},${emp.status}\n`;

    });

    downloadCSV(
        "employees.csv",
        csv
    );
}

function exportAssets() {

    const assets =
        getAssets();

    let csv =
        "Asset ID,Asset Name,Category,Status\n";

    assets.forEach(asset => {

        csv +=
            `${asset.id},${asset.name},${asset.category},${asset.status}\n`;

    });

    downloadCSV(
        "assets.csv",
        csv
    );
}

function exportAssignments() {

    const assignments =
        getAssignments();

    let csv =
        "Asset,Employee,Assigned Date,Status\n";

    assignments.forEach(item => {

        csv +=
            `${item.assetName},${item.employeeName},${item.assignedDate},${item.status}\n`;

    });

    downloadCSV(
        "assignments.csv",
        csv
    );
}

