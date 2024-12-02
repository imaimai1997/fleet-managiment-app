import React from "react";
import SearchBar from "../../../../components/SearchBar";
import CarList from "../../../../components/CarList";
import PrimaryButton from "../../../../components/PrimaryButton";
import Link from "next/link";

const CarListPage = async () => {
  const res = await fetch("http://localhost:3000/testdata/cardata.json");
  const data = await res.json();

  return (
    <>
      <div className="mx-8 mt-8 mb-16">
        <SearchBar />
        <CarList data={data} />
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