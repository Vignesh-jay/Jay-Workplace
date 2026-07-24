const express = require('express');

const router = express.Router();

const {
  validateEmployees,
  importEmployees,
  validateAssets,
  importAssets,
} = require('../services/import.service');

/**
 * Validate Employee Import
 */
router.post('/employees/validate', async (req, res) => {
  try {
    const rows = req.body.rows || [];

    const result = await validateEmployees(rows);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Employee validation failed.',
    });
  }
});

/**
 * Import Employees
 */
router.post('/employees', async (req, res) => {
  try {
    const rows = req.body.rows || [];

    const result = await importEmployees(rows);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Employee import failed.',
    });
  }
});

router.post('/assets/validate', async (req, res) => {
  try {
    const rows = req.body.rows || [];

    const result = await validateAssets(rows);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Asset validation failed.',
    });
  }
});

router.post('/assets', async (req, res) => {
  try {
    const rows = req.body.rows || [];

    const result = await importAssets(rows);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Asset import failed.',
    });
  }
});

module.exports = router;
