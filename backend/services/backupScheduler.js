const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const MAX_BACKUPS = 30;

const { generateSystemBackup } = require('../controllers/admin.controller');

function startBackupScheduler() {
  cron.schedule('0 2 * * *', async () => {
    try {
      console.log('Running automatic backup...');

      const backup = await generateSystemBackup();

      const folder = path.join(__dirname, '..', 'backups', 'automatic');

      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }

      const fileName = `auto-backup-${Date.now()}.json`;

      const backupPath = path.join(folder, fileName);

      fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

      console.log('Automatic backup created:', fileName);

      // Keep only latest 30 backups

      const files = fs
        .readdirSync(folder)
        .filter((file) => file.endsWith('.json'))
        .map((file) => ({
          name: file,
          path: path.join(folder, file),
          time: fs.statSync(path.join(folder, file)).mtime.getTime(),
        }))
        .sort((a, b) => b.time - a.time);

      if (files.length > MAX_BACKUPS) {
        const filesToDelete = files.slice(MAX_BACKUPS);

        filesToDelete.forEach((file) => {
          fs.unlinkSync(file.path);

          console.log('Old backup removed:', file.name);
        });
      }
    } catch (error) {
      console.error('Automatic backup failed:', error.message);
    }
  });

  console.log('Automatic backup scheduler started');
}

module.exports = {
  startBackupScheduler,
};
