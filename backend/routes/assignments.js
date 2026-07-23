const express = require('express');
const prisma = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        asset: true,
        employee: true,
      },
      orderBy: {
        assignedDate: 'desc',
      },
    });

    res.json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments.',
    });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        asset: true,
        employee: true,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found.',
      });
    }

    res.json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignment.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { assetId, employeeId, assignedBy, assignedDate, expectedReturn, remarks } = req.body;

    const asset = await prisma.asset.findUnique({
      where: {
        id: Number(assetId),
      },
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found.',
      });
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found.',
      });
    }

    if (asset.status === 'Assigned') {
      return res.status(400).json({
        success: false,
        message: 'Asset is already assigned.',
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const assignment = await tx.assignment.create({
        data: {
          assetId: asset.id,
          employeeId: employee.id,
          assignedBy: assignedBy || 'System',
          assignedDate: assignedDate ? new Date(assignedDate) : new Date(),
          expectedReturn: expectedReturn ? new Date(expectedReturn) : null,
          remarks,
          status: 'Assigned',
        },
      });

      await tx.asset.update({
        where: {
          id: asset.id,
        },
        data: {
          status: 'Assigned',
        },
      });

      await tx.assetHistory.create({
        data: {
          assetId: asset.id,
          action: 'Assigned',
          details: `Assigned to ${employee.firstName} ${employee.lastName} (${employee.employeeId})`,
        },
      });

      await tx.employeeHistory.create({
        data: {
          employeeId: employee.id,
          action: 'Asset Assigned',
          details: `${asset.name} (${asset.assetId})`,
        },
      });

      await tx.activity.create({
        data: {
          message: `${asset.name} assigned to ${employee.firstName} ${employee.lastName}`,
        },
      });

      return assignment;
    });

    res.status(201).json({
      success: true,
      message: 'Asset assigned successfully.',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to assign asset.',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const assignmentId = Number(req.params.id);

    const { returnedBy, condition, remarks } = req.body;

    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
      include: {
        asset: true,
        employee: true,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found.',
      });
    }

    if (assignment.status === 'Returned') {
      return res.status(400).json({
        success: false,
        message: 'Asset already returned.',
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedAssignment = await tx.assignment.update({
        where: {
          id: assignmentId,
        },
        data: {
          status: 'Returned',
          returnedDate: new Date(),
          returnedBy: returnedBy || 'System',
          condition,
          remarks,
        },
      });

      await tx.asset.update({
        where: {
          id: assignment.asset.id,
        },
        data: {
          status: 'Available',
        },
      });

      await tx.assetHistory.create({
        data: {
          assetId: assignment.asset.id,
          action: 'Returned',
          details: `Returned by ${assignment.employee.firstName} ${assignment.employee.lastName} (${assignment.employee.employeeId})`,
        },
      });

      await tx.employeeHistory.create({
        data: {
          employeeId: assignment.employee.id,
          action: 'Asset Returned',
          details: `${assignment.asset.name} (${assignment.asset.assetId})`,
        },
      });

      await tx.activity.create({
        data: {
          message: `${assignment.asset.name} returned by ${assignment.employee.firstName} ${assignment.employee.lastName}`,
        },
      });

      return updatedAssignment;
    });

    res.json({
      success: true,
      message: 'Asset returned successfully.',
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to return asset.',
    });
  }
});

module.exports = router;
