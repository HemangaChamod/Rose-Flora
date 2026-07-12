/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `customer` ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL,
    ADD COLUMN `verificationTokenExpires` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_verificationToken_key` ON `Customer`(`verificationToken`);
