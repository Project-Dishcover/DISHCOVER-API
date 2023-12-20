/*
  Warnings:

  - Added the required column `gambar` to the `Bahan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bahan` ADD COLUMN `gambar` VARCHAR(191) NOT NULL;
