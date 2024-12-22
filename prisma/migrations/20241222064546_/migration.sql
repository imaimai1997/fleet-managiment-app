/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `etc_cardId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `leasingId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Etc_card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `LeasingCompany` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carTypeName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etc_cardName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leasingName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeName` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Etc_card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_etc_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_leasingId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_placeId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "employeeId",
DROP COLUMN "etc_cardId",
DROP COLUMN "leasingId",
DROP COLUMN "placeId",
ADD COLUMN     "carTypeName" TEXT NOT NULL,
ADD COLUMN     "employeeName" TEXT NOT NULL,
ADD COLUMN     "etc_cardName" TEXT NOT NULL,
ADD COLUMN     "leasingName" TEXT NOT NULL,
ADD COLUMN     "placeName" TEXT NOT NULL,
ALTER COLUMN "inspection_data" SET DATA TYPE TEXT,
ALTER COLUMN "insuarance_data" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Etc_card" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CarType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarType_name_key" ON "CarType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Etc_card_name_key" ON "Etc_card"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LeasingCompany_name_key" ON "LeasingCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_key" ON "Place"("name");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carTypeName_fkey" FOREIGN KEY ("carTypeName") REFERENCES "CarType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_employeeName_fkey" FOREIGN KEY ("employeeName") REFERENCES "Employee"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_placeName_fkey" FOREIGN KEY ("placeName") REFERENCES "Place"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_leasingName_fkey" FOREIGN KEY ("leasingName") REFERENCES "LeasingCompany"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_etc_cardName_fkey" FOREIGN KEY ("etc_cardName") REFERENCES "Etc_card"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
