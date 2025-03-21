import CarDetail from "../../../../../components/CarDetail";

const fetchCarData = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`,
    {
      cache: "no-store",
    },
  );

  const { car } = await response.json();
  return car;
};

const CarDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const carData = await fetchCarData(id);

  return (
    <>
      <h2 className="m-16 text-xl">車両詳細画面</h2>
      <div>
        <CarDetail data={carData} id={id} />
      </div>
    </>
  );
};

export default CarDetailPage;
