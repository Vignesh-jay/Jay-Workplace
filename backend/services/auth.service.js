const prisma = require('../db');

const ApiError = require('../utils/apiError');

const { comparePassword, hashPassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const activityService = require('./activity.service');

const MODULES = require('../constants/activityModules');
const ACTIONS = require('../constants/activityActions');

const { buildUserSession } = require('../utils/session');

const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const ACCOUNT_LOCK_MINUTES = 15;

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      permissions: true,
      locations: {
        include: {
          location: true,
        },
      },
    },
  });

  if (!user) {
    throw ApiError.unauthorized('Invalid email or password.');
  }

  if (user.status !== 'ACTIVE') {
    throw ApiError.forbidden('Your account is disabled.');
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw ApiError.forbidden('Your account is temporarily locked.');
  }

  const passwordValid = await comparePassword(password, user.passwordHash);

  if (!passwordValid) {
    await handleFailedLogin(user);

    throw ApiError.unauthorized('Invalid email or password.');
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLogin: new Date(),
    },
  });

  await logAuthenticationActivity(ACTIONS.LOGIN, `${user.fullName} logged in.`, user);

  return createLoginResponse(user);
}

async function changePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found.');
  }

  const passwordValid = await comparePassword(currentPassword, user.passwordHash);

  if (!passwordValid) {
    throw ApiError.badRequest('Current password is incorrect.');
  }

  if (currentPassword === newPassword) {
    throw ApiError.badRequest('New password cannot be the same as the current password.');
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  await logAuthenticationActivity(
    ACTIONS.CHANGE_PASSWORD,
    `${user.fullName} changed their password.`,
    user
  );

  return true;
}

async function handleFailedLogin(user) {
  const failedAttempts = user.failedLoginAttempts + 1;

  const accountLocked = failedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      failedLoginAttempts: failedAttempts,
      lockedUntil: accountLocked ? new Date(Date.now() + ACCOUNT_LOCK_MINUTES * 60 * 1000) : null,
    },
  });

  await logAuthenticationActivity(
    ACTIONS.FAILED_LOGIN,
    `Failed login attempt for ${user.email}.`,
    user
  );
}

async function logAuthenticationActivity(action, description, user) {
  await activityService.logActivity({
    module: MODULES.AUTHENTICATION,
    action,
    description,

    entityType: 'User',
    entityId: user.id,
    entityCode: user.email,

    performedByName: user.fullName,
    performedByUserId: user.id,
  });
}

function createLoginResponse(user) {
  return {
    token: generateToken(user),
    user: buildUserSession(user),
  };
}

async function logout(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found.');
  }

  await logAuthenticationActivity(ACTIONS.LOGOUT, `${user.fullName} logged out.`, user);

  return true;
}

async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      permissions: true,
      locations: {
        include: {
          location: true,
        },
      },
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found.');
  }

  return buildUserSession(user);
}

module.exports = {
  login,
  changePassword,
  logout,
  getCurrentUser,
};
