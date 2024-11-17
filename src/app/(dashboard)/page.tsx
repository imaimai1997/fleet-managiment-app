import React from "react";
import SearchBar from "../../../components/SearchBar";
import CarList from "../../../components/CarList";

const page = async () => {
  const res = await fetch("http://localhost:3000/testdata/cardata.json");
  const data = await res.json();

  return (
    <>
      <div className="m-8">
        <SearchBar />
        <CarList data={data} />
      </div>
    </>
  );
};

export default page;
