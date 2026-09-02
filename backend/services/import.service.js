const prisma = require('../db');

const USER_STATUS = require('../constants/userStatus');
const ASSET_STATUS = require('../constants/assetStatus');

const activityService = require('./activity.service');

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

          status: USER_STATUS.ACTIVE,
        },
      });

      await tx.employeeHistory.create({
        data: {
          employeeId: createdEmployee.id,
          action: 'Created',
          details: 'Employee imported from Excel',
        },
      });

      await activityService.logActivity(
        {
          module: 'Employee',
          action: 'Import',
          description: `Employee ${createdEmployee.employeeId} imported from Excel.`,
          entityType: 'Employee',
          entityId: createdEmployee.id,
          entityCode: createdEmployee.employeeId,
          performedByName: 'System',
          performedByUserId: null,
        },
        tx
      );
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

async function validateAssets(rows) {
  let valid = 0;
  let invalid = 0;

  for (const asset of rows) {
    asset.errors = asset.errors || [];

    const existingAsset = await prisma.asset.findUnique({
      where: {
        assetId: asset.assetId,
      },
    });

    if (existingAsset) {
      asset.errors.push(`Asset ID "${asset.assetId}" already exists.`);
    }

    if (asset.serialNumber) {
      const existingSerial = await prisma.asset.findFirst({
        where: {
          serialNumber: asset.serialNumber,
        },
      });

      if (existingSerial) {
        asset.errors.push(`Serial Number "${asset.serialNumber}" already exists.`);
      }
    }

    const location = await prisma.location.findFirst({
      where: {
        name: asset.location,

        status: true,
      },
    });

    if (!location) {
      asset.errors.push(`Location "${asset.location}" does not exist.`);
    }

    asset.valid = asset.errors.length === 0;

    if (asset.valid) valid++;
    else invalid++;
  }

  return {
    success: true,

    summary: {
      total: rows.length,

      valid,

      invalid,
    },

    rows,
  };
}

async function importAssets(rows) {
  const validation = await validateAssets(rows);

  if (validation.summary.invalid > 0) return validation;

  await prisma.$transaction(async (tx) => {
    for (const asset of validation.rows) {
      const createdAsset = await tx.asset.create({
        data: {
          assetId: asset.assetId,

          name: asset.name,

          category: asset.category,

          manufacturer: asset.manufacturer || null,

          model: asset.model || null,

          serialNumber: asset.serialNumber || null,

          purchaseDate: asset.purchaseDate ? new Date(asset.purchaseDate) : null,

          warrantyExpiry: asset.warrantyExpiry ? new Date(asset.warrantyExpiry) : null,

          location: asset.location,

          status: ASSET_STATUS.AVAILABLE,
        },
      });

      await tx.assetHistory.create({
        data: {
          assetId: createdAsset.id,

          action: 'Created',

          details: 'Asset imported from Excel',
        },
      });

      await activityService.logActivity(
        {
          module: 'Asset',
          action: 'Import',
          description: `Asset ${createdAsset.assetId} imported from Excel.`,
          entityType: 'Asset',
          entityId: createdAsset.id,
          entityCode: createdAsset.assetId,
          performedByName: 'System',
          performedByUserId: null,
        },
        tx
      );
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

async function logActivity(activity, prismaClient = prisma) {
  console.log('LOGGING ACTIVITY');
  console.log(activity);

  return prismaClient.activity.create({
    data: {
      module: activity.module,
      action: activity.action,
      description: activity.description,
      entityType: activity.entityType ?? null,
      entityId: activity.entityId ?? null,
      entityCode: activity.entityCode ?? null,
      performedByName: activity.performedByName,
      performedByUserId: activity.performedByUserId ?? null,
    },
  });
}

module.exports = {
  validateEmployees,
  importEmployees,

  validateAssets,
  importAssets,
};
