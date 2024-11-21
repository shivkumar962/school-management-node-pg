/*
  Warnings:

  - You are about to drop the column `classId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Timetable` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_classId_fkey";

-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_classId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "classId";

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "classId";
