async function loadUsers() {
  setActiveMenu('nav-administration');

  const users = await getUsersApi();

  document.getElementById('content').innerHTML = `

<div class="page-header d-flex justify-content-between align-items-center">

    <div>

        <h2 class="fw-bold">

            Users

        </h2>

        <p class="text-muted">

            Manage application users.

        </p>

    </div>

    <button
        class="btn btn-primary"
        onclick="openCreateUserModal()">
        <i class="bi bi-person-plus"></i>
        Create User
    </button>

</div>

<div class="card">

<table class="table table-hover align-middle mb-0">

<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th width="120"></th>

</tr>

</thead>

<tbody>

${users.data
  .map(
    (u) => `
<tr>

<td>${u.fullName}</td>

<td>${u.email}</td>

<td>${u.role}</td>

<td>

<span class="badge bg-${u.status === 'ACTIVE' ? 'success' : 'danger'}">

${u.status}

</span>

</td>

<td>

<button
    class="btn btn-primary btn-sm"
    onclick="openUser(${u.id})">

    Open

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
