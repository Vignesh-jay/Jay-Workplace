-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assetId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "assignedDate" DATETIME NOT NULL,
    "expectedReturn" DATETIME,
    "returnedDate" DATETIME,
    "assignedBy" TEXT NOT NULL,
    "returnedBy" TEXT,
    "remarks" TEXT,
    "condition" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Assigned',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Assignment_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
