import FeeSearch from "../../../../components/FeeSearch";
import FeeTable from "../../../../components/FeeTable";

const FeeListPage = async () => {
  const res = await fetch("http://localhost:3000/testdata/cardata.json");
  const data = await res.json();

  const feeRes = await fetch("http://localhost:3000/testdata/feedata.json");
  const feeData = await feeRes.json();

  return (
    <>
      <FeeSearch carData={data} />
      <FeeTable feeData={feeData} />
    </>
  );
};

export default FeeListPage;
