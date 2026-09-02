const userService = require('../services/user.service');

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUser(Number(req.params.id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createUser(req, res) {
  try {
    const result = await userService.createUser({
      ...req.body,

      createdByUserId: req.user.id,

      createdByName: req.user.fullName,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(Number(req.params.id), {
      ...req.body,

      performedBy: {
        id: req.user.id,
        fullName: req.user.fullName,
      },
    });

    res.json({
      success: true,
      message: 'User updated successfully.',
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function resetPassword(req, res) {
  try {
    const result = await userService.resetPassword(Number(req.params.id), {
      id: req.user.id,
      fullName: req.user.fullName,
    });

    res.json({
      success: true,
      message: 'Password reset successfully.',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function enableUser(req, res) {
  try {
    const user = await userService.setUserStatus(Number(req.params.id), 'ACTIVE', {
      id: req.user.id,
      fullName: req.user.fullName,
    });

    res.json({
      success: true,
      message: 'User enabled successfully.',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function disableUser(req, res) {
  try {
    const user = await userService.setUserStatus(Number(req.params.id), 'DISABLED', {
      id: req.user.id,
      fullName: req.user.fullName,
    });

    res.json({
      success: true,
      message: 'User disabled successfully.',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function unlockUser(req, res) {
  try {
    const user = await userService.unlockUser(Number(req.params.id), {
      id: req.user.id,
      fullName: req.user.fullName,
    });

    res.json({
      success: true,
      message: 'User unlocked successfully.',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getUserLocations(req, res) {
  try {
    const locations = await userService.getUserLocations(Number(req.params.id));

    res.json({
      success: true,
      data: locations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateUserLocations(req, res) {
  try {
    const locations = await userService.updateUserLocations(
      Number(req.params.id),
      req.body.locationIds || [],
      {
        id: req.user.id,
        fullName: req.user.fullName,
      }
    );

    res.json({
      success: true,
      message: 'Locations updated successfully.',
      data: locations,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getPermissions(req, res) {
  try {
    const permissions = await userService.getUserPermissions(Number(req.params.id));

    res.json({
      success: true,
      data: permissions,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function updatePermissions(req, res) {
  try {
    const permissions = await userService.updateUserPermissions(
      Number(req.params.id),
      req.body.permissions || [],
      {
        id: req.user.id,
        fullName: req.user.fullName,
      }
    );

    res.json({
      success: true,
      message: 'Permissions updated successfully.',
      data: permissions,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getUserActivity(req, res) {
  try {
    const activity = await userService.getUserActivity(Number(req.params.id));

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    await userService.deleteUser(Number(req.params.id), {
      id: req.user.id,
      fullName: req.user.fullName,
    });

    res.json({
      success: true,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  resetPassword,
  enableUser,
  disableUser,
  unlockUser,
  deleteUser,
  getUserLocations,
  updateUserLocations,
  getPermissions,
  updatePermissions,
  getUserActivity,
};
