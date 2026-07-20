-- CreateTable
CREATE TABLE "AssetTransfer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "oldAssetId" INTEGER NOT NULL,
    "newAssetId" INTEGER,
    "fromLocation" TEXT NOT NULL,
    "toLocation" TEXT NOT NULL,
    "remarks" TEXT,
    "transferMode" TEXT NOT NULL,
    "transferDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AssetTransfer_oldAssetId_fkey" FOREIGN KEY ("oldAssetId") REFERENCES "Asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AssetTransfer_newAssetId_fkey" FOREIGN KEY ("newAssetId") REFERENCES "Asset" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
