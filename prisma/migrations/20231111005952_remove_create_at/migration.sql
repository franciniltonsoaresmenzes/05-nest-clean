/*
  Warnings:

  - Made the column `created_at` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "created_at" SET NOT NULL;
