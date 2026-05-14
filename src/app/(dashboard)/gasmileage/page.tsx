import GasMileageList from "@/components/GasMileageList";
import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { CarSelect } from "@/type/CarSelect";

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

const GasMileagePage = async () => {
  const cars = await fetchCarList();

  return (
    <>
      <GasMileageList carData={cars} />
    </>
  );
};

export default GasMileagePage;
