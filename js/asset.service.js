function addAsset(asset) {
  const assets = getAssets();

  assets.push(asset);

  saveAssets(assets);

  addActivity(`${asset.name} added to inventory`);

  return asset;
}

function deleteAssetById(assetId) {
  const assets = getAssets();

  const updatedAssets = assets.filter((asset) => asset.id !== assetId);

  saveAssets(updatedAssets);
}

async function addActivity(message) {
  await apiPost('/activities', {
    message,
  });
}

async function getActivitiesApi() {
  const response = await apiGet('/activities');

  return response.data;
}

async function getExpiringAssets(days = 90) {
  const assets = await getAssetsApi();

  const today = new Date();

  return assets.filter((asset) => {
    if (!asset.warrantyExpiry) {
      return false;
    }

    const expiryDate = new Date(asset.warrantyExpiry);

    const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= days;
  });
}

function getAssetById(assetId) {
  const assets = getAssets();

  return assets.find((asset) => asset.id === assetId);
}

function updateAsset(assetId, updatedAsset) {
  const assets = getAssets();

  const index = assets.findIndex((asset) => asset.id === assetId);

  if (index === -1) {
    return null;
  }

  assets[index] = updatedAsset;

  saveAssets(assets);

  addActivity(`${updatedAsset.name} updated`);

  return updatedAsset;
}

async function apiGet(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error(`GET ${endpoint} failed`);
  }

  return res.json();
}

async function apiPost(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`POST ${endpoint} failed`);
  }

  return res.json();
}

async function apiPut(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`PUT ${endpoint} failed`);
  }

  return res.json();
}

async function apiDelete(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`DELETE ${endpoint} failed`);
  }

  return res.json();
}

/* ===========================
   Assets
=========================== */

async function getAssetsApi(status = '') {
  const endpoint = status ? `/assets?status=${encodeURIComponent(status)}` : '/assets';

  const result = await apiGet(endpoint);

  return result.data;
}

async function getAssetApi(id) {
  const result = await apiGet(`/assets/${id}`);
  return result.data;
}

async function createAssetApi(asset) {
  const result = await apiPost('/assets', asset);
  return result.data;
}

async function updateAssetApi(id, asset) {
  const result = await apiPut(`/assets/${id}`, asset);
  return result.data;
}

async function deleteAssetApi(id) {
  return apiDelete(`/assets/${id}`);
}

/* ===========================
   Asset History
=========================== */

async function getAssetHistoryApi(assetId) {
  const result = await apiGet(`/assets/${assetId}/history`);
  return result.data;
}

async function addAssetHistoryApi(assetId, action, details) {
  const result = await apiPost(`/assets/${assetId}/history`, {
    action,
    details,
  });

  return result.data;
}

async function getAssetTransfersApi() {
  const response = await apiGet('/asset-transfers');

  return response.data || [];
}

async function createAssetTransferApi(data) {
  const response = await apiPost('/asset-transfers', data);

  return response.data;
}
