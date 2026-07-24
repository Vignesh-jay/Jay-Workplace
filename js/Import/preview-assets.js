function renderAssetPreview(session) {
  const container = document.getElementById('assetImportPreview');

  if (!container) return;

  const rows = session.rows;

  if (!rows.length) {
    container.innerHTML = `
            <div class="text-center text-muted py-5">
                No records found.
            </div>
        `;

    return;
  }

  let html = `
    <div class="mb-3">

        <span class="badge bg-primary">
            Total ${session.summary.total}
        </span>

        <span class="badge bg-success">
            Valid ${session.summary.valid}
        </span>

        <span class="badge bg-danger">
            Invalid ${session.summary.invalid}
        </span>

    </div>

    <div class="table-responsive">

    <table class="table table-bordered">

    <thead>

    <tr>

        <th>#</th>
        <th>Asset ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Location</th>
        <th>Status</th>

    </tr>

    </thead>

    <tbody>
`;

  rows.forEach((asset, index) => {
    html += `

<tr>

<td>${index + 1}</td>

<td>${asset.assetId}</td>

<td>${asset.name}</td>

<td>${asset.category}</td>

<td>${asset.location}</td>

<td>

${
  asset.valid
    ? `<span class="badge bg-success">Ready</span>`
    : `<span class="badge bg-danger">Invalid</span>`
}

</td>

</tr>

`;

    if (asset.errors.length) {
      html += `

<tr class="table-danger">

<td></td>

<td colspan="5">

<ul class="mb-0">

${asset.errors.map((e) => `<li>${e}</li>`).join('')}

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
