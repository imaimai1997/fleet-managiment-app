"use client";

import React from "react";
import { useState } from "react";
import { CarSelect } from "../../type/CarSelect";
import FeeTable from "./_components/FeeTable";
import { FeeData } from "../../type/FeeData";
import FeeListSearch from "../SearchBox/FeeListSearch";

type Props = {
  carData: CarSelect[];
};

const FeeSearch = ({ carData }: Props) => {
  const [feeData, setFeeData] = useState<FeeData[]>([]);
  const childData = (data: FeeData[]) => {
    setFeeData(data);
  };

  return (
    <>
      <FeeListSearch carData={carData} parentData={childData} />
      <FeeTable feeData={feeData} />
    </>
  );
};

export default FeeSearch;
