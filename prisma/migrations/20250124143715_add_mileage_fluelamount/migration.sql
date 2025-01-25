/*
  Warnings:

  - Added the required column `refueling_amount` to the `RefuelingFee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefuelingFee" ADD COLUMN     "refueling_amount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Mileage" (
    "id" SERIAL NOT NULL,
    "car_label" TEXT NOT NULL,
    "mileage_date" TIMESTAMP(3) NOT NULL,
    "mileage" INTEGER NOT NULL,

    CONSTRAINT "Mileage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mileage" ADD CONSTRAINT "Mileage_car_label_fkey" FOREIGN KEY ("car_label") REFERENCES "Car"("label") ON DELETE RESTRICT ON UPDATE CASCADE;
