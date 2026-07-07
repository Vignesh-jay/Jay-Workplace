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

function addActivity(message) {
  const activities = getActivities();

  activities.unshift({
    message: message,

    timestamp: formatDateTime(),
  });

  saveActivities(activities);
}

function getExpiringAssets(days = 90) {
  const assets = getAssets();

  const today = new Date();

  return assets.filter((asset) => {
    if (!asset.purchase?.warrantyExpiry) {
      return false;
    }

    const expiryDate = new Date(asset.purchase?.warrantyExpiry);

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
