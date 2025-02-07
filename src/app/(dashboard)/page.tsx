import React from "react";
import SearchBar from "../../../components/SearchBar";
import CarList from "../../../components/CarList";
import PrimaryButton from "../../../components/PrimaryButton";
import Link from "next/link";
import { CarData } from "../../../type/CarData";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

const fetchFilteredCars = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`, {
    cache: "no-store",
  });

  const data = await res.json();
  const cars = await data.cars;
  const filteredCar = await cars.filter(
    (car: CarData) =>
      car.label.toLowerCase().includes(query.toLowerCase()) ||
      car.employee.name.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredCar;
};

const CarListPage = async ({ searchParams }: Props) => {
  const query = (await searchParams?.query) || "";
  const cars = await fetchFilteredCars(query);

  return (
    <>
      <div className="mx-8 mt-8 mb-16">
        <SearchBar />
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
