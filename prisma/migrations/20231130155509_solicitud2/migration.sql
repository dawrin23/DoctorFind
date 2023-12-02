/*
  Warnings:

  - Added the required column `fecha` to the `solicitud` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensaje` to the `solicitud` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `solicitud` ADD COLUMN `fecha` DATETIME(3) NOT NULL,
    ADD COLUMN `mensaje` VARCHAR(191) NOT NULL;
