const express = require('express');
const prisma = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = req.query.status;

    let where = {};

    if (filter === 'active') {
      where.status = true;
    } else if (filter === 'disabled') {
      where.status = false;
    }
    // "all" or no filter => no status filter

    const locations = await prisma.location.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to load locations.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { code, name, state } = req.body;

    const location = await prisma.location.create({
      data: {
        code,
        name,
        state,
      },
    });

    res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'location code already exists.',
      });
    }

    res.status(500).json({
      error: 'Failed to create location.',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { code, name, state, status } = req.body;

    const location = await prisma.location.update({
      where: {
        id,
      },
      data: {
        code,
        name,
        state,
        status,
      },
    });

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'location not found.',
      });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'location code already exists.',
      });
    }

    res.status(500).json({
      error: 'Failed to update location.',
    });
  }
});

router.put('/:id/disable', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.location.update({
      where: { id },
      data: {
        status: false,
      },
    });

    res.json({
      success: true,
      message: 'location disabled successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to disable location.',
    });
  }
});

router.put('/:id/enable', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.location.update({
      where: { id },

      data: {
        status: true,
      },
    });

    res.json({
      success: true,
      message: 'location enabled successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to enable location.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.location.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: 'location deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete location.',
    });
  }
});

module.exports = router;
