-- CreateTable
CREATE TABLE `solicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `aceptado` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitud` ADD CONSTRAINT `solicitud_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `solicitud` ADD CONSTRAINT `solicitud_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `userDoctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
