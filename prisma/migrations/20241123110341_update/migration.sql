-- CreateTable
CREATE TABLE "ClassSubjectMapping" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordStatus" TEXT NOT NULL DEFAULT 'active',
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "ClassSubjectMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassSubjectMapping" ADD CONSTRAINT "ClassSubjectMapping_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSubjectMapping" ADD CONSTRAINT "ClassSubjectMapping_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
