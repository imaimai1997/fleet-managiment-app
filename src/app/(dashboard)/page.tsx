import React from "react";
import SearchBar from "@/components/SearchBar";
import CarList from "@/components/CarList";
import Link from "next/link";
import { CarListData } from "@/type/CarListData";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";

type Props = { searchParams?: Promise<{ query?: string; page?: string }> };

const fetchFilteredCars = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carlist`);

  const data = await res.json();
  const cars = await data.cars;
  const filteredCar = await cars.filter(
    (car: CarListData) =>
      car.label.toLowerCase().includes(query.toLowerCase()) ||
      car.employeeName.toLowerCase().includes(query.toLowerCase()),
  );

  return filteredCar;
};

const CarListPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = params?.query || "";
  const cars = await fetchFilteredCars(query);

  return (
    <>
      <div className="bg-white p-4 mx-4 mt-4 mb-16 rounded-md border-2 border-gray-200">
        <div className="flex justify-between">
          <SearchBar placeholder="車両番号、管理者を検索..." />
          <Link href="carlist/create">
            <Button
              rounded="md"
              className="flex gap-2 items-center justify-center"
            >
              <FaPlus />
              新規追加
            </Button>
          </Link>
        </div>
        <CarList data={cars} />
      </div>
    </>
  );
};

export default CarListPage;
