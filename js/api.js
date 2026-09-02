const API_URL = 'http://localhost:3000';

/**
 * Returns JWT Token
 */
function getToken() {
  return localStorage.getItem('jw_token') || sessionStorage.getItem('jw_token');
}

/**
 * Default Request Headers
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
 * Common Response Handler
 */
async function handleResponse(response) {
  let result = {};

  try {
    result = await response.json();
  } catch {
    result = {};
  }

  // Session expired / Invalid token
  if (response.status === 401) {
    if (typeof clearSession === 'function') {
      clearSession();
    }

    if (!window.location.pathname.endsWith('login.html')) {
      window.location.replace('login.html');
    }

    throw new Error('Your session has expired.');
  }

  // Forbidden
  if (response.status === 403) {
    throw new Error(result.message || 'You do not have permission to perform this action.');
  }

  // Other API Errors
  if (!response.ok) {
    throw new Error(result.message || result.error || 'Unexpected server error.');
  }

  return result;
}

/**
 * GET
 */
async function apiGet(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return handleResponse(response);
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

  return handleResponse(response);
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

  return handleResponse(response);
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

  return handleResponse(response);
}

/**
 * DELETE
 */
async function apiDelete(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  return handleResponse(response);
}

/**
 * Convenience Helpers
 */
function apiEnable(endpoint) {
  return apiPost(endpoint);
}

function apiDisable(endpoint) {
  return apiPost(endpoint);
}

function apiUnlock(endpoint) {
  return apiPost(endpoint);
}

function apiResetPassword(endpoint) {
  return apiPost(endpoint);
}
