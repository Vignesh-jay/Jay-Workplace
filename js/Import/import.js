let employeeImportModal = null;

function initEmployeeImportModal() {
  if (employeeImportModal) {
    return;
  }

  const modalElement = document.getElementById('employeeImportModal');

  if (!modalElement) {
    console.error('Employee Import Modal not found.');
    return;
  }

  employeeImportModal = new bootstrap.Modal(modalElement);
}

function resetEmployeeImportModal() {
  // ----------------------------
  // Reset Import Session
  // ----------------------------

  importSession.type = 'employee';

  importSession.file = null;

  importSession.rows = [];

  importSession.errors = [];

  importSession.warnings = [];

  importSession.summary = {
    total: 0,

    valid: 0,

    invalid: 0,
  };

  // ----------------------------
  // Reset UI
  // ----------------------------

  const file = document.getElementById('employeeImportFile');

  if (file) {
    file.value = '';
  }

  const preview = document.getElementById('employeeImportPreview');

  if (preview) {
    preview.innerHTML = `
            <div class="text-center text-muted py-5">
                No file selected.
            </div>
        `;
  }

  const btn = document.getElementById('btnEmployeeImport');

  if (btn) {
    btn.disabled = true;
  }
}

function showEmployeeImportModal() {
  initializeEmployeeImport();

  document.getElementById('btnDownloadEmployeeTemplate').onclick = downloadEmployeeTemplate;

  initEmployeeImportModal();

  document.getElementById('btnEmployeeImport').onclick = executeEmployeeImport;

  resetEmployeeImportModal();

  employeeImportModal.show();
}

function hideEmployeeImportModal() {
  if (employeeImportModal) {
    employeeImportModal.hide();
  }
}

// Make available to onclick=""
window.showEmployeeImportModal = showEmployeeImportModal;
window.hideEmployeeImportModal = hideEmployeeImportModal;
