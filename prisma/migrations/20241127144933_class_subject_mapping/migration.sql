/*
  Warnings:

  - You are about to drop the column `subjectId` on the `ClassSubjectMapping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassSubjectMapping" DROP CONSTRAINT "ClassSubjectMapping_subjectId_fkey";

-- AlterTable
ALTER TABLE "ClassSubjectMapping" DROP COLUMN "subjectId";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "classSubjectMappingId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classSubjectMappingId_fkey" FOREIGN KEY ("classSubjectMappingId") REFERENCES "ClassSubjectMapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
