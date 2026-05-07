import GasMileageList from "@/components/GasMileageList";
import { CarData } from "@/type/CarData";

export const dynamic = "force-dynamic";

const fetchCarList = async (): Promise<CarData[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.cars ?? [];
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
