function loadAdministration(){

setActiveMenu('nav-administration');

document.getElementById("content").innerHTML = `

<div class="page-header">

    <div>
        <h2 class="fw-bold mb-1">Administration</h2>
        <p class="text-muted">
            Manage system configuration and settings.
        </p>
    </div>

</div>

<div class="row g-3 mb-4">

    <div class="col-lg-2 col-md-4">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">

                        Employees

                    </div>

                    <h2>${getEmployees().length}</h2>

                </div>

                <i class="fas fa-users fa-2x text-primary"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-2 col-md-4">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">

                        Departments

                    </div>

                    <h2>${getDepartments().length}</h2>

                </div>

                <i class="fas fa-building fa-2x text-success"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-2 col-md-4">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">

                        Locations

                    </div>

                    <h2>${getLocations().length}</h2>

                </div>

                <i class="fas fa-map-marker-alt fa-2x text-danger"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-2 col-md-4">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">

                        Audit Logs

                    </div>

                    <h2>${getAuditLogs().length}</h2>

                </div>

                <i class="fas fa-clipboard-list fa-2x text-warning"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-2 col-md-4">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">

                        Transfers

                    </div>

                    <h2>${getAssetTransfers().length}</h2>

                </div>

                <i class="fas fa-exchange-alt fa-2x text-info"></i>

            </div>

        </div>

    </div>

    <div class="col-lg-2 col-md-4">

        <div class="dashboard-card card h-100">

            <div class="card-body">

                <div>

                    <div class="text-muted small">

                        Version

                    </div>

                    <h2>1.1</h2>

                </div>

                <i class="fas fa-code-branch fa-2x text-secondary"></i>

            </div>

        </div>

    </div>

</div>

<h5 class="fw-bold mb-3">

    Management Center

</h5>

<div class="row g-4 mb-4">

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-primary-subtle text-primary">

                <i class="fas fa-building"></i>

            </div>

            <h6>

                Departments

            </h6>

            <p class="text-muted">

                Manage organizational departments.

            </p>

            <button
                class="btn btn-primary w-100"
                onclick="loadDepartments()">

                Manage

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-success-subtle text-success">

                <i class="fas fa-map-marker-alt"></i>

            </div>

            <h6>

                Locations

            </h6>

            <p class="text-muted">

                Manage office locations.

            </p>

            <button
                class="btn btn-success w-100"
                onclick="loadLocations()">

                Manage

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-warning-subtle text-warning">

                <i class="fas fa-clipboard-list"></i>

            </div>

            <h6>

                Audit Logs

            </h6>

            <p class="text-muted">

                View complete activity logs.

            </p>

            <button
                class="btn btn-warning w-100"
                onclick="loadAuditLogs()">

                View Logs

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-secondary-subtle text-secondary">

                <i class="fas fa-user-shield"></i>

            </div>

            <h6>

                Roles & Permissions

            </h6>

            <p class="text-muted">

                User roles and permissions.

            </p>

            <button
                class="btn btn-secondary w-100"
                disabled>

                Coming Soon

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-info-subtle text-info">

                <i class="fas fa-cogs"></i>

            </div>

            <h6>

                System Settings

            </h6>

            <p class="text-muted">

                Configure application preferences.

            </p>

            <button
                class="btn btn-info w-100"
                disabled>

                Coming Soon

            </button>

        </div>

    </div>

    <div class="col-md-4">

        <div class="export-card">

            <div class="export-icon bg-danger-subtle text-danger">

                <i class="fas fa-database"></i>

            </div>

            <h6>

                Data Management

            </h6>

            <p class="text-muted">

                Backup and restore application data.

            </p>

            <button
                class="btn btn-danger w-100"
                onclick="openDataManagement()">
                Open

            </button>

        </div>

    </div>

</div>
</div>

`;

}

