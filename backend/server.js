const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const departmentRoutes = require('./routes/departments');

app.use('/departments', departmentRoutes);

const locationRoutes = require('./routes/locations');

app.use('/locations', locationRoutes);

const employeeRoutes = require('./routes/employees');

app.use('/employees', employeeRoutes);

const PORT = 3000;

const prisma = require('./db');

app.listen(PORT, () => {
  console.log(
    `🚀 JAY Workplace Backend v2 - Disable/Enable API Loaded on http://localhost:${PORT}`
  );
});
