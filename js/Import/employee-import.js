function initializeEmployeeImport() {
  const input = document.getElementById('employeeImportFile');

  input.onchange = async function () {
    if (!this.files.length) {
      return;
    }

    try {
      // -----------------------------
      // Reset Session
      // -----------------------------

      importSession.file = this.files[0];
      importSession.rows = [];
      importSession.errors = [];
      importSession.warnings = [];

      // -----------------------------
      // Parse Excel
      // -----------------------------

      const parsed = await parseFile(importSession.file, 'employee');

      importSession.rows = parsed.rows;

      // -----------------------------
      // Frontend Validation
      // -----------------------------

      validateEmployees(importSession);

      // -----------------------------
      // Backend Validation
      // -----------------------------

      const validation = await validateEmployeesImport(importSession.rows);

      if (!validation.success) {
        throw new Error(validation.message || 'Validation failed.');
      }

      // -----------------------------
      // Update Session
      // -----------------------------

      importSession.rows = validation.rows;
      importSession.summary = validation.summary;

      // -----------------------------
      // Refresh Preview
      // -----------------------------

      renderPreview(importSession);

      // -----------------------------
      // Enable / Disable Import Button
      // -----------------------------

      document.getElementById('btnEmployeeImport').disabled = importSession.summary.invalid > 0;
    } catch (error) {
      alert(error.message);
    }
  };
}
