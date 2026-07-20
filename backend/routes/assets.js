const express = require('express');
const prisma = require('../db');

const router = express.Router();

/**
 * GET /assets
 */
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    const assets = await prisma.asset.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: assets,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch assets.',
    });
  }
});

/**
 * GET /assets/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const asset = await prisma.asset.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found.',
      });
    }

    res.json({
      success: true,
      data: asset,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset.',
    });
  }
});

/**
 * POST /assets
 */
router.post('/', async (req, res) => {
  try {
    const data = {
      ...req.body,

      purchaseDate: req.body.purchaseDate ? new Date(req.body.purchaseDate) : null,

      warrantyExpiry: req.body.warrantyExpiry ? new Date(req.body.warrantyExpiry) : null,

      retiredDate: req.body.retiredDate ? new Date(req.body.retiredDate) : null,

      transferDate: req.body.transferDate ? new Date(req.body.transferDate) : null,
    };

    const asset = await prisma.asset.create({
      data,
    });

    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to create asset.',
      error: error.message,
    });
  }
});

/**
 * PUT /assets/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const data = {
      ...req.body,

      purchaseDate: req.body.purchaseDate ? new Date(req.body.purchaseDate) : null,

      warrantyExpiry: req.body.warrantyExpiry ? new Date(req.body.warrantyExpiry) : null,

      retiredDate: req.body.retiredDate ? new Date(req.body.retiredDate) : null,

      transferDate: req.body.transferDate ? new Date(req.body.transferDate) : null,
    };

    const asset = await prisma.asset.update({
      where: {
        id: Number(req.params.id),
      },
      data,
    });

    res.json({
      success: true,
      data: asset,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to update asset.',
      error: error.message,
    });
  }
});

/**
 * DELETE /assets/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await prisma.asset.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: 'Asset deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete asset.',
      error: error.message,
    });
  }
});

/**
 * GET /assets/:id/history
 */
router.get('/:id/history', async (req, res) => {
  try {
    const history = await prisma.assetHistory.findMany({
      where: {
        assetId: Number(req.params.id),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset history.',
    });
  }
});

/**
 * POST /assets/:id/history
 */
router.post('/:id/history', async (req, res) => {
  try {
    const { action, details } = req.body;

    const history = await prisma.assetHistory.create({
      data: {
        assetId: Number(req.params.id),
        action,
        details,
      },
    });

    res.status(201).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to add asset history.',
      error: error.message,
    });
  }
});

module.exports = router;
