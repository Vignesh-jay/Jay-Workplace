function addAsset(asset) {

    const assets = getAssets();

    assets.push(asset);

    saveAssets(assets);

    return asset;
}