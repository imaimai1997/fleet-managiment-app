import FeeList from "@/components/features/fee/FeeList";
import { prisma, prismaExecute } from "@/lib/prisma";
import { CarSelect } from "@/types/CarSelect";

export const dynamic = "force-dynamic";

const fetchCarList = async (): Promise<CarSelect[]> => {
  try {
    return await prismaExecute(async () => {
      const cars = await prisma.car.findMany({
        select: { id: true, label: true },
      });
      return cars.map((car) => ({ id: String(car.id), label: car.label }));
    });
  } catch {
    return [];
  }
};

const FeeListPage = async () => {
  const cars = await fetchCarList();

  return (
    <>
      <FeeList carData={cars} />
    </>
  );
};

export default FeeListPage;
