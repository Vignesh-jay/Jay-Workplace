function addAsset(asset) {

    const assets = getAssets();

    assets.push(asset);

    saveAssets(assets);

    addActivity(
        `${asset.name} added to inventory`
    );

    return asset;
}

function deleteAssetById(assetId) {

    const assets = getAssets();

    const updatedAssets = assets.filter(
        asset => asset.id !== assetId
    );

    saveAssets(updatedAssets);
}

function addActivity(message) {

    const activities = getActivities();

    activities.unshift(message);

    saveActivities(activities);
}