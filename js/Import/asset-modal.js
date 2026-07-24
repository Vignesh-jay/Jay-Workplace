let assetImportModal = null;

function initAssetImportModal() {
  if (assetImportModal) return;

  const modal = document.getElementById('assetImportModal');

  if (!modal) {
    console.error('Asset Import Modal not found.');

    return;
  }

  assetImportModal = new bootstrap.Modal(modal);
}

function resetAssetImportModal() {
  importSession.type = 'asset';

  importSession.file = null;
  importSession.rows = [];
  importSession.errors = [];
  importSession.warnings = [];

  importSession.summary = {
    total: 0,
    valid: 0,
    invalid: 0,
  };

  document.getElementById('assetImportFile').value = '';

  document.getElementById('assetImportPreview').innerHTML = `

        <div class="text-center text-muted py-5">

            No file selected.

        </div>

    `;

  document.getElementById('btnAssetImport').disabled = true;
}

function showAssetImportModal() {
  initializeAssetImport();

  initAssetImportModal();

  document.getElementById('btnDownloadAssetTemplate').onclick = downloadAssetTemplate;

  document.getElementById('btnAssetImport').onclick = executeAssetImport;

  resetAssetImportModal();

  assetImportModal.show();
}

function hideAssetImportModal() {
  assetImportModal?.hide();
}

window.showAssetImportModal = showAssetImportModal;
window.hideAssetImportModal = hideAssetImportModal;
