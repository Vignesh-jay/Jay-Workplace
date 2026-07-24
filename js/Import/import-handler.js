/**
 * Execute Employee Import
 */
async function executeEmployeeImport() {
  try {
    if (importSession.summary.invalid > 0) {
      alert('Please fix validation errors before importing.');

      return;
    }

    const button = document.getElementById('btnEmployeeImport');

    button.disabled = true;

    button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Importing...
        `;

    const result = await importEmployees(importSession.rows);

    if (!result.success) {
      throw new Error(result.message || 'Import failed.');
    }

    showImportResult(result.summary);

    hideEmployeeImportModal();

    // Refresh Workforce
    if (typeof loadWorkforce === 'function') {
      loadWorkforce();
    }
  } catch (error) {
    console.error(error);

    alert(error.message);
  } finally {
    const button = document.getElementById('btnEmployeeImport');

    button.disabled = false;

    button.innerHTML = 'Import Employees';
  }
}

async function executeAssetImport() {
  const button = document.getElementById('btnAssetImport');

  button.disabled = true;

  button.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Importing...
    `;

  try {
    const result = await importAssets(importSession.rows);

    if (!result.success) {
      throw new Error(result.message || 'Import failed.');
    }

    showImportResult(result.summary);

    bootstrap.Modal.getInstance(document.getElementById('assetImportModal'))?.hide();

    resetAssetImport();

    if (typeof loadAssets === 'function') {
      await loadAssets();
    }
  } catch (error) {
    console.error(error);

    alert(error.message);
  } finally {
    button.disabled = false;

    button.innerHTML = `
            <i class="fas fa-upload"></i>
            Import
        `;
  }
}
