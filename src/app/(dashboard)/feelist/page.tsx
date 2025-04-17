import FeeList from "@/components/FeeList";

const fetchCarList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`);

  const data = await res.json();
  return data.cars;
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
