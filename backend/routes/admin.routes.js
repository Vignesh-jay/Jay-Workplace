const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
});

const { createBackup, restoreBackup, resetSystem } = require('../controllers/admin.controller');

router.get('/backup', createBackup);

router.post('/restore', upload.single('backup'), restoreBackup);

router.post('/reset', resetSystem);

module.exports = router;
