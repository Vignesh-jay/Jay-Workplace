async function loadAssetStatuses() {
  setActiveMenu('nav-administration');

  const statuses = await getAssetStatuses();

  document.getElementById('content').innerHTML = `

<div class="page-header">

    <div>

        <h2 class="fw-bold mb-1">
            Asset Statuses
        </h2>

        <p class="text-muted">
            Manage available asset statuses.
        </p>

    </div>

    <button
        class="btn btn-primary"
        onclick="showAddAssetStatusModal()">

        <i class="fas fa-plus me-2"></i>

        Add Status

    </button>

</div>

<div class="card-custom">

    <table class="table align-middle">

        <thead>

            <tr>

                <th>Name</th>

                <th width="180">
                    Actions
                </th>

            </tr>

        </thead>

        <tbody>

            ${statuses
              .map(
                (status) => `
<tr>

    <td>

        ${status.name}

    </td>

    <td>

    <button
        class="btn btn-sm btn-warning me-1"
        onclick="showEditAssetStatusModal(${status.id})"
        title="Edit">

        <i class="fas fa-pen"></i>

    </button>

    <button
        class="btn btn-sm btn-danger"
        onclick="deleteAssetStatusRecord(${status.id})"
        title="Delete">

        <i class="fas fa-trash"></i>

    </button>

</td>

</tr>
`
              )
              .join('')}

        </tbody>

    </table>

</div>

`;
}

async function showAddAssetStatusModal() {
  const name = prompt('Enter Asset Status');

  if (!name) return;

  await createAssetStatus({
    name: name.trim(),
  });

  loadAssetStatuses();
}

async function showEditAssetStatusModal(id) {
  const statuses = await getAssetStatuses();

  const status = statuses.find((s) => s.id === id);

  if (!status) return;

  const name = prompt('Edit Asset Status', status.name);

  if (!name) return;

  await updateAssetStatus(id, {
    name: name.trim(),
  });

  loadAssetStatuses();
}

async function deleteAssetStatusRecord(id) {
  if (!confirm('Delete this Asset Status?')) {
    return;
  }

  try {
    await deleteAssetStatus(id);

    loadAssetStatuses();
  } catch (error) {
    alert(error.message);
  }
}
