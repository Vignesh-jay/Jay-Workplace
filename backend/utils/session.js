const { buildPermissionSet } = require('./permission');

function buildUserSession(user) {
  return {
    id: user.id,
    employeeId: user.employeeId,
    email: user.email,
    fullName: user.fullName,
    role: user.role,

    permissions: buildPermissionSet(user),

    locations: user.locations.map(({ location }) => location.name),

    mustChangePassword: user.mustChangePassword,
  };
}

module.exports = {
  buildUserSession,
};
