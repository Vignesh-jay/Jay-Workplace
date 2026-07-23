/*
  Warnings:

  - You are about to drop the column `message` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `action` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `performedBy` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "module" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "performedBy" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Activity" ("id", "timestamp") SELECT "id", "timestamp" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
