import React from "react";
import SearchBar from "@/components/ui/SearchBar";
import CarList from "@/components/features/car/CarList";
import Link from "next/link";
import { CarListData } from "@/types/CarListData";
import { Button } from "@/components/ui/Button";
import { FaPlus } from "react-icons/fa";
import { prisma, prismaExecute } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { searchParams?: Promise<{ query?: string; page?: string }> };

const fetchFilteredCars = async (query: string): Promise<CarListData[]> => {
  try {
    return await prismaExecute(async () => {
      return await prisma.car.findMany({
        select: {
          id: true,
          label: true,
          employeeName: true,
          leasingName: true,
          leasing_finish_date: true,
          harf_year_inspection: true,
          inspection_expires_date: true,
          insuarance_expires_date: true,
        },
        where: query
          ? {
              OR: [
                { label: { contains: query, mode: "insensitive" } },
                { employeeName: { contains: query, mode: "insensitive" } },
              ],
            }
          : undefined,
      });
    });
  } catch {
    return [];
  }
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
