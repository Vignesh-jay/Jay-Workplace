const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const PERMISSIONS = require('../constants/permissions');

router.post('/login', authController.login);

router.get('/me', authenticate, authController.me);

router.post('/change-password', authenticate, authController.changePassword);

router.get(
  '/test-permission',
  authenticate,
  authorize(PERMISSIONS.USER_VIEW),
  authController.testPermission
);

router.post('/logout', authenticate, authController.logout);

module.exports = router;
