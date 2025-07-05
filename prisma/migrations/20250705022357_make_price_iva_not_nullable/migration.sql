/*
  Warnings:

  - Made the column `price_IVA` on table `Orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "price_IVA" SET NOT NULL;
