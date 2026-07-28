const ADMIN_API = '/users';

async function getUsersApi() {
  return apiGet(ADMIN_API);
}

async function getUserApi(id) {
  return apiGet(`${ADMIN_API}/${id}`);
}

async function createUserApi(data) {
  return apiPost(ADMIN_API, data);
}

async function updateUserApi(id, data) {
  return apiPut(`${ADMIN_API}/${id}`, data);
}

async function resetPasswordApi(id) {
  return apiPost(`${ADMIN_API}/${id}/reset-password`);
}

async function enableUserApi(id) {
  return apiPost(`${ADMIN_API}/${id}/enable`);
}

async function disableUserApi(id) {
  return apiPost(`${ADMIN_API}/${id}/disable`);
}

async function unlockUserApi(id) {
  return apiPost(`${ADMIN_API}/${id}/unlock`);
}

async function deleteUserApi(id) {
  return apiDelete(`${ADMIN_API}/${id}`);
}

async function getUserLocationsApi(id) {
  return apiGet(`${ADMIN_API}/${id}/locations`);
}

async function updateUserLocationsApi(id, locationIds) {
  return apiPut(`${ADMIN_API}/${id}/locations`, {
    locationIds,
  });
}

async function getUserPermissionsApi(id) {
  return apiGet(`${ADMIN_API}/${id}/permissions`);
}

async function updateUserPermissionsApi(id, permissions) {
  return apiPut(`${ADMIN_API}/${id}/permissions`, {
    permissions,
  });
}

async function getUserActivityApi(id) {
  return apiGet(`/users/${id}/activity`);
}
