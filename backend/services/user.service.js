const prisma = require('../db');

const ROLE_PERMISSIONS = require('../constants/rolePermissions');

const { hashPassword } = require('../utils/bcrypt');

const { generateTemporaryPassword } = require('../utils/password');

const activityService = require('./activity.service');

const MODULES = require('../constants/activityModules');

const ACTIONS = require('../constants/activityActions');

async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      status: true,
      lastLogin: true,

      employee: {
        select: {
          id: true,
          employeeId: true,
          firstName: true,
          lastName: true,
        },
      },

      locations: {
        include: {
          location: true,
        },
      },
    },

    orderBy: {
      fullName: 'asc',
    },
  });
}

async function getUser(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      status: true,
      lastLogin: true,

      employee: {
        select: {
          id: true,
          employeeId: true,
          firstName: true,
          lastName: true,
          department: true,
          designation: true,
          location: true,
        },
      },

      permissions: {
        select: {
          permission: true,
          allowed: true,
        },
      },

      locations: {
        include: {
          location: true,
        },
      },
    },
  });
}

async function createUser(data) {
  return prisma.$transaction(async (tx) => {
    // Check if email already exists
    const existingUser = await tx.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error('Email already exists.');
    }

    // Validate employee
    let employee = null;

    if (data.employeeId) {
      employee = await tx.employee.findUnique({
        where: {
          id: data.employeeId,
        },
      });

      if (!employee) {
        throw new Error('Employee not found.');
      }
    }

    // Generate password
    const temporaryPassword = generateTemporaryPassword();

    const passwordHash = await hashPassword(temporaryPassword);

    // Create user
    const user = await tx.user.create({
      data: {
        employeeId: data.employeeId || null,

        email: data.email,

        passwordHash,

        fullName: data.fullName || (employee ? `${employee.firstName} ${employee.lastName}` : ''),

        role: data.role,

        status: data.status,

        mustChangePassword: true,

        passwordResetAt: new Date(),
      },
    });

    // Assign Locations
    if (data.locationIds?.length) {
      await tx.userLocation.createMany({
        data: data.locationIds.map((locationId) => ({
          userId: user.id,
          locationId,
        })),
      });
    }

    // Assign default permissions based on role
    const defaultPermissions = ROLE_PERMISSIONS[data.role] || [];

    if (defaultPermissions.length) {
      await tx.userPermission.createMany({
        data: defaultPermissions.map((permission) => ({
          userId: user.id,
          permission,
          allowed: true,
        })),
      });
    }

    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,
        action: ACTIONS.CREATE_USER,

        description: `${data.createdByName} created user account for ${user.fullName}.`,

        entityType: 'User',
        entityId: user.id,
        entityCode: user.email,

        performedByName: data.createdByName,
        performedByUserId: data.createdByUserId,
      },
      tx
    );

    return {
      user,

      temporaryPassword,
    };
  });
}

async function updateUser(id, data) {
  return prisma.$transaction(async (tx) => {
    // Check existing user
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    // Check duplicate email
    const existingEmail = await tx.user.findFirst({
      where: {
        email: data.email,
        NOT: {
          id,
        },
      },
    });

    if (existingEmail) {
      throw new Error('Email already exists.');
    }

    // Build update object
    const updateData = {
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      status: data.status,
    };

    // Preserve employee mapping unless explicitly changed
    if (data.employeeId !== undefined) {
      updateData.employeeId = data.employeeId;
    }

    // Update user
    const updatedUser = await tx.user.update({
      where: {
        id,
      },
      data: updateData,
    });

    // If role changed, remove all permission overrides.
    // The new role permissions will automatically come from ROLE_PERMISSIONS.
    if (user.role !== data.role) {
      // Remove all existing permission overrides
      await tx.userPermission.deleteMany({
        where: {
          userId: id,
        },
      });

      // Get default permissions for the new role
      const defaultPermissions = ROLE_PERMISSIONS[data.role] || [];

      if (defaultPermissions.length) {
        await tx.userPermission.createMany({
          data: defaultPermissions.map((permission) => ({
            userId: id,
            permission,
            allowed: true,
          })),
        });
      }
    }

    // Activity Log
    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,
        action: ACTIONS.UPDATE_USER,

        description: `${data.performedBy.fullName} updated ${updatedUser.fullName}.`,

        entityType: 'User',
        entityId: updatedUser.id,
        entityCode: updatedUser.email,

        performedByName: data.performedBy.fullName,
        performedByUserId: data.performedBy.id,
      },
      tx
    );

    // Return updated user
    return tx.user.findUnique({
      where: {
        id: updatedUser.id,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        lastLogin: true,
        mustChangePassword: true,

        employee: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
            department: true,
            designation: true,
            location: true,
          },
        },

        permissions: {
          select: {
            permission: true,
            allowed: true,
          },
        },

        locations: {
          include: {
            location: true,
          },
        },
      },
    });
  });
}

