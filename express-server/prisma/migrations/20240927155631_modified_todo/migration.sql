/*
  Warnings:

  - You are about to drop the column `name` on the `todos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_todos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "todos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_todos" ("authorId", "content", "done", "id") SELECT "authorId", "content", "done", "id" FROM "todos";
DROP TABLE "todos";
ALTER TABLE "new_todos" RENAME TO "todos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
