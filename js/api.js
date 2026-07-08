const API_URL = 'http://localhost:3000';

async function apiGet(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

async function apiPost(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

async function apiPut(endpoint, data = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

async function apiDelete(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
  });

  return await response.json();
}

async function apiDisable(endpoint) {
  return await apiPut(endpoint, {});
}

async function apiEnable(endpoint) {
  return await apiPut(endpoint, {});
}
