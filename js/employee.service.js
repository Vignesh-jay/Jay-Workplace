function addEmployee(employee) {

    const employees = getEmployees();

    employees.push(employee);

    saveEmployees(employees);

    addActivity(
        `${employee.name} added to workforce`
    );

    return employee;
}

function deleteEmployeeById(employeeId) {

    const employees = getEmployees();

    const updatedEmployees = employees.filter(
        employee => employee.id !== employeeId
    );

    saveEmployees(updatedEmployees);
}

function addAssignmentHistory(
    assignmentId,
    action,
    details
) {

    const history =
        getAssignmentHistory();

    history.push({

        assignmentId,
        action,
        details,

        timestamp: formatDateTime()

    });

    saveAssignmentHistory(history);

}