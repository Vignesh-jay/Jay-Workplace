/**
 * Validate imported rows.
 */

function validateEmployees(session) {
  const employeeIds = new Set();
  const emails = new Set();

  session.rows.forEach((employee, index) => {
    employee.errors = [];

    // Required Fields
    if (!employee.employeeId) employee.errors.push('Employee ID is required');

    if (!employee.firstName) employee.errors.push('First Name is required');

    if (!employee.lastName) employee.errors.push('Last Name is required');

    if (!employee.department) employee.errors.push('Department is required');

    if (!employee.designation) employee.errors.push('Designation is required');

    if (!employee.location) employee.errors.push('Location is required');

    if (!employee.employmentType) employee.errors.push('Employment Type is required');

    if (!employee.dateOfJoining) employee.errors.push('Date of Joining is required');

    // Duplicate Employee ID
    if (employee.employeeId) {
      if (employeeIds.has(employee.employeeId)) {
        employee.errors.push('Duplicate Employee ID');
      } else {
        employeeIds.add(employee.employeeId);
      }
    }

    // Duplicate Email
    if (employee.email) {
      if (emails.has(employee.email)) {
        employee.errors.push('Duplicate Email');
      } else {
        emails.add(employee.email);
      }
    }

    // Email Format
    if (employee.email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(employee.email)) {
        employee.errors.push('Invalid Email');
      }
    }

    employee.valid = employee.errors.length === 0;
  });


}
