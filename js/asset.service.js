/* ==========================================================
   Local Asset Helpers
========================================================== */

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

/* ==========================================================
   Activities
========================================================== */

async function addActivity(message) {
  await apiPost('/activities', {
    message,
  });
}

async function getActivitiesApi() {
  const response = await apiGet('/activities');

  return response.data;
}

/* ==========================================================
   Assets
========================================================== */

async function getAssetsApi(status = '') {
  const endpoint = status ? `/assets?status=${encodeURIComponent(status)}` : '/assets';

  const response = await apiGet(endpoint);

  return response.data;
}

async function getAssetApi(id) {
  const response = await apiGet(`/assets/${id}`);

  return response.data;
}

async function createAssetApi(asset) {
  const response = await apiPost('/assets', asset);

  return response.data;
}

async function updateAssetApi(id, asset) {
  const response = await apiPut(`/assets/${id}`, asset);

  return response.data;
}

async function deleteAssetApi(id) {
  return apiDelete(`/assets/${id}`);
}

/* ==========================================================
   Asset History
========================================================== */

async function getAssetHistoryApi(assetId) {
  const response = await apiGet(`/assets/${assetId}/history`);

  return response.data;
}

async function addAssetHistoryApi(assetId, action, details) {
  const response = await apiPost(`/assets/${assetId}/history`, {
    action,
    details,
  });

  return response.data;
}

/* ==========================================================
   Asset Transfers
========================================================== */

async function getAssetTransfersApi() {
  const response = await apiGet('/asset-transfers');

  return response.data || [];
}

async function createAssetTransferApi(data) {
  const response = await apiPost('/asset-transfers', data);

  return response.data;
}

/* ==========================================================
   Warranty
========================================================== */

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
