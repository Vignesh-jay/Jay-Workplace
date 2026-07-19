async function getEmployeeHistoryApi(employeeId) {
  const response = await apiGet(`/employees/${employeeId}/history`);

  return response.data;
}

async function addEmployeeHistoryApi(employeeId, action, details) {
  return await apiPost(`/employees/${employeeId}/history`, {
    action,
    details,
  });
}
