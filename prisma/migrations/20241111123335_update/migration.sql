/*
  Warnings:

  - A unique constraint covering the columns `[StudentAadharCardNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "StudentAadharCardNumber" TEXT,
ADD COLUMN     "addmitionInClass" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "emailAddress" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "homeAddress" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "studentFullName" TEXT,
ALTER COLUMN "admissionNumber" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_StudentAadharCardNumber_key" ON "Student"("StudentAadharCardNumber");
