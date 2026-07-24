/**
 * Parse Excel/CSV file.
 * (Implementation in next sprint)
 */

/**
 * Parse Employee Excel File
 */
async function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const workbook = XLSX.read(event.target.result, {
          type: 'array',
        });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(worksheet, {
          defval: '',
        });

        const mappedRows = mapEmployeeRows(rows);

        resolve({
          rows: mappedRows,
          errors: [],
          warnings: [],
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Convert Excel Columns to Application Model
 */
function mapEmployeeRows(rows) {
  return rows.map((row) => ({
    employeeId: row['Employee ID']?.toString().trim(),

    firstName: row['First Name']?.toString().trim(),

    lastName: row['Last Name']?.toString().trim(),

    email: row['Email']?.toString().trim(),

    department: row['Department']?.toString().trim(),

    designation: row['Designation']?.toString().trim(),

    manager: row['Manager']?.toString().trim(),

    location: row['Location']?.toString().trim(),

    employmentType: row['Employment Type']?.toString().trim(),

    dateOfJoining: row['Date of Joining'],
  }));
}
