/*
  Warnings:

  - You are about to drop the column `userId` on the `ClassStudentMapping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassStudentMapping" DROP CONSTRAINT "ClassStudentMapping_userId_fkey";

-- AlterTable
ALTER TABLE "ClassStudentMapping" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "ClassStudentMapping" ADD CONSTRAINT "ClassStudentMapping_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudentMapping" ADD CONSTRAINT "ClassStudentMapping_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
