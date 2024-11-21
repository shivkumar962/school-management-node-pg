-- CreateTable
CREATE TABLE "ClassStudentMapping" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordStatus" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "ClassStudentMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassStudentMapping" ADD CONSTRAINT "ClassStudentMapping_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudentMapping" ADD CONSTRAINT "ClassStudentMapping_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
