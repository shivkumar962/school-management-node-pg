/*
  Warnings:

  - You are about to drop the column `classTeacherId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_classTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- DropIndex
DROP INDEX "Parent_userId_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "classTeacherId";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "classId",
DROP COLUMN "parentId";
