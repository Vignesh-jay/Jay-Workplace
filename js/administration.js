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

</div>

`;

}