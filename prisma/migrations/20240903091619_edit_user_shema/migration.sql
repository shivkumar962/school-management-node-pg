/*
  Warnings:

  - Added the required column `loginExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginExpiry" TEXT NOT NULL,
ADD COLUMN     "loginToken" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL;
