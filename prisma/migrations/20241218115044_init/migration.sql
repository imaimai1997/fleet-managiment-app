-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "first_registration_date" TIMESTAMP(3) NOT NULL,
    "leasing_start_date" TIMESTAMP(3) NOT NULL,
    "leasing_finish_date" TIMESTAMP(3) NOT NULL,
    "harf_year_inspection" TEXT NOT NULL,
    "inspection_expires_date" TIMESTAMP(3) NOT NULL,
    "inspection_data" BYTEA NOT NULL,
    "inspection_data_name" TEXT NOT NULL,
    "insuarance_expires_date" TIMESTAMP(3) NOT NULL,
    "insuarance_data" BYTEA NOT NULL,
    "insuarance_data_name" TEXT NOT NULL,
    "tire_change" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeasingCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "LeasingCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refueling_card" (
    "id" SERIAL NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Refueling_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etc_card" (
    "id" SERIAL NOT NULL,
    "period" TIMESTAMP(3) NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Etc_card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeasingCompany" ADD CONSTRAINT "LeasingCompany_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refueling_card" ADD CONSTRAINT "Refueling_card_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etc_card" ADD CONSTRAINT "Etc_card_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
