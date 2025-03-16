import SearchBar from "../../../components/SearchBar";
import CarList from "../../../components/CarList";
import Link from "next/link";
import { CarListData } from "../../../type/CarListData";
import { Button } from "@/components/Button";

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

const fetchFilteredCars = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carlist`, {
    cache: "no-store",
  });

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
      <div className="mx-8 mt-8 mb-16">
        <SearchBar />
        <CarList data={cars} />
      </div>
      <div className="w-[calc(100vw-96px)] fixed bottom-0 text-end  pr-16 py-2 bg-white shadow-inner">
        <Link href="carlist/create">
          <Button
            className={
              "bg-primary-700 w-32 py-2 rounded-3xl text-white hover:bg-primary-600"
            }
          >
            新規追加
          </Button>
        </Link>
      </div>
    </>
  );
};

export default CarListPage;
