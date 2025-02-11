import GasMileageList from "../../../../components/GasMileageList";
import { CarData } from "../../../../type/CarData";

const fetchCarList = async (): Promise<CarData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.cars;
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
