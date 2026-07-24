function loadAssetImport(file) {
  parseFile(file).then((rows) => {
    renderPreview(rows);
  });
}
