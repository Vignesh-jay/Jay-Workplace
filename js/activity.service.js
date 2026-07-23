async function getActivitiesApi() {
  const response = await apiGet('/activities');

  return response.data;
}

async function addActivityApi({
  module,

  action,

  description,

  entityType = null,

  entityId = null,

  entityCode = null,

  performedBy = 'System',
}) {
  return await apiPost('/activities', {
    module,

    action,

    description,

    entityType,

    entityId,

    entityCode,

    performedBy,
  });
}
