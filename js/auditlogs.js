employee.name =
    `${employee.firstName} ${employee.lastName}`;

function loadAuditLogs() {

    const activities =
        getActivities();

    setActiveMenu(
        'nav-administration'
    );

    document.getElementById(
        "content"
    ).innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">
            Audit Logs
        </h2>

        <p class="text-muted">
            System activity history.
        </p>

    </div>

</div>

<div class="card-custom">

    <table class="table">

        <thead>

            <tr>

                <th>#</th>

                <th>Date & Time</th>

                <th>Activity</th>

            </tr>

        </thead>

        <tbody>

            ${activities.map((item,index)=>`

            <tr>

                <td>${index+1}</td>

                <td>${item.timestamp}</td>

                <td>${item.message}</td>

            </tr>

            `).join('')}

        </tbody>

    </table>

</div>

`;

}