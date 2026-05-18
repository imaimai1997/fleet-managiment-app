import CarDetail from "@/components/features/car/CarDetail";
import { getSelect } from "@/components/features/car/Form/getSelect";

export const dynamic = "force-dynamic";

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
