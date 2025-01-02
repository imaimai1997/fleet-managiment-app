/*
  Warnings:

  - Changed the type of `etc_card_number` on the `EtcFee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `number` on the `Etc_card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `refueling_card_number` on the `RefuelingFee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `number` on the `Refueling_card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "EtcFee" DROP CONSTRAINT "EtcFee_etc_card_number_fkey";

-- DropForeignKey
ALTER TABLE "RefuelingFee" DROP CONSTRAINT "RefuelingFee_refueling_card_number_fkey";

-- AlterTable
ALTER TABLE "EtcFee" DROP COLUMN "etc_card_number",
ADD COLUMN     "etc_card_number" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Etc_card" DROP COLUMN "number",
ADD COLUMN     "number" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "RefuelingFee" DROP COLUMN "refueling_card_number",
ADD COLUMN     "refueling_card_number" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Refueling_card" DROP COLUMN "number",
ADD COLUMN     "number" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Etc_card_number_key" ON "Etc_card"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Refueling_card_number_key" ON "Refueling_card"("number");

-- AddForeignKey
ALTER TABLE "RefuelingFee" ADD CONSTRAINT "RefuelingFee_refueling_card_number_fkey" FOREIGN KEY ("refueling_card_number") REFERENCES "Refueling_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtcFee" ADD CONSTRAINT "EtcFee_etc_card_number_fkey" FOREIGN KEY ("etc_card_number") REFERENCES "Etc_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
