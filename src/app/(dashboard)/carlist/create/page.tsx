import CarDetail from "@/components/CarDetail";
import { getSelect } from "@/components/Form/Car/getSelect";

export default async function CreateCarPage() {
  const {
    carTypes,
    places,
    employees,
    leasingCompanies,
    refuelingCards,
    etcCards,
  } = await getSelect();

  return (
    <CarDetail
      carTypes={carTypes}
      places={places}
      employees={employees}
      leasingCompanies={leasingCompanies}
      refuelingCards={refuelingCards}
      etcCards={etcCards}
    />
  );
}
