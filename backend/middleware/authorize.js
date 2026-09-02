const ApiError = require('../utils/apiError');
const USER_ROLES = require('../constants/userRoles');

function authorize(requiredPermission) {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required.'));
    }

    if (req.user.role === USER_ROLES.ADMINISTRATOR) {
      return next();
    }

    if (!req.user.permissions.includes(requiredPermission)) {
      return next(ApiError.forbidden("You don't have permission to perform this action."));
    }

    next();
  };
}

module.exports = authorize;
