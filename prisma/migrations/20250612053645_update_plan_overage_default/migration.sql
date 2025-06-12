/*
  Warnings:

  - Made the column `overage_description` on table `Plan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `overage_description` VARCHAR(191) NOT NULL DEFAULT '';
