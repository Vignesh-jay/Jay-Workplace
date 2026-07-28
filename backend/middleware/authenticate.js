const prisma = require('../db');

const { verifyToken } = require('../utils/jwt');

const ROLE_PERMISSIONS = require('../constants/rolePermissions');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization header.',
      });
    }

    const token = authHeader.substring(7);

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        permissions: true,
        locations: {
          include: {
            location: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled.',
      });
    }

    // Build permission set
    const permissionSet = new Set(ROLE_PERMISSIONS[user.role] ?? []);

    user.permissions.forEach((permission) => {
      if (permission.allowed) {
        permissionSet.add(permission.permission);
      } else {
        permissionSet.delete(permission.permission);
      }
    });

    // Build session object
    req.user = {
      id: user.id,
      employeeId: user.employeeId,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      permissions: [...permissionSet],
      locations: user.locations.map((item) => item.location.name),
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
}

module.exports = authenticate;
