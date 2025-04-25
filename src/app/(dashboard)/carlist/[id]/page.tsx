import React from "react";
import CarDetail from "@/components/CarDetail";
import { getSelect } from "@/components/Form/Car/getSelect";

const fetchCarById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`);

  const data = await res.json();
  return data.car;
};

const CarDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const carData = await fetchCarById(id);

  const {
    carTypes,
    places,
    employees,
    leasingCompanies,
    refuelingCards,
    etcCards,
  } = await getSelect();

  return (
    <>
      <div>
        <CarDetail
          data={carData}
          id={id}
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
