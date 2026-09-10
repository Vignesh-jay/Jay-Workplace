const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const fs = require('fs');
const path = require('path');

async function generateSystemBackup() {
  return {
    departments: await prisma.department.findMany(),

    locations: await prisma.location.findMany(),

    employees: await prisma.employee.findMany(),

    employeeHistory: await prisma.employeeHistory.findMany(),

    activities: await prisma.activity.findMany(),

    assets: await prisma.asset.findMany(),

    assetHistory: await prisma.assetHistory.findMany(),

    assetStatuses: await prisma.assetStatus.findMany(),

    assetTransfers: await prisma.assetTransfer.findMany(),

    assignments: await prisma.assignment.findMany(),

    users: await prisma.user.findMany(),

    userLocations: await prisma.userLocation.findMany(),

    userPermissions: await prisma.userPermission.findMany(),

    metadata: {
      version: '2.0',
      createdAt: new Date(),
    },
  };
}

async function saveSafetyBackup() {
  const backup = await generateSystemBackup();

  const backupsDir = path.join(__dirname, '../backups');

  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const fileName = `safety-backup-${timestamp}.json`;

  const filePath = path.join(backupsDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(backup, null, 2));

  return filePath;
}

async function clearDatabase() {
  console.log('Clearing database...');

  await prisma.userPermission.deleteMany();

  await prisma.userLocation.deleteMany();

  await prisma.assignment.deleteMany();

  await prisma.assetTransfer.deleteMany();

  await prisma.assetHistory.deleteMany();

  await prisma.employeeHistory.deleteMany();

  await prisma.activity.deleteMany();

  await prisma.user.deleteMany();

  await prisma.asset.deleteMany();

  await prisma.employee.deleteMany();

  await prisma.location.deleteMany();

  await prisma.department.deleteMany();

  await prisma.assetStatus.deleteMany();

  console.log('Database cleared');
}

exports.createBackup = async (req, res) => {
  try {
    const backup = {
      departments: await prisma.department.findMany(),
      locations: await prisma.location.findMany(),
      employees: await prisma.employee.findMany(),
      employeeHistory: await prisma.employeeHistory.findMany(),
      activities: await prisma.activity.findMany(),
      assets: await prisma.asset.findMany(),
      assetHistory: await prisma.assetHistory.findMany(),
      assetStatuses: await prisma.assetStatus.findMany(),
      assetTransfers: await prisma.assetTransfer.findMany(),
      assignments: await prisma.assignment.findMany(),
      users: await prisma.user.findMany(),
      userLocations: await prisma.userLocation.findMany(),
      userPermissions: await prisma.userPermission.findMany(),

      metadata: {
        version: '2.0',
        createdAt: new Date(),
      },
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    const fileName = `jay-workplace-backup-${timestamp}.json`;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(backup, null, 2));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.restoreBackup = async (req, res) => {
  try {
    const backup = JSON.parse(req.file.buffer.toString());

    if (!backup.metadata || !backup.metadata.version) {
      return res.status(400).json({
        success: false,
        message: 'Invalid backup',
      });
    }

    const backupPath = await saveSafetyBackup();

    console.log('Safety backup saved:', backupPath);

    await clearDatabase();

    console.log('Restoring database...');

    // 1. Departments
    if (backup.departments?.length) {
      await prisma.department.createMany({
        data: backup.departments,
      });
    }

    // 2. Locations
    if (backup.locations?.length) {
      await prisma.location.createMany({
        data: backup.locations,
      });
    }

    // 3. Employees
    if (backup.employees?.length) {
      await prisma.employee.createMany({
        data: backup.employees,
      });
    }

    // 4. Asset Statuses
    if (backup.assetStatuses?.length) {
      await prisma.assetStatus.createMany({
        data: backup.assetStatuses,
      });
    }

    // 5. Users
    if (backup.users?.length) {
      await prisma.user.createMany({
        data: backup.users,
      });
    }

    // 6. User Locations
    if (backup.userLocations?.length) {
      await prisma.userLocation.createMany({
        data: backup.userLocations,
      });
    }

    // 7. User Permissions
    if (backup.userPermissions?.length) {
      await prisma.userPermission.createMany({
        data: backup.userPermissions,
      });
    }

    // 8. Assets
    if (backup.assets?.length) {
      await prisma.asset.createMany({
        data: backup.assets,
      });
    }

    // 9. Assignments
    if (backup.assignments?.length) {
      await prisma.assignment.createMany({
        data: backup.assignments,
      });
    }

    // 10. Activities
    if (backup.activities?.length) {
      await prisma.activity.createMany({
        data: backup.activities,
      });
    }

    // 11. Employee History
    if (backup.employeeHistory?.length) {
      await prisma.employeeHistory.createMany({
        data: backup.employeeHistory,
      });
    }

    // 12. Asset History
    if (backup.assetHistory?.length) {
      await prisma.assetHistory.createMany({
        data: backup.assetHistory,
      });
    }

    // 13. Asset Transfers
    if (backup.assetTransfers?.length) {
      await prisma.assetTransfer.createMany({
        data: backup.assetTransfers,
      });
    }

    console.log('Restore completed');

    await prisma.activity.create({
      data: {
        module: 'Administration',
        action: 'Restore',
        description: 'Database restored from backup',
        performedByName: 'Administrator',
      },
    });

    return res.json({
      success: true,
      message: 'Backup restored successfully',
      summary: {
        departments: backup.departments?.length || 0,
        locations: backup.locations?.length || 0,
        employees: backup.employees?.length || 0,
        assets: backup.assets?.length || 0,
        users: backup.users?.length || 0,
        assignments: backup.assignments?.length || 0,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetSystem = async (req, res) => {
  try {
    const backupPath = await saveSafetyBackup();

    console.log('Pre-reset backup saved:', backupPath);

    await clearDatabase();

    const bcrypt = require('bcryptjs');

    const passwordHash = await bcrypt.hash('Admin@123', 10);

    await prisma.user.create({
      data: {
        email: 'administrator@jayworkplace.local',

        fullName: 'Administrator',

        passwordHash,

        role: 'ADMINISTRATOR',

        status: 'ACTIVE',

        mustChangePassword: true,
      },
    });

    return res.json({
      success: true,
      message: 'System reset completed successfully',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.generateSystemBackup = generateSystemBackup;
