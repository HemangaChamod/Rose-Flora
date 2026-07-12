/*
  Warnings:

  - A unique constraint covering the columns `[stripePaymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `stockProcessed` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Order_stripePaymentId_key` ON `Order`(`stripePaymentId`);
