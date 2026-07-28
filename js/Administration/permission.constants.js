const PERMISSION_GROUPS = [
  {
    title: 'Dashboard',
    permissions: [{ key: 'dashboard.view', label: 'View Dashboard' }],
  },

  {
    title: 'Employees',
    permissions: [
      { key: 'employee.view', label: 'View Employees' },
      { key: 'employee.create', label: 'Create Employees' },
      { key: 'employee.edit', label: 'Edit Employees' },
      { key: 'employee.delete', label: 'Delete Employees' },
      { key: 'employee.import', label: 'Import Employees' },
      { key: 'employee.export', label: 'Export Employees' },
    ],
  },

  {
    title: 'Assets',
    permissions: [
      { key: 'asset.view', label: 'View Assets' },
      { key: 'asset.create', label: 'Create Assets' },
      { key: 'asset.edit', label: 'Edit Assets' },
      { key: 'asset.delete', label: 'Delete Assets' },
      { key: 'asset.import', label: 'Import Assets' },
      { key: 'asset.export', label: 'Export Assets' },
    ],
  },

  {
    title: 'Assignments',
    permissions: [
      { key: 'assignment.view', label: 'View Assignments' },
      { key: 'assignment.create', label: 'Assign Assets' },
      { key: 'assignment.return', label: 'Return Assets' },
    ],
  },

  {
    title: 'Reports',
    permissions: [
      { key: 'report.view', label: 'View Reports' },
      { key: 'report.export', label: 'Export Reports' },
    ],
  },

  {
    title: 'Administration',
    permissions: [
      { key: 'administration.view', label: 'Open Administration' },

      { key: 'department.view', label: 'View Departments' },
      { key: 'department.create', label: 'Create Departments' },
      { key: 'department.edit', label: 'Edit Departments' },
      { key: 'department.delete', label: 'Delete Departments' },

      { key: 'location.view', label: 'View Locations' },
      { key: 'location.create', label: 'Create Locations' },
      { key: 'location.edit', label: 'Edit Locations' },
      { key: 'location.delete', label: 'Delete Locations' },

      { key: 'user.view', label: 'View Users' },
      { key: 'user.create', label: 'Create Users' },
      { key: 'user.edit', label: 'Edit Users' },
      { key: 'user.delete', label: 'Delete Users' },

      { key: 'activity.view', label: 'View Activity Logs' },

      { key: 'user:enable', label: 'Enable Users' },
      { key: 'user:disable', label: 'Disable Users' },
      { key: 'user:unlock', label: 'Unlock Users' },
    ],
  },
];
