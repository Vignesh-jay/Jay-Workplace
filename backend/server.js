const express = require('express');
const cors = require('cors');

const bootstrapAdministrator = require('./bootstrap/admin.bootstrap');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

const departmentRoutes = require('./routes/departments');

app.use('/departments', departmentRoutes);

const locationRoutes = require('./routes/locations');

app.use('/locations', locationRoutes);

const employeeRoutes = require('./routes/employees');

app.use('/employees', employeeRoutes);

const activityRoutes = require('./routes/activities');

app.use('/activities', activityRoutes);

const assetRoutes = require('./routes/assets');

app.use('/assets', assetRoutes);

const assetStatuses = require('./routes/assetStatuses');

app.use('/asset-statuses', assetStatuses);

const assetTransfers = require('./routes/assetTransfers');

app.use('/asset-transfers', assetTransfers);

const assignmentRoutes = require('./routes/assignments');

app.use('/assignments', assignmentRoutes);

const importRoutes = require('./routes/import');

app.use('/api/import', importRoutes);

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

const prisma = require('./db');

async function startServer() {
  try {
    await bootstrapAdministrator();

    app.listen(PORT, () => {
      console.log(`🚀 JAY Workplace Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
