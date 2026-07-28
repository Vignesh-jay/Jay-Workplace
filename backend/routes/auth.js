const express = require('express');

const router = express.Router();

const authService = require('../services/auth.service');

const authenticate = require('../middleware/authenticate');

const authorize = require('../middleware/authorize');
const PERMISSIONS = require('../constants/permissions');

router.get('/test-permission', authenticate, authorize(PERMISSIONS.USER_VIEW), (req, res) => {
  res.json({
    success: true,
    message: 'Permission check passed.',
  });
});

router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const result = await authService.login(email, password);

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
