/*
  Warnings:

  - You are about to drop the column `refueling_cardId` on the `Car` table. All the data in the column will be lost.
  - Added the required column `refueling_cardNumber` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_refueling_cardId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "refueling_cardId",
ADD COLUMN     "refueling_cardNumber" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_refueling_cardNumber_fkey" FOREIGN KEY ("refueling_cardNumber") REFERENCES "Refueling_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
