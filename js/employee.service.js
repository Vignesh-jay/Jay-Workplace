async function getEmployeesApi(status = '') {
  const url = status ? `/employees?status=${encodeURIComponent(status)}` : '/employees';

  const response = await apiGet(url);

  return response.data;
}

async function createEmployeeApi(employee) {
  const response = await apiPost('/employees', employee);

  return response.data;
}

async function updateEmployeeApi(id, employee) {
  return await apiPut(`/employees/${id}`, employee);
}

async function deleteEmployeeApi(id) {
  return await apiDelete(`/employees/${id}`);
}

async function getEmployeeApi(id) {
  const response = await apiGet(`/employees/${id}`);
  return response.data;
}
