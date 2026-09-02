const ROLE_PERMISSIONS = require('../constants/rolePermissions');

function buildPermissionSet(user) {
  const permissionSet = new Set(ROLE_PERMISSIONS[user.role] ?? []);

  if (user.permissions?.length) {
    user.permissions.forEach((permission) => {
      if (permission.allowed) {
        permissionSet.add(permission.permission);
      } else {
        permissionSet.delete(permission.permission);
      }
    });
  }

  return [...permissionSet];
}

function hasPermission(user, permission) {
  const permissions = buildPermissionSet(user);

  return permissions.includes(permission);
}

module.exports = {
  buildPermissionSet,
  hasPermission,
};
