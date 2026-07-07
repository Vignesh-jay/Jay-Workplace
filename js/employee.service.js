function addEmployee(employee) {
  const employees = getEmployees();

  employees.push(employee);

  saveEmployees(employees);

  addActivity(`${employee.name} added to workforce`);

  return employee;
}

function deleteEmployeeById(employeeId) {
  const employees = getEmployees();

  const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);

  saveEmployees(updatedEmployees);
}

function addAssignmentHistory(assignmentId, action, details) {
  const history = getAssignmentHistory();

  history.push({
    assignmentId,
    action,
    details,

    timestamp: formatDateTime(),
  });

  saveAssignmentHistory(history);
}

function getEmployeeById(employeeId) {
  const employees = getEmployees();

  return employees.find((employee) => employee.id === employeeId);
}

function updateEmployee(employeeId, updatedEmployee) {
  const employees = getEmployees();

  const index = employees.findIndex((employee) => employee.id === employeeId);

  if (index === -1) {
    return null;
  }

  employees[index] = updatedEmployee;

  saveEmployees(employees);

  addActivity(`${updatedEmployee.name} updated`);

  return updatedEmployee;
}
