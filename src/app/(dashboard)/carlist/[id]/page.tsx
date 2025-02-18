import React from "react";
import CarDetail from "../../../../../components/CarDetail";

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
      <h2 className="m-16 text-xl">車両詳細画面</h2>
      <div>
        <CarDetail data={carData} id={id} />
      </div>
    </>
  );
};

export default CarDetailPage;
