import React from "react";
import CarDetail from "@/components/CarDetail";

const fetchCarById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`, {
    cache: "no-store",
  });

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

  return (
    <>
      <div>
        <CarDetail data={carData} id={id} />
      </div>
    </>
  );
};

export default CarDetailPage;
