async function getAssetStatuses(status = '') {
  const endpoint = status ? `/asset-statuses?status=${status}` : '/asset-statuses';

  const response = await apiGet(endpoint);

  return response.data || [];
}

async function createAssetStatus(data) {
  const response = await apiPost('/asset-statuses', data);

  return response.data;
}

async function updateAssetStatus(id, data) {
  const response = await apiPut(`/asset-statuses/${id}`, data);

  return response.data;
}

async function deleteAssetStatus(id) {
  return await apiDelete(`/asset-statuses/${id}`);
}
