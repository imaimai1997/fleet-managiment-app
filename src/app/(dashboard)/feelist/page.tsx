import FeeList from "@/components/FeeList";

export const dynamic = "force-dynamic";

const fetchCarList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.cars ?? [];
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
