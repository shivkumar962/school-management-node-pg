/*
  Warnings:

  - You are about to drop the column `courseId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `maxMarks` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "courseId",
DROP COLUMN "maxMarks";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "examId";
