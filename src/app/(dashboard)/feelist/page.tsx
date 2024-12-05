import Link from "next/link";
import FeeSearch from "../../../../components/FeeSearch";
import FeeTable from "../../../../components/FeeTable";
import PrimaryButton from "../../../../components/PrimaryButton";

const FeeListPage = async () => {
  const res = await fetch("http://localhost:3000/testdata/cardata.json");
  const data = await res.json();

  const feeRes = await fetch("http://localhost:3000/testdata/feedata.json");
  const feeData = await feeRes.json();

  return (
    <>
      <FeeSearch carData={data} />
      <FeeTable feeData={feeData} />
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
