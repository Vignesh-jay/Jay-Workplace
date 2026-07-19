const express = require('express');
const prisma = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const activity = await prisma.activity.create({
      data: {
        message,
      },
    });

    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to create activity.',
    });
  }
});

module.exports = router;
