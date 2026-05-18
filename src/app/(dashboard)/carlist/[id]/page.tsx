import React from "react";
import CarDetail from "@/components/features/car/CarDetail";
import { getSelect } from "@/components/features/car/Form/getSelect";
import { prisma, prismaExecute } from "@/lib/prisma";
import { CarData } from "@/types/CarData";

const fetchCarById = async (id: number) => {
  try {
    return await prismaExecute(async () => {
      return await prisma.car.findFirst({
        where: { id },
        include: {
          carType: true,
          employee: true,
          leasing: true,
          place: true,
          etc_card: true,
          refueling_card: true,
        },
      });
    });
  } catch {
    return null;
  }
};

const CarDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const [
    carData,
    { carTypes, places, employees, leasingCompanies, refuelingCards, etcCards },
  ] = await Promise.all([fetchCarById(id), getSelect()]);
  const car = (carData ?? undefined) as CarData | undefined;

  return (
    <>
      <div>
        <CarDetail
          data={car}
          id={id.toString()}
          carTypes={carTypes}
          places={places}
          employees={employees}
          leasingCompanies={leasingCompanies}
          refuelingCards={refuelingCards}
          etcCards={etcCards}
        />
      </div>
    </>
  );
};

export default CarDetailPage;
