/*
  Warnings:

  - The `loginExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "loginExpiry",
ADD COLUMN     "loginExpiry" TIMESTAMP(3);
