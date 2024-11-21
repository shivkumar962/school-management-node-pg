/*
  Warnings:

  - You are about to drop the column `StudentAadharCardNumber` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentAadharCardNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_StudentAadharCardNumber_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "StudentAadharCardNumber",
ADD COLUMN     "studentAadharCardNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentAadharCardNumber_key" ON "Student"("studentAadharCardNumber");
