-- AddForeignKey
ALTER TABLE `Pantry` ADD CONSTRAINT `Pantry_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
