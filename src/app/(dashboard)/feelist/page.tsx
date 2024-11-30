import React from "react";
import FeeSearch from "../../../../components/FeeSearch";

const FeeListPage = async () => {
  const res = await fetch("http://localhost:3000/testdata/cardata.json");
  const data = await res.json();

  return <FeeSearch carData={data} />;
};

export default FeeListPage;
