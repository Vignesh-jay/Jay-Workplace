async function getDepartments(status = 'active') {
  const response = await apiGet(`/departments?status=${status}`);

  return response.data;
}

async function createDepartment(department) {
  return await apiPost('/departments', department);
}

async function updateDepartment(id, department) {
  return await apiPut(`/departments/${id}`, department);
}

async function disableDepartment(id) {
  return await apiPut(`/departments/${id}/disable`);
}

async function enableDepartment(id) {
  return await apiPut(`/departments/${id}/enable`);
}

async function deleteDepartment(id) {
  return await apiDelete(`/departments/${id}`);
}
