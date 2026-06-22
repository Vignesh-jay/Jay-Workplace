function loadDashboard() {

    const expiringAssets =
    getExpiringAssets();

    const employeeList = getEmployees();
    const assetList = getAssets();

    const totalEmployees = employeeList.length;

    const totalAssets =
        getAssets().filter(
            asset =>
                asset.status !== "Retired" &&
                asset.status !== "Transferred"
        ).length;

    const assignedAssets =
        getAssignments().filter(
            a => a.status === "Assigned"
        ).length;

    const activeAssignedAssetIds =
        getAssignments()
            .filter(
                a => a.status === "Assigned"
            )
            .map(
                a => a.assetId
            );

    const availableAssets =
        getAssets().filter(
            asset =>
                asset.status === "Available" &&
                !activeAssignedAssetIds.includes(asset.id)
        ).length;

    const retiredAssets =
        getAssets().filter(
            a => a.status === "Retired"
        ).length;

    const transferredAssets =
        getAssets().filter(
            a => a.status === "Transferred"
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
                    .slice(0,5)
                    .map(item => `

                        <li>

                            <strong>
                                ${item.timestamp}
                            </strong>

                            <br>

                            ${item.message}

                        </li>

                    `).join('')
                }
            </ul>

        </div>
    </div>
    <div class="col-lg-4">

        <div class="card-custom">

            <h5>
                ⚠ Warranty Expiring Soon
            </h5>

            ${expiringAssets.map(asset => {

                const daysLeft =
                    Math.ceil(
                        (
                            new Date(asset.warrantyExpiry)
                            -
                            new Date()
                        ) /
                        (1000 * 60 * 60 * 24)
                    );

                const badgeClass =
                    daysLeft <= 30
                        ? "bg-danger"
                        : daysLeft <= 60
                            ? "bg-warning"
                            : "bg-success";

                return `

                    <div class="mb-3">

                        <strong>
                            ${asset.name} - ${asset.serialNumber}
                        </strong>

                        <br>

                        <span class="badge ${badgeClass}">

                            ${daysLeft}
                            Days Remaining

                        </span>

                    </div>

                `;

            }).join('') ||

                `<p class="text-muted">
                    No upcoming expiries.
                </p>`

            }

        </div>
            <br>
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

const employees =
    getEmployees();

const departmentCounts = {};

employees.forEach(emp => {

    departmentCounts[
        emp.department
    ] =
        (
            departmentCounts[
                emp.department
            ] || 0
        ) + 1;

});

const deptLabels =
    Object.keys(
        departmentCounts
    );

const deptData =
    Object.values(
        departmentCounts
    );

const deptCtx =
    document.getElementById(
        'deptChart'
    );

new Chart(deptCtx, {

    type: 'doughnut',

    data: {

        labels: deptLabels,

        datasets: [{

            data: deptData

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