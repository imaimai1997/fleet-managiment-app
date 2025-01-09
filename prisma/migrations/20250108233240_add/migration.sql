-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_etc_cardName_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_refueling_cardNumber_fkey";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "inspection_data" DROP NOT NULL,
ALTER COLUMN "inspection_data_name" DROP NOT NULL,
ALTER COLUMN "insuarance_data" DROP NOT NULL,
ALTER COLUMN "insuarance_data_name" DROP NOT NULL,
ALTER COLUMN "tire_change" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "etc_cardName" DROP NOT NULL,
ALTER COLUMN "refueling_cardNumber" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_refueling_cardNumber_fkey" FOREIGN KEY ("refueling_cardNumber") REFERENCES "Refueling_card"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_etc_cardName_fkey" FOREIGN KEY ("etc_cardName") REFERENCES "Etc_card"("name") ON DELETE SET NULL ON UPDATE CASCADE;
