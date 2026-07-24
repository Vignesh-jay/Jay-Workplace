function initializeAssetImport() {
  const input = document.getElementById('assetImportFile');

  input.onchange = async function () {
    if (!this.files.length) {
      return;
    }

    try {
      // -----------------------------
      // Reset Session
      // -----------------------------

      importSession.type = 'asset';
      importSession.file = this.files[0];
      importSession.rows = [];
      importSession.errors = [];
      importSession.warnings = [];

      // -----------------------------
      // Parse Excel
      // -----------------------------

      const parsed = await parseFile(importSession.file, 'asset');

      importSession.rows = parsed.rows;

      // -----------------------------
      // Frontend Validation
      // -----------------------------

      validateAssets(importSession);

      // -----------------------------
      // Backend Validation
      // -----------------------------

      const validation = await validateAssetsImport(importSession.rows);

      if (!validation.success) {
        throw new Error(validation.message || 'Validation failed.');
      }

      importSession.rows = validation.rows;
      importSession.summary = validation.summary;

      renderAssetPreview(importSession);

      document.getElementById('btnAssetImport').disabled = importSession.summary.invalid > 0;

      console.table(importSession.rows);
      console.log(importSession.summary);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
}
