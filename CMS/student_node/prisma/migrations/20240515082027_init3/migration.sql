/*
  Warnings:

  - You are about to drop the column `classList` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `classList`,
    ADD COLUMN `class_list` TEXT NOT NULL;
