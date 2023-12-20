/*
  Warnings:

  - You are about to drop the column `bahan` on the `Pantry` table. All the data in the column will be lost.
  - Added the required column `bahan_id` to the `Pantry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pantry` DROP COLUMN `bahan`,
    ADD COLUMN `bahan_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pantry` ADD CONSTRAINT `Pantry_bahan_id_fkey` FOREIGN KEY (`bahan_id`) REFERENCES `Bahan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
