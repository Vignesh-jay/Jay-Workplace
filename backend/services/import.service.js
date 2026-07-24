const prisma = require('../db');

/**
 * Validate Employee Import
 */
async function validateEmployees(rows) {
  // -----------------------------
  // Load Master Data
  // -----------------------------

  const [employees, departments, locations] = await Promise.all([
    prisma.employee.findMany(),
    prisma.department.findMany({
      where: {
        status: true,
      },
    }),
    prisma.location.findMany({
      where: {
        status: true,
      },
    }),
  ]);

  // -----------------------------
  // Lookup Maps
  // -----------------------------

  const employeeMap = new Map();

  employees.forEach((employee) => {
    employeeMap.set(employee.employeeId.trim().toUpperCase(), employee);

    if (employee.email) {
      employeeMap.set(employee.email.trim().toLowerCase(), employee);
    }
  });

  const departmentMap = new Map();

  departments.forEach((department) => {
    departmentMap.set(department.name.trim().toUpperCase(), department);
  });

  const locationMap = new Map();

  locations.forEach((location) => {
    locationMap.set(location.name.trim().toUpperCase(), location);
  });

  // -----------------------------
  // Validate Rows
  // -----------------------------

  rows.forEach((employee) => {
    if (!employee.errors) {
      employee.errors = [];
    }

    // -------------------------
    // Employee ID Exists
    // -------------------------

    if (employee.employeeId && employeeMap.has(employee.employeeId.trim().toUpperCase())) {
      employee.errors.push('Employee ID already exists.');
    }

    // -------------------------
    // Email Exists
    // -------------------------

    if (employee.email && employeeMap.has(employee.email.trim().toLowerCase())) {
      employee.errors.push('Email already exists.');
    }

    // -------------------------
    // Department Exists
    // -------------------------

    if (employee.department) {
      const department = departmentMap.get(employee.department.trim().toUpperCase());

      if (!department) {
        employee.errors.push('Department not found.');
      } else {
        employee.departmentId = department.id;
      }
    }

    // -------------------------
    // Location Exists
    // -------------------------

    if (employee.location) {
      const location = locationMap.get(employee.location.trim().toUpperCase());

      if (!location) {
        employee.errors.push('Location not found.');
      } else {
        employee.locationId = location.id;
      }
    }

    // -------------------------
    // Final Status
    // -------------------------

    employee.valid = employee.errors.length === 0;
  });

  // -----------------------------
  // Summary
  // -----------------------------

  const summary = {
    total: rows.length,
    valid: rows.filter((r) => r.valid).length,
    invalid: rows.filter((r) => !r.valid).length,
  };

  return {
    success: true,
    summary,
    rows,
  };
}

/**
 * Import Employees
 */

async function importEmployees(rows) {
  // Validate Again
  const validation = await validateEmployees(rows);

  if (validation.summary.invalid > 0) {
    return validation;
  }

  await prisma.$transaction(async (tx) => {
    for (const employee of validation.rows) {
      const createdEmployee = await tx.employee.create({
        data: {
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone || null,

          department: employee.department,
          designation: employee.designation,
          manager: employee.manager || null,

          location: employee.location,
          employmentType: employee.employmentType,

          joiningDate: new Date(employee.dateOfJoining),

          status: 'Active',
        },
      });

      await tx.employeeHistory.create({
        data: {
          employeeId: createdEmployee.id,
          action: 'Created',
          details: 'Employee imported from Excel',
        },
      });

      await tx.activity.create({
        data: {
          module: 'Employee',
          action: 'Import',
          description: `Employee ${createdEmployee.employeeId} imported from Excel.`,

          entityType: 'Employee',
          entityId: createdEmployee.id,
          entityCode: createdEmployee.employeeId,

          performedBy: 'Administrator',
        },
      });
    }
  });

  return {
    success: true,
    summary: {
      total: validation.rows.length,
      imported: validation.rows.length,
      skipped: 0,
      failed: 0,
    },
  };
}

module.exports = {
  validateEmployees,
  importEmployees,
};
