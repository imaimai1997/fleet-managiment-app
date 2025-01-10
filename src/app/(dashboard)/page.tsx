import React from "react";
// import SearchBar from "../../../components/SearchBar";
import CarList from "../../../components/CarList";
import PrimaryButton from "../../../components/PrimaryButton";
import Link from "next/link";

const fetchCarList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.cars;
};

const CarListPage = async () => {
  const cars = await fetchCarList();

  return (
    <>
      <div className="mx-8 mt-8 mb-16">
        {/* <SearchBar /> 開発中*/}
        <CarList data={cars} />
      </div>
      <div className="w-5/6 fixed bottom-0 text-end px-16 py-2 bg-white">
        <Link href="carlist/create">
          <PrimaryButton name="新規追加" />
        </Link>
      </div>
    </>
  );
};

export default CarListPage;
