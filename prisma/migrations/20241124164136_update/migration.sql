/*
  Warnings:

  - You are about to drop the column `addmitionInClass` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "addmitionInClass",
ADD COLUMN     "currentClassId" TEXT;
