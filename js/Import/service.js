/**
 * Import API Service
 */

async function validateEmployeesImport(rows) {
  return await apiPost('/api/import/employees/validate', {
    rows,
  });
}

async function importEmployees(rows) {
  return await apiPost('/api/import/employees', {
    rows,
  });
}

async function importAssets(rows) {
  return await apiPost('/api/import/assets', {
    rows,
  });
}
