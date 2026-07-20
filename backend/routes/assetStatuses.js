const express = require('express');
const prisma = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.status === 'active') {
    where.isActive = true;
  }

  const statuses = await prisma.assetStatus.findMany({
    where,
    orderBy: {
      name: 'asc',
    },
  });

  res.json({
    success: true,
    data: statuses,
  });
});

router.post('/', async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const statuses = await prisma.assetStatus.create({
      data: {
        code,
        name,
        description,
      },
    });

    res.status(201).json({
      success: true,
      data: statuses,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Status code already exists.',
      });
    }

    res.status(500).json({
      error: 'Failed to create Status.',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { code, name, description, status } = req.body;

    const statuses = await prisma.assetStatus.update({
      where: {
        id,
      },
      data: {
        code,
        name,
        description,
        status,
      },
    });

    res.json({
      success: true,
      data: statuses,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Status not found.',
      });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Status code already exists.',
      });
    }

    res.status(500).json({
      error: 'Failed to update Status.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const status = await prisma.assetStatus.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!status) {
      return res.status(404).json({
        success: false,
        message: 'Asset Status not found.',
      });
    }

    const assetCount = await prisma.asset.count({
      where: {
        status: status.name,
      },
    });

    if (assetCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete. ${assetCount} asset(s) are using this status.`,
      });
    }

    await prisma.assetStatus.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: 'Asset Status deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
