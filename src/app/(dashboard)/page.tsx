import React from "react";
import SearchBar from "@/components/SearchBar";
import CarList from "@/components/CarList";
import Link from "next/link";
import { CarListData } from "@/type/CarListData";
import { Button } from "@/components/Button";

type Props = { searchParams?: Promise<{ query?: string; page?: string }> };

const fetchFilteredCars = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carlist`, {
    cache: "no-store",
  });

  const data = await res.json();
  const cars = await data.cars;
  const filteredCar = await cars.filter(
    (car: CarListData) =>
      car.label.toLowerCase().includes(query.toLowerCase()) ||
      car.employeeName.toLowerCase().includes(query.toLowerCase())
  );

  return filteredCar;
};

const CarListPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = params?.query || "";
  const cars = await fetchFilteredCars(query);

  return (
    <>
      <div className="mx-8 mt-8 mb-16">
        <SearchBar />
        <CarList data={cars} />
      </div>
      <div className="w-[calc(100vw-240px)] fixed bottom-0 text-end  pr-16 py-2 bg-white shadow-inner">
        <Link href="carlist/create">
          <Button rounded="full">新規追加</Button>
        </Link>
      </div>
    </>
  );
};

export default CarListPage;
