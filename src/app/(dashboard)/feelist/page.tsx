import Link from "next/link";
import PrimaryButton from "../../../../components/PrimaryButton";
import FeeList from "../../../../components/FeeList";

const fetchCarList = async () => {
  const res = await fetch("http://localhost:3000/api/car", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.cars;
};

const FeeListPage = async () => {
  const cars = await fetchCarList();

  return (
    <>
      <FeeList carData={cars} />

      <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
        <div className="flex justify-end max-w-5xl mx-auto">
          <Link href="/feelist/import">
            <PrimaryButton name="データ取込" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeeListPage;
