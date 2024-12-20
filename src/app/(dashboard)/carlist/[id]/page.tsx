import React from "react";
import CarDetail from "../../../../../components/CarDetail";
import Link from "next/link";
import PrimaryButton from "../../../../../components/PrimaryButton";
import { FaRegTrashAlt } from "react-icons/fa";

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
        <CarDetail data={carData} />
      </div>
      <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
        <div className="flex justify-between max-w-5xl mx-auto">
          <Link href="/carlist">
            <button className="flex items-center py-2 text-slate-500">
              削除
              <FaRegTrashAlt />
            </button>
          </Link>
          <Link href="/carlist">
            <PrimaryButton name="保存" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CarDetailPage;
