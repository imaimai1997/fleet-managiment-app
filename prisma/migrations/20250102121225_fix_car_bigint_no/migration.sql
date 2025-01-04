-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_refueling_cardNumber_fkey";

-- DropForeignKey
ALTER TABLE "EtcFee" DROP CONSTRAINT "EtcFee_etc_card_number_fkey";

-- DropForeignKey
ALTER TABLE "RefuelingFee" DROP CONSTRAINT "RefuelingFee_refueling_card_number_fkey";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "refueling_cardNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EtcFee" ALTER COLUMN "etc_card_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Etc_card" ALTER COLUMN "number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RefuelingFee" ALTER COLUMN "refueling_card_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Refueling_card" ALTER COLUMN "number" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_refueling_cardNumber_fkey" FOREIGN KEY ("refueling_cardNumber") REFERENCES "Refueling_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefuelingFee" ADD CONSTRAINT "RefuelingFee_refueling_card_number_fkey" FOREIGN KEY ("refueling_card_number") REFERENCES "Refueling_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtcFee" ADD CONSTRAINT "EtcFee_etc_card_number_fkey" FOREIGN KEY ("etc_card_number") REFERENCES "Etc_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
