async function getActivitiesApi() {
  const response = await apiGet('/activities');

  return response.data;
}

async function addActivityApi(message) {
  return await apiPost('/activities', {
    message,
  });
}
