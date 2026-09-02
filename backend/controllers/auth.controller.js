const authService = require('../services/auth.service');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const result = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    await authService.changePassword(req.user.id, currentPassword, newPassword);

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function testPermission(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Permission check passed.',
  });
}

async function logout(req, res, next) {
  try {
    await authService.logout(req.user.id);

    return res.status(200).json({
      success: true,
      message: 'Logout successful.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  changePassword,
  logout,
  me,
  testPermission,
};
