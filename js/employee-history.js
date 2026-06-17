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

        timestamp:
            new Date().toLocaleString(
                "en-IN"
            )

    });

    saveEmployeeHistory(
        history
    );

}