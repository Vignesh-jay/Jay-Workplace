const prisma = require('../db');

async function logActivity(activity, prismaClient = prisma) {
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
  logActivity,
};
