const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const PERMISSIONS = require('../constants/permissions');

const userController = require('../controllers/user.controller');

router.get('/', authenticate, authorize(PERMISSIONS.USER_VIEW), userController.getUsers);

router.get('/:id', authenticate, authorize(PERMISSIONS.USER_VIEW), userController.getUser);

router.post('/', authenticate, authorize(PERMISSIONS.USER_CREATE), userController.createUser);

router.put('/:id', authenticate, authorize(PERMISSIONS.USER_EDIT), userController.updateUser);

router.post(
  '/:id/reset-password',
  authenticate,
  authorize(PERMISSIONS.USER_EDIT),
  userController.resetPassword
);

router.post(
  '/:id/enable',
  authenticate,
  authorize(PERMISSIONS.USER_ENABLE),
  userController.enableUser
);

router.post(
  '/:id/disable',
  authenticate,
  authorize(PERMISSIONS.USER_DISABLE),
  userController.disableUser
);

router.post(
  '/:id/unlock',
  authenticate,
  authorize(PERMISSIONS.USER_UNLOCK),
  userController.unlockUser
);

router.get(
  '/:id/locations',
  authenticate,
  authorize(PERMISSIONS.USER_VIEW),
  userController.getUserLocations
);

router.put(
  '/:id/locations',
  authenticate,
  authorize(PERMISSIONS.USER_EDIT),
  userController.updateUserLocations
);

router.get(
  '/:id/permissions',
  authenticate,
  authorize(PERMISSIONS.USER_VIEW),
  userController.getPermissions
);

router.put(
  '/:id/permissions',
  authenticate,
  authorize(PERMISSIONS.USER_EDIT),
  userController.updatePermissions
);

router.get(
  '/:id/activity',
  authenticate,
  authorize(PERMISSIONS.USER_VIEW),
  userController.getUserActivity
);

router.delete('/:id', authenticate, authorize(PERMISSIONS.USER_DELETE), userController.deleteUser);

module.exports = router;
