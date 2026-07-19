const express = require('express');
const prisma = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    const employees = await prisma.employee.findMany({
      where,
      orderBy: {
        employeeId: 'asc',
      },
    });

    res.json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.error('EMPLOYEE ERROR:');
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      department,
      designation,
      manager,
      location,
      employmentType,
      joiningDate,
      leavingDate,
    } = req.body;

    const employee = await prisma.employee.create({
      data: {
        employeeId,
        firstName,
        lastName,
        email,
        phone,
        department,
        designation,
        manager,
        location,
        employmentType,
        joiningDate: new Date(joiningDate),
        leavingDate: leavingDate ? new Date(leavingDate) : null,
      },
    });
    res.status(201).json({
      success: true,
      message: 'Employee created successfully.',
      data: employee,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Employee ID or email already exists.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create employee.',
    });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid employee ID.',
    });
  }
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      department,
      designation,
      manager,
      location,
      employmentType,
      joiningDate,
      leavingDate,
      status,
    } = req.body;

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        employeeId,
        firstName,
        lastName,
        email,
        phone,
        department,
        designation,
        manager,
        location,
        employmentType,
        joiningDate: new Date(joiningDate),
        leavingDate: leavingDate ? new Date(leavingDate) : null,
        status,
      },
    });

    res.json({
      success: true,
      message: 'Employee updated successfully.',
      data: employee,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Employee ID or email already exists.',
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Employee not found.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update employee.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid employee ID.',
    });
  }
  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: 'Employee deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete Employee.',
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  const employee = await prisma.employee.findUnique({
    where: { id },
  });

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  res.json({
    success: true,
    data: employee,
  });
});

router.get('/:id/history', async (req, res) => {
  try {
    const employeeId = Number(req.params.id);

    const history = await prisma.employeeHistory.findMany({
      where: {
        employeeId,
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
      message: 'Failed to fetch employee history.',
    });
  }
});

router.post('/:id/history', async (req, res) => {
  try {
    const employeeId = Number(req.params.id);

    const { action, details } = req.body;

    const history = await prisma.employeeHistory.create({
      data: {
        employeeId,
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
      message: 'Failed to create employee history.',
    });
  }
});

module.exports = router;
