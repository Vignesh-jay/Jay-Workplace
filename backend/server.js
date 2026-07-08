const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const departmentRoutes = require('./routes/departments');

app.use('/departments', departmentRoutes);

const PORT = 3000;

const prisma = require('./db');

(async () => {
  const departments = await prisma.department.findMany();

  console.log('DATABASE CONTENTS:');
  console.table(departments);
})();

app.listen(PORT, () => {
  console.log(
    `🚀 JAY Workplace Backend v2 - Disable/Enable API Loaded on http://localhost:${PORT}`
  );
});
