const prisma = require('../db');

const { verifyToken } = require('../utils/jwt');
const { buildUserSession } = require('../utils/session');
const ApiError = require('../utils/apiError');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw ApiError.unauthorized('Authentication required.');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Invalid authorization header.');
    }

    const token = authHeader.substring(7);

    let payload;

    try {
      payload = verifyToken(token);
    } catch {
      throw ApiError.unauthorized('Invalid or expired token.');
    }

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
      throw ApiError.unauthorized('User not found.');
    }

    if (user.status !== 'ACTIVE') {
      throw ApiError.forbidden('Account is disabled.');
    }

    req.user = buildUserSession(user);

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;
