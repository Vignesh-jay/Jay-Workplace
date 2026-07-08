async function getLocations(status = 'active') {
  const response = await apiGet(`/locations?status=${status}`);

  return response.data;
}

async function createLocation(location) {
  return await apiPost('/locations', location);
}

async function updateLocation(id, location) {
  return await apiPut(`/locations/${id}`, location);
}

async function disableLocation(id) {
  return await apiPut(`/locations/${id}/disable`);
}

async function enableLocation(id) {
  return await apiPut(`/locations/${id}/enable`);
}

async function deleteLocation(id) {
  return await apiDelete(`/locations/${id}`);
}
