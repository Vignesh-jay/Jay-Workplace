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

<div class="row g-4">

    <div class="col-md-6">
        <div class="card-custom">
            <h5>Department Management</h5>
            <p class="text-muted">
                Configure departments and organizational structure.
            </p>
            <button
                class="btn btn-primary mt-3"
                onclick="loadDepartments()">

                Manage Departments

            </button>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card-custom">
            <h5>Roles & Permissions</h5>
            <p class="text-muted">
                Manage access control and user permissions.
            </p>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card-custom">
            <h5>Audit Logs</h5>

            <p class="text-muted">
                Review system activity and changes.
            </p>

            <button
                class="btn btn-primary mt-3"
                onclick="loadAuditLogs()">

                View Logs

            </button>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card-custom">
            <h5>System Settings</h5>
            <p class="text-muted">
                Configure application preferences.
            </p>
        </div>
    </div>
    <div class="col-md-6">
    <div class="card-custom">

        <h5>Backup & Restore</h5>

        <p class="text-muted">
            Export and restore Jay Workplace data.
        </p>

        <div class="d-grid gap-2 mt-3">

            <button
                class="btn btn-primary"
                onclick="exportBackup()">

                Export Backup

            </button>

            <input
                type="file"
                id="restoreFile"
                class="form-control">

            <button
                class="btn btn-success"
                onclick="restoreBackup()">

                Restore Backup

            </button>
            <button
                class="btn btn-danger"
                onclick="resetSystem()">

                Reset All Data

            </button>

        </div>
        </div>
    </div>
    <div class="col-md-6">
    <div class="card-custom">

        <h5>System Information</h5>

        <table class="table">

            <tr>
                <td>Version</td>
                <td>1.0.0 MVP</td>
            </tr>

            <tr>
                <td>Employees</td>
                <td>${getEmployees().length}</td>
            </tr>

            <tr>
                <td>Assets</td>
                <td>${getAssets().length}</td>
            </tr>

            <tr>
                <td>Assignments</td>
                <td>${getAssignments().length}</td>
            </tr>

            <tr>
                <td>Storage</td>
                <td>Local Storage</td>
            </tr>

        </table>

    </div>
</div>
</div>

`;

}

function exportBackup() {

    const backup = {

        employees: getEmployees(),
        assets: getAssets(),
        assignments: getAssignments(),
        activities: getActivities()

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

            alert(
                "Backup restored successfully"
            );

            location.reload();

        } catch {

            alert(
                "Invalid backup file"
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

    saveEmployees([]);
    saveAssets([]);
    saveAssignments([]);
    saveActivities([]);

    alert(
        "All data has been reset."
    );

    location.reload();
}