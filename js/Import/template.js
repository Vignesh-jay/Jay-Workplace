/**
 * Download Excel Templates
 */

function downloadEmployeeTemplate() {
  const worksheet = XLSX.utils.aoa_to_sheet([EMPLOYEE_COLUMNS.map((col) => col.title)]);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

  XLSX.writeFile(workbook, 'JAY_Workplace_Employee_Template.xlsx');
}

function downloadAssetTemplate() {
  const worksheet = XLSX.utils.aoa_to_sheet([ASSET_COLUMNS.map((col) => col.title)]);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');

  XLSX.writeFile(workbook, 'JAY_Workplace_Asset_Template.xlsx');
}
