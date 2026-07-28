const API_URL = 'http://localhost:3000';

/**
 * Returns JWT token from storage
 */
function getToken() {
  return localStorage.getItem('jw_token') || sessionStorage.getItem('jw_token');
}

/**
 * Default headers for all API requests
 */
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * GET
 */
async function apiGet(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

/**
 * POST
 */
async function apiPost(endpoint, data = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

/**
 * PUT
 */
async function apiPut(endpoint, data = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

/**
 * DELETE
 */
async function apiDelete(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

/**
 * PATCH
 */
async function apiPatch(endpoint, data = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || 'API Error');
  }

  return result;
}

/**
 * Convenience wrappers
 */
async function apiEnable(endpoint) {
  return apiPost(endpoint);
}

async function apiDisable(endpoint) {
  return apiPost(endpoint);
}

async function apiUnlock(endpoint) {
  return apiPost(endpoint);
}

async function apiResetPassword(endpoint) {
  return apiPost(endpoint);
}