async function resetPassword(id, performedBy) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const temporaryPassword = generateTemporaryPassword();

    const passwordHash = await hashPassword(temporaryPassword);

    await tx.user.update({
      where: {
        id,
      },
      data: {
        passwordHash,
        mustChangePassword: true,
        passwordResetAt: new Date(),
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });
    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,
        action: ACTIONS.RESET_PASSWORD,

        description: `${performedBy.fullName} reset the password for ${user.fullName}.`,

        entityType: 'User',
        entityId: user.id,
        entityCode: user.email,

        performedByName: performedBy.fullName,
        performedByUserId: performedBy.id,
      },
      tx
    );

    return {
      temporaryPassword,
    };
  });
}

async function setUserStatus(id, status, performedBy) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const updatedUser = await tx.user.update({
      where: { id },
      data: {
        status,
      },
    });

    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,

        action: status === 'ACTIVE' ? ACTIONS.ENABLE_USER : ACTIONS.DISABLE_USER,

        description: `${performedBy.fullName} ${status === 'ACTIVE' ? 'enabled' : 'disabled'} ${user.fullName}.`,

        entityType: 'User',
        entityId: user.id,
        entityCode: user.email,

        performedByName: performedBy.fullName,
        performedByUserId: performedBy.id,
      },
      tx
    );

    return updatedUser;
  });
}

async function unlockUser(id, performedBy) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const updatedUser = await tx.user.update({
      where: { id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,
        action: ACTIONS.UNLOCK_USER,
        description: `${performedBy.fullName} unlocked ${user.fullName}.`,
        entityType: 'User',
        entityId: user.id,
        entityCode: user.email,
        performedByName: performedBy.fullName,
        performedByUserId: performedBy.id,
      },
      tx
    );

    return updatedUser;
  });
}

async function deleteUser(id, currentUser) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  if (user.status !== 'DISABLED') {
    throw new Error('Only disabled users can be deleted.');
  }

  if (user.role === 'ADMINISTRATOR') {
    throw new Error('Administrator account cannot be deleted.');
  }

  if (user.id === currentUser.id) {
    throw new Error('You cannot delete your own account.');
  }

  await activityService.logActivity(
    {
      module: MODULES.ADMINISTRATION,
      action: ACTIONS.DELETE_USER,

      description: `${currentUser.fullName} deleted ${user.fullName}.`,

      entityType: 'User',
      entityId: user.id,
      entityCode: user.email,

      performedByName: currentUser.fullName,
      performedByUserId: currentUser.id,
    },
    prisma
  );

  await prisma.user.delete({
    where: { id },
  });

  return true;
}

async function getUserLocations(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      locations: {
        include: {
          location: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  return user.locations.map((item) => item.location);
}

async function updateUserLocations(id, locationIds, performedBy) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    await tx.userLocation.deleteMany({
      where: {
        userId: id,
      },
    });

    if (locationIds.length) {
      await tx.userLocation.createMany({
        data: locationIds.map((locationId) => ({
          userId: id,
          locationId,
        })),
      });
    }

    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,
        action: ACTIONS.UPDATE_USER,

        description: `${performedBy.fullName} updated locations for ${user.fullName}.`,

        entityType: 'User',
        entityId: user.id,
        entityCode: user.email,

        performedByName: performedBy.fullName,
        performedByUserId: performedBy.id,
      },
      tx
    );

    return getUserLocations(id);
  });
}

async function getUserPermissions(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      permissions: true,
    },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  // Start with role defaults
  const permissionSet = new Set(ROLE_PERMISSIONS[user.role] || []);

  // Apply user overrides
  user.permissions.forEach((permission) => {
    if (permission.allowed) {
      permissionSet.add(permission.permission);
    } else {
      permissionSet.delete(permission.permission);
    }
  });

  return [...permissionSet];
}

async function updateUserPermissions(id, permissions, performedBy) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const rolePermissions = ROLE_PERMISSIONS[user.role] || [];

    await tx.userPermission.deleteMany({
      where: {
        userId: id,
      },
    });

    const overrides = [];

    // User granted permissions not in role
    permissions.forEach((permission) => {
      if (!rolePermissions.includes(permission)) {
        overrides.push({
          userId: id,
          permission,
          allowed: true,
        });
      }
    });

    // User removed permissions from role
    rolePermissions.forEach((permission) => {
      if (!permissions.includes(permission)) {
        overrides.push({
          userId: id,
          permission,
          allowed: false,
        });
      }
    });

    if (overrides.length) {
      await tx.userPermission.createMany({
        data: overrides,
      });
    }

    await activityService.logActivity(
      {
        module: MODULES.ADMINISTRATION,
        action: ACTIONS.UPDATE_USER,
        description: `${performedBy.fullName} updated permissions for ${user.fullName}.`,
        entityType: 'User',
        entityId: user.id,
        entityCode: user.email,
        performedByName: performedBy.fullName,
        performedByUserId: performedBy.id,
      },
      tx
    );

    return getUserPermissions(id);
  });
}

async function getUserActivity(id) {
  return prisma.activity.findMany({
    where: {
      OR: [
        {
          performedByUserId: id,
        },
        {
          entityType: 'User',
          entityId: id,
        },
      ],
    },

    orderBy: {
      timestamp: 'desc',
    },

    take: 50,
  });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  resetPassword,
  setUserStatus,
  unlockUser,
  deleteUser,
  getUserLocations,
  updateUserLocations,
  getUserPermissions,
  updateUserPermissions,
  getUserActivity,
};
