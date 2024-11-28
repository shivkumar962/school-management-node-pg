-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_classSubjectMappingId_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "classSubjectMappingId" DROP NOT NULL,
ALTER COLUMN "classSubjectMappingId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classSubjectMappingId_fkey" FOREIGN KEY ("classSubjectMappingId") REFERENCES "ClassSubjectMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;
