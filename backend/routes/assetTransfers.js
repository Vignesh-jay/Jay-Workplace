const express = require('express');
const prisma = require('../db');

const router = express.Router();

//
// GET All Transfers
//
router.get('/', async (req, res) => {
  try {
    const transfers = await prisma.assetTransfer.findMany({
      include: {
        oldAsset: true,
        newAsset: true,
      },
      orderBy: {
        transferDate: 'desc',
      },
    });

    res.json({
      success: true,
      data: transfers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset transfers.',
    });
  }
});

//
// POST Transfer
//
router.post('/', async (req, res) => {
  try {
    const transfer = await prisma.assetTransfer.create({
      data: {
        oldAssetId: Number(req.body.oldAssetId),
        newAssetId: req.body.newAssetId ? Number(req.body.newAssetId) : null,

        fromLocation: req.body.fromLocation,
        toLocation: req.body.toLocation,

        remarks: req.body.remarks || '',

        transferMode: req.body.transferMode,
      },
    });

    res.status(201).json({
      success: true,
      data: transfer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to create transfer.',
    });
  }
});

module.exports = router;
