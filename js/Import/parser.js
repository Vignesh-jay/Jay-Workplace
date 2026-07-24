/**
 * Parse Excel/CSV file.
 * (Implementation in next sprint)
 */

async function parseFile(file, type = 'employee') {
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

        const mappedRows = type === 'employee' ? mapEmployeeRows(rows) : mapAssetRows(rows);

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

function mapAssetRows(rows) {
  return rows.map((row) => ({
    assetId: row['Asset ID']?.toString().trim(),

    name: row['Asset Name']?.toString().trim(),

    category: row['Category']?.toString().trim(),

    manufacturer: row['Brand']?.toString().trim(),

    model: row['Model']?.toString().trim(),

    serialNumber: row['Serial Number']?.toString().trim(),

    purchaseDate: row['Purchase Date'],

    warrantyExpiry: row['Warranty Expiry'],

    location: row['Location']?.toString().trim(),
  }));
}
