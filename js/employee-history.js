employee.name =
    `${employee.firstName} ${employee.lastName}`;

function addEmployeeHistory(
    employeeId,
    action,
    details
) {

    const history =
        getEmployeeHistory();

    history.unshift({

        employeeId,

        action,

        details,

        timestamp: formatDateTime()

    });

    saveEmployeeHistory(
        history
    );

}