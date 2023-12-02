-- CreateTable
CREATE TABLE `userDoctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `MedicalSpecialty` VARCHAR(191) NOT NULL,
    `ContactPhone` VARCHAR(191) NOT NULL,
    `WorkExperience` VARCHAR(191) NOT NULL,
    `OfficeAddress` VARCHAR(191) NOT NULL,
    `WorkingHours` VARCHAR(191) NOT NULL,
    `Exequatur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserDoctor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otpdoctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,

    UNIQUE INDEX `Otpdoctor_otp_key`(`otp`),
    UNIQUE INDEX `Otpdoctor_authorId_key`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Otpdoctor` ADD CONSTRAINT `Otpdoctor_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `userDoctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
