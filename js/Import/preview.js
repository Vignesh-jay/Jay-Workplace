/**
 * Render Employee Import Preview
 */
function renderPreview(session) {
  const container = document.getElementById('employeeImportPreview');

  if (!container) return;

  const rows = session.rows || [];

  if (rows.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-5">
        No records found.
      </div>
    `;
    return;
  }

  let html = `
    <div class="mb-3 d-flex gap-3">

      <span class="badge bg-primary">
        Total : ${session.summary.total}
      </span>

      <span class="badge bg-success">
        Valid : ${session.summary.valid}
      </span>

      <span class="badge bg-danger">
        Invalid : ${session.summary.invalid}
      </span>

    </div>

    <div class="table-responsive">

      <table class="table table-bordered table-hover align-middle">

        <thead class="table-light">

          <tr>

            <th style="width:60px;">#</th>

            <th>Employee ID</th>

            <th>Name</th>

            <th>Department</th>

            <th>Location</th>

            <th style="width:120px;">Status</th>

          </tr>

        </thead>

        <tbody>
  `;

  rows.forEach((employee, index) => {
    html += `
      <tr>

        <td>${index + 1}</td>

        <td>${employee.employeeId || ''}</td>

        <td>${employee.firstName || ''} ${employee.lastName || ''}</td>

        <td>${employee.department || ''}</td>

        <td>${employee.location || ''}</td>

        <td>
          ${
            employee.valid
              ? `<span class="badge bg-success">Ready</span>`
              : `<span class="badge bg-danger">Invalid</span>`
          }
        </td>

      </tr>
    `;

    if (employee.errors && employee.errors.length) {
      html += `
        <tr class="table-danger">

          <td></td>

          <td colspan="5">

            <ul class="mb-0">

              ${employee.errors.map((error) => `<li>${error}</li>`).join('')}

            </ul>

          </td>

        </tr>
      `;
    }
  });

  html += `
        </tbody>

      </table>

    </div>
  `;

  container.innerHTML = html;
}
