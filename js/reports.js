function loadReports(){

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
            <div class="kpi-number">${employees.length}</div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card-custom">
            <h6>Total Assets</h6>
            <div class="kpi-number">${assets.length}</div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card-custom">
            <h6>Total Assignments</h6>
            <div class="kpi-number">${assignments.length}</div>
        </div>
    </div>

</div>

<div class="card-custom mt-4">

    <h5 class="mb-4">Export Reports</h5>

    <div class="d-grid gap-3">

        <button class="btn btn-outline-primary">
            Employee Report
        </button>

        <button class="btn btn-outline-primary">
            Asset Report
        </button>

        <button class="btn btn-outline-primary">
            Assignment Report
        </button>

    </div>

</div>

`;

}