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

    const departments = await prisma.department.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });

    res.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to load departments.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { code, name, description } = req.body;

    const department = await prisma.department.create({
      data: {
        code,
        name,
        description,
      },
    });

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Department code already exists.',
      });
    }

    res.status(500).json({
      error: 'Failed to create department.',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { code, name, description, status } = req.body;

    const department = await prisma.department.update({
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
      data: department,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Department not found.',
      });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'Department code already exists.',
      });
    }

    res.status(500).json({
      error: 'Failed to update department.',
    });
  }
});

router.put('/:id/disable', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.department.update({
      where: { id },
      data: {
        status: false,
      },
    });

    res.json({
      success: true,
      message: 'Department disabled successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to disable department.',
    });
  }
});

router.put('/:id/enable', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.department.update({
      where: { id },

      data: {
        status: true,
      },
    });

    res.json({
      success: true,
      message: 'Department enabled successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to enable department.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.department.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: 'Department deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete department.',
    });
  }
});

module.exports = router;
