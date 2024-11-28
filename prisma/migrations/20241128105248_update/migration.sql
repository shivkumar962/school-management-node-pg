/*
  Warnings:

  - You are about to drop the column `classSubjectMappingId` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `ClassSubjectMapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_classSubjectMappingId_fkey";

-- AlterTable
ALTER TABLE "ClassSubjectMapping" ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "classSubjectMappingId";

-- AddForeignKey
ALTER TABLE "ClassSubjectMapping" ADD CONSTRAINT "ClassSubjectMapping_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
