const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { hashPassword } = require('../utils/bcrypt');

async function bootstrapAdministrator() {
  const adminEmail = 'administrator@jayworkplace.local';

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (existingAdmin) {
    console.log('✓ Administrator account already exists.');
    return;
  }

  const passwordHash = await hashPassword('Admin@123');

  await prisma.user.create({
    data: {
      email: adminEmail,

      passwordHash,

      fullName: 'Administrator',

      role: 'ADMINISTRATOR',

      status: 'ACTIVE',
    },
  });

  console.log('✓ Default Administrator account created.');
  console.log('Email    : administrator@jayworkplace.local');
  console.log('Password : Admin@123');
}

module.exports = bootstrapAdministrator;