function openDataManagement() {

    const existing =
        document.getElementById("dataManagementModal");

    if (existing) {
        existing.remove();
    }

    const modalHtml = `

    <div class="modal fade"
         id="dataManagementModal"
         tabindex="-1">

        <div class="modal-dialog modal-lg">

            <div class="modal-content">

                <div class="asset-hero d-flex align-items-center position-relative px-4 py-4">

                    <div class="asset-image me-4">

                        <div class="asset-avatar">

                            <i class="fas fa-database"></i>

                        </div>

                    </div>

                    <div>

                        <h2 class="mb-1">

                            Data Management

                        </h2>

                        <div class="text-muted">

                            Backup, Restore and Reset Jay Workplace

                        </div>

                    </div>

                    <button
                        class="btn-close position-absolute"
                        style="top:24px;right:24px;"
                        data-bs-dismiss="modal">
                    </button>

                </div>

                <div class="modal-body">

                    <div class="asset-info-card mb-4">

                        <h6>

                            Export Backup

                        </h6>

                        <p class="text-muted">

                            Download a complete backup of all data.

                        </p>

                        <button
                            class="btn btn-primary"
                            onclick="exportBackup()">

                            <i class="fas fa-download me-2"></i>

                            Export Backup

                        </button>

                    </div>
                    <div class="asset-info-card mb-4">

                        <h6>

                            Restore Backup

                        </h6>

                        <p class="text-muted">

                            Restore data from a previous backup.

                        </p>

                        <div class="row g-2">

                            <div class="col-md-8">

                                <input
                                    id="restoreFile"
                                    type="file"
                                    class="form-control">

                            </div>

                            <div class="col-md-4">

                                <button
                                    class="btn btn-success w-100"
                                    onclick="restoreBackup()">

                                    Restore

                                </button>

                            </div>

                        </div>

                    </div>
                    <div class="asset-info-card">

                        <h6 class="text-danger">

                            Reset Application

                        </h6>

                        <p class="text-muted">

                            Permanently delete all data stored in Jay Workplace.

                        </p>

                        <button
                            class="btn btn-danger"
                            onclick="resetSystem()">

                            Reset All Data

                        </button>

                    </div>
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
            "dataManagementModal"
        )
    ).show();

}

function exportBackup() {

    const backup = {

        employees: getEmployees(),

        assets: getAssets(),

        assignments: getAssignments(),

        activities: getActivities(),

        departments: getDepartments(),

        locations: getLocations(),

        auditLogs: getAuditLogs(),

        assetTransfers: getAssetTransfers(),

        assetHistory: getAssetHistory(),

        employeeHistory: getEmployeeHistory(),

        exportDate: formatDateTime(),

        version: "1.1.0"

    };

    const blob = new Blob(
        [
            JSON.stringify(
                backup,
                null,
                2
            )
        ],
        {
            type: "application/json"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "jay-workplace-backup.json";

    a.click();

    URL.revokeObjectURL(url);

    addActivity(
        "Backup exported"
    );
}

function restoreBackup() {

    const file =
        document.getElementById(
            "restoreFile"
        ).files[0];

    if (!file) {

        alert(
            "Select a backup file"
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload = function(e) {

        try {

            const backup =
                JSON.parse(
                    e.target.result
                );

            saveEmployees(
                backup.employees || []
            );

            saveAssets(
                backup.assets || []
            );

            saveAssignments(
                backup.assignments || []
            );

            saveActivities(
                backup.activities || []
            );

            saveDepartments(
                backup.departments || []
            );

            saveLocations(
                backup.locations || []
            );

            saveAuditLogs(
                backup.auditLogs || []
            );

            saveAssetTransfers(
                backup.assetTransfers || []
            );

            saveAssetHistory(
                backup.assetHistory || []
            );

            saveEmployeeHistory(
                backup.employeeHistory || []
            );

            alert(
                "Backup restored successfully"
            );

            location.reload();

        } catch(error) {

            console.error(error);

            alert(
                "Restore failed: " +
                error.message
            );

        }

    };

    reader.readAsText(file);
}

function resetSystem() {

    if (!confirm(
        "Delete all application data?"
    )) {
        return;
    }

    localStorage.clear();

    alert(
        "All data has been reset."
    );

    location.reload();

}

function getEmployeeHistory() {
    return JSON.parse(
        localStorage.getItem("employeeHistory")
    ) || [];
}

function saveEmployeeHistory(history) {
    localStorage.setItem(
        "employeeHistory",
        JSON.stringify(history)
    );
}