const prisma = require('../db');

const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { buildPermissionSet } = require('../utils/permission');

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
    throw new Error('Invalid email or password.');
  }

  if (user.status !== 'ACTIVE') {
    throw new Error('Your account is disabled.');
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new Error('Your account is temporarily locked.');
  }

  const validPassword = await comparePassword(password, user.passwordHash);

  if (!validPassword) {
    const failedAttempts = user.failedLoginAttempts + 1;

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        failedLoginAttempts: failedAttempts,

        lockedUntil: failedAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
      },
    });

    throw new Error('Invalid email or password.');
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

  const token = generateToken(user);

  return {
    token,

    user: {
      id: user.id,

      fullName: user.fullName,

      email: user.email,

      role: user.role,

      permissions: buildPermissionSet(user),

      locations: user.locations.map((item) => item.location.name),

      mustChangePassword: user.mustChangePassword,
    },
  };
}

module.exports = {
  login,
};
