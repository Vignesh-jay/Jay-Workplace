async function logActivity({
  module,

  action,

  description,

  entityType = null,

  entityId = null,

  entityCode = null,

  performedBy = 'System',
}) {
  try {
    await addActivityApi({
      module,

      action,

      description,

      entityType,

      entityId,

      entityCode,

      performedBy,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
