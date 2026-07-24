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

async function validateAssetsImport(rows) {
  return await apiPost('/api/import/assets/validate', {
    rows,
  });
}

async function importAssets(rows) {
  return await apiPost('/api/import/assets', {
    rows,
  });
}
