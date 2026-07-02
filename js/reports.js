function loadReports(){
    const employeeList = getEmployees();
const assetList = getAssets();
const assignmentList = getAssignments();
const activeAssignments =
    assignmentList.filter(
        item => item.status === "Assigned"
    ).length;

const expiringWarranty =
    getExpiringAssets(30).length;

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

<div class="row g-3 mb-4">

    <div class="col-md-3">

        <div class="card dashboard-card h-100">

            <div class="card-body">

                <div class="text-muted small">
                    Total Employees
                </div>

                <h2>${employeeList.length}</h2>

                <i class="fas fa-users fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card h-100">

            <div class="card-body">

                <div class="text-muted small">
                    Total Assets
                </div>

                <h2>${assetList.length}</h2>

                <i class="fas fa-laptop fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card h-100">

            <div class="card-body">

                <div class="text-muted small">
                    Active Assignments
                </div>

                <h2>${activeAssignments}</h2>

                <i class="fas fa-user-check fa-2x text-success"></i>

            </div>

        </div>

    </div>

    <div class="col-md-3">

        <div class="card dashboard-card h-100">

            <div class="card-body">

                <div class="text-muted small">
                    Warranty (30 Days)
                </div>

                <h2>${expiringWarranty}</h2>

                <i class="fas fa-shield-alt fa-2x text-warning"></i>

            </div>

        </div>

    </div>

</div>

<div class="row g-4 mt-1">

    <div class="col-md-6">

        <div class="card-custom chart-card">

            <h6 class="fw-bold mb-3">

                Assets by Category

            </h6>

            <div class="chart-container">

                <canvas id="categoryChart"></canvas>

            </div>

        </div>

    </div>

    <div class="col-md-6">

        <div class="card-custom chart-card">

            <h6 class="fw-bold mb-3">

                Assets by Location

            </h6>

            <div class="chart-container">
                <canvas id="locationChart"></canvas>
            </div>

        </div>

    </div>

</div>

<div class="row g-4 mt-1">

    <div class="col-md-6">
        <div class="card-custom chart-card">

            <h5 class="mb-4">
                Department Distribution
            </h5>

            <div class="chart-container">
                <canvas id="departmentChart"></canvas>
            </div>

        </div>
    </div>

    <div class="col-md-6">

        <div class="card-custom chart-card">

            <h5 class="mb-4">

                Asset Status

            </h5>

            <div class="chart-container">

                <canvas id="assetStatusChart"></canvas>

            </div>

        </div>

    </div>

</div>

<div class="card-custom mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h5 class="mb-1">

                Export Center

            </h5>

            <small class="text-muted">

                Download reports in CSV format.

            </small>

        </div>

        <i class="fas fa-file-export fa-2x text-primary"></i>

    </div>

    <div class="row g-4">

        <div class="col-md-4">

            <div class="export-card">

                <div class="export-icon bg-primary-subtle text-primary">

                    <i class="fas fa-users"></i>

                </div>

                <h6>

                    Employee Report

                </h6>

                <p class="text-muted">

                    Complete workforce information.

                </p>

                <button

                    class="btn btn-primary w-100"

                    onclick="exportEmployees()">

                    <i class="fas fa-download me-2"></i>

                    Export CSV

                </button>

            </div>

        </div>

        <div class="col-md-4">

            <div class="export-card">

                <div class="export-icon bg-success-subtle text-success">

                    <i class="fas fa-laptop"></i>

                </div>

                <h6>

                    Asset Report

                </h6>

                <p class="text-muted">

                    Complete asset inventory.

                </p>

                <button

                    class="btn btn-success w-100"

                    onclick="exportAssets()">

                    <i class="fas fa-download me-2"></i>

                    Export CSV

                </button>

            </div>

        </div>

        <div class="col-md-4">

            <div class="export-card">

                <div class="export-icon bg-warning-subtle text-warning">

                    <i class="fas fa-exchange-alt"></i>

                </div>

                <h6>

                    Assignment Report

                </h6>

                <p class="text-muted">

                    Asset allocation history.

                </p>

                <button

                    class="btn btn-warning w-100"

                    onclick="exportAssignments()">

                    <i class="fas fa-download me-2"></i>

                    Export CSV

                </button>

            </div>

        </div>

    </div>

</div>

`;

renderReportCharts();

}

function getToday() {

    return new Date()
        .toISOString()
        .split("T")[0];

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

    showToast(
        `${filename} exported successfully.`,
        "success"
    );

    window.URL.revokeObjectURL(url);
}

function exportEmployees() {

    const employees = getEmployees();

    let csv =
"Employee ID,First Name,Last Name,Email,Phone,Department,Designation,Manager,Location,Employment Type,Joining Date,Leaving Date,Status\n";

employees.forEach(emp => {

    csv += [
        emp.id,
        emp.firstName,
        emp.lastName,
        emp.email,
        emp.phone,
        emp.department,
        emp.designation,
        emp.manager,
        emp.location,
        emp.employmentType,
        emp.joiningDate,
        emp.leavingDate || "",
        emp.status
    ].join(",") + "\n";

});

    downloadCSV(
        `Employee_Report_${getToday()}.csv`,
        csv
    );

}

function exportAssets() {

    const assets = getAssets();

    let csv =
"Asset ID,Asset Name,Category,Brand,Model,Serial Number,Purchase Date,Warranty Expiry,Vendor,Invoice Number,Cost,Location,Assigned To,Status,Remarks\n";

assets.forEach(asset=>{

    csv += [

        asset.id,
        asset.name,
        asset.category,
        asset.brand,
        asset.model,
        asset.serialNumber,
        asset.purchaseDate,
        asset.warrantyExpiry,
        asset.vendor,
        asset.invoiceNumber,
        asset.cost,
        asset.location,
        asset.assignedTo || "",
        asset.status,
        asset.remarks || ""

    ].join(",") + "\n";

});

    downloadCSV(
        `Asset_Report_${getToday()}.csv`,
        csv
    );

}

function exportAssignments() {

    const assignments = getAssignments();

    let csv =
"Asset ID,Asset Name,Employee ID,Employee Name,Assigned Date,Returned Date,Status,Assigned By,Returned By,Notes\n";

assignments.forEach(item=>{

    csv += [

        item.assetId,
        item.assetName,
        item.employeeId,
        item.employeeName,
        item.assignedDate,
        item.returnedDate || "",
        item.status,
        item.assignedBy || "",
        item.returnedBy || "",
        item.notes || ""

    ].join(",") + "\n";

});

    downloadCSV(
        `Assignment_Report_${getToday()}.csv`,
        csv
    );

}

function renderReportCharts() {

    renderCategoryChart();

    renderLocationChart();

    renderDepartmentChart();

    renderAssetStatusChart();

}

function renderCategoryChart() {

    const assets = getAssets();

    const counts = {};

    assets.forEach(asset => {

        counts[asset.category] =
            (counts[asset.category] || 0) + 1;

    });

    new Chart(

        document.getElementById("categoryChart"),

        {

            type: "doughnut",

            data: {

                labels: Object.keys(counts),

                datasets: [{

                    data: Object.values(counts)

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}

function renderLocationChart() {

    const assets = getAssets();

    const counts = {};

    assets.forEach(asset => {

        counts[asset.location] =
            (counts[asset.location] || 0) + 1;

    });

    new Chart(

        document.getElementById("locationChart"),

        {

            type: "bar",

            data: {

                labels: Object.keys(counts),

                datasets: [{

                    label: "Assets",

                    data: Object.values(counts)

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}

function renderDepartmentChart() {

    const employees = getEmployees();

    const counts = {};

    employees.forEach(employee => {

        counts[employee.department] =
            (counts[employee.department] || 0) + 1;

    });

    new Chart(

        document.getElementById("departmentChart"),

        {

            type: "pie",

            data: {

                labels: Object.keys(counts),

                datasets: [{

                    data: Object.values(counts)

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}

function renderAssetStatusChart() {

    const assets = getAssets();

    const counts = {};

    assets.forEach(asset => {

        counts[asset.status] =
            (counts[asset.status] || 0) + 1;

    });

    new Chart(

        document.getElementById("assetStatusChart"),

        {

            type: "doughnut",

            data: {

                labels: Object.keys(counts),

                datasets: [{

                    data: Object.values(counts),

                    backgroundColor: [

                        "#3b82f6", // Assigned

                        "#22c55e", // Available

                        "#f59e0b", // Maintenance

                        "#ef4444", // Lost

                        "#6b7280", // Retired

                        "#8b5cf6"  // Others

                    ]

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}