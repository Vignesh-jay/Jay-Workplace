const express = require('express');
const prisma = require('../db');

const router = express.Router();

/**
 * GET All Activities
 */
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

/**
 * Create Activity
 */
router.post('/', async (req, res) => {
  try {
    const {
      module,
      action,
      description,

      entityType,
      entityId,
      entityCode,

      performedBy,
    } = req.body;

    const activity = await prisma.activity.create({
      data: {
        module,
        action,
        description,

        entityType,
        entityId,
        entityCode,

        performedBy,
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

router.get('/:id', async (req, res) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found.',
      });
    }

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.activity.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: 'Activity deleted.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete activity.',
    });
  }
});

module.exports = router;
