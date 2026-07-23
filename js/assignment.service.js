async function getAssignmentsApi() {
  const response = await apiGet('/assignments');

  return response.data;
}

async function getAssignmentApi(id) {
  const response = await apiGet(`/assignments/${id}`);

  return response.data;
}

async function createAssignmentApi(assignment) {
  const response = await apiPost('/assignments', assignment);

  return response.data;
}

async function updateAssignmentApi(id, assignment) {
  const response = await apiPut(`/assignments/${id}`, assignment);

  return response.data;
}
