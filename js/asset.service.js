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

    const activities =
        getActivities();

    activities.unshift({

        message: message,

        timestamp:
            new Date().toLocaleString(
                'en-IN',
                {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }
            )

    });

    saveActivities(
        activities
    );

}

function getExpiringAssets(days = 90) {

    const assets = getAssets();

    const today = new Date();

    return assets.filter(asset => {

        if (!asset.warrantyExpiry) {
            return false;
        }

        const expiryDate =
            new Date(asset.warrantyExpiry);

        const diffDays =
            Math.ceil(
                (expiryDate - today) /
                (1000 * 60 * 60 * 24)
            );

        return diffDays >= 0 &&
               diffDays <= days;

    });

}