/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Etc_card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Refueling_card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Etc_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Refueling_card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Etc_card" ADD COLUMN     "number" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Refueling_card" ADD COLUMN     "number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RefuelingFee" (
    "id" SERIAL NOT NULL,
    "refueling_card_number" TEXT NOT NULL,
    "fee_date" TIMESTAMP(3) NOT NULL,
    "refueling_fee" INTEGER NOT NULL,

    CONSTRAINT "RefuelingFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtcFee" (
    "id" SERIAL NOT NULL,
    "etc_card_number" TEXT NOT NULL,
    "fee_date" TIMESTAMP(3) NOT NULL,
    "etc_fee" INTEGER NOT NULL,

    CONSTRAINT "EtcFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaseFee" (
    "id" SERIAL NOT NULL,
    "car_label" TEXT NOT NULL,
    "fee_date" TIMESTAMP(3) NOT NULL,
    "lease_fee" INTEGER NOT NULL,

    CONSTRAINT "LeaseFee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_label_key" ON "Car"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Etc_card_number_key" ON "Etc_card"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Refueling_card_number_key" ON "Refueling_card"("number");

-- AddForeignKey
ALTER TABLE "RefuelingFee" ADD CONSTRAINT "RefuelingFee_refueling_card_number_fkey" FOREIGN KEY ("refueling_card_number") REFERENCES "Refueling_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtcFee" ADD CONSTRAINT "EtcFee_etc_card_number_fkey" FOREIGN KEY ("etc_card_number") REFERENCES "Etc_card"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaseFee" ADD CONSTRAINT "LeaseFee_car_label_fkey" FOREIGN KEY ("car_label") REFERENCES "Car"("label") ON DELETE RESTRICT ON UPDATE CASCADE;
