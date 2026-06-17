function loadDashboard() {

    const employeeList = getEmployees();
    const assetList = getAssets();

    const totalEmployees = employeeList.length;

    const totalAssets = assetList.length;

    const assignedAssets = assetList.filter(
        asset => asset.status === "Assigned"
    ).length;

    const availableAssets = assetList.filter(
        asset => asset.status === "Available"
    ).length;

    setActiveMenu('nav-dashboard');

    document.getElementById("content").innerHTML = `

<div class="mb-4">
    <h2 class="fw-bold">Welcome Back, Admin 👋</h2>
    <p class="text-muted mb-0">
        Here's what's happening in your workplace today.
    </p>
</div>

<!-- KPI Cards -->
<div class="row g-4">

    <div class="col-md-3">
        <div class="card-custom">
            <p>Total Employees</p>
            <div class="kpi-number">${totalEmployees}</div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card-custom">
            <p>Total Assets</p>
            <div class="kpi-number">${totalAssets}</div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card-custom">
            <p>Assigned Assets</p>
            <div class="kpi-number">${assignedAssets}</div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card-custom">
            <p>Available Assets</p>
            <div class="kpi-number">${availableAssets}</div>
        </div>
    </div>

</div>

<!-- Charts -->

<div class="row mt-4">

    <div class="col-md-6">
        <div class="card-custom">
            <h5>Department Distribution</h5>
            <div class="chart-wrapper">
    <canvas id="deptChart"></canvas>
</div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card-custom">
            <h5>Asset Categories</h5>
            <div class="chart-wrapper">
    <canvas id="assetChart"></canvas>
</div>
        </div>
    </div>

</div>

<!-- Recent Activities + Quick Actions -->

<div class="row mt-4">

    <div class="col-lg-8">
        <div class="card-custom">
            <h5>Recent Activities</h5>

            <ul class="activity-list mt-3">
                ${getActivities()
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map(item =>
                        `<li>${item}</li>`
                    ).join('')
                }
            </ul>

        </div>
    </div>

    <div class="col-lg-4">
        <div class="card-custom">
            <h5>Quick Actions</h5>

            <button
                class="btn btn-primary w-100 mt-3"
                onclick="loadWorkforce()">

                Add Employee

            </button>

            <button
                class="btn btn-outline-primary w-100 mt-2"
                onclick="loadAssets()">

                Add Asset

            </button>

            <button
                class="btn btn-outline-primary w-100 mt-2"
                onclick="loadAssignments()">

                Assign Asset

            </button>

        </div>
    </div>

</div>

`;
renderCharts();
}

function renderCharts() {

const deptCtx = document.getElementById('deptChart');

new Chart(deptCtx, {
    type: 'doughnut',
    data: {
        labels: ['IT', 'HR', 'Finance', 'Admin', 'Operations'],
        datasets: [{
            data: [85, 25, 40, 32, 66]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

const assetCtx = document.getElementById('assetChart');

const assets = getAssets();

const laptops =
    assets.filter(
        a => a.category === "Laptop"
    ).length;

const desktops =
    assets.filter(
        a => a.category === "Desktop"
    ).length;

const mobiles =
    assets.filter(
        a => a.category === "Mobile"
    ).length;

const monitors =
    assets.filter(
        a => a.category === "Monitor"
    ).length;

new Chart(assetCtx, {

    type: 'bar',

    data: {

        labels: [
            'Laptop',
            'Desktop',
            'Mobile',
            'Monitor'
        ],

        datasets: [{

            label: 'Assets',

            data: [
                laptops,
                desktops,
                mobiles,
                monitors
            ]

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});

}