function resetAssetImport() {
  importSession.file = null;
  importSession.rows = [];
  importSession.errors = [];
  importSession.warnings = [];
  importSession.summary = null;

  const file = document.getElementById('assetImportFile');

  if (file) file.value = '';

  const preview = document.getElementById('assetImportPreview');

  if (preview) preview.innerHTML = '';
}
