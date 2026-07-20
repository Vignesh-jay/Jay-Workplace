const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const statuses = ['Available', 'Assigned', 'Repair', 'Retired', 'Transferred'];

  for (const name of statuses) {
    await prisma.assetStatus.upsert({
      where: { name },

      update: {},

      create: { name },
    });
  }

  console.log('Asset Statuses Seeded');
}

main().finally(() => prisma.$disconnect());
