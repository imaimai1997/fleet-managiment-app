import React from "react";
import CarDetail from "../../../../../components/CarDetail";

const fetchCarById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/car/${id}`, {
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
      <h2 className="m-16 text-xl">車両詳細/編集画面</h2>
      <div>
        <CarDetail data={carData} id={id} />
      </div>
    </>
  );
};

export default CarDetailPage;
