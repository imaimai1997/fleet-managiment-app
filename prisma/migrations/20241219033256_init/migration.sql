/*
  Warnings:

  - You are about to drop the column `carId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `Etc_card` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `LeasingCompany` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `Refueling_card` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etc_cardId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leasingId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refueling_cardId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_carId_fkey";

-- DropForeignKey
ALTER TABLE "Etc_card" DROP CONSTRAINT "Etc_card_carId_fkey";

-- DropForeignKey
ALTER TABLE "LeasingCompany" DROP CONSTRAINT "LeasingCompany_carId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_carId_fkey";

-- DropForeignKey
ALTER TABLE "Refueling_card" DROP CONSTRAINT "Refueling_card_carId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "etc_cardId" INTEGER NOT NULL,
ADD COLUMN     "leasingId" INTEGER NOT NULL,
ADD COLUMN     "placeId" INTEGER NOT NULL,
ADD COLUMN     "refueling_cardId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "carId";

-- AlterTable
ALTER TABLE "Etc_card" DROP COLUMN "carId";

-- AlterTable
ALTER TABLE "LeasingCompany" DROP COLUMN "carId";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "carId";

-- AlterTable
ALTER TABLE "Refueling_card" DROP COLUMN "carId";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_leasingId_fkey" FOREIGN KEY ("leasingId") REFERENCES "LeasingCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_refueling_cardId_fkey" FOREIGN KEY ("refueling_cardId") REFERENCES "Refueling_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_etc_cardId_fkey" FOREIGN KEY ("etc_cardId") REFERENCES "Etc_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
