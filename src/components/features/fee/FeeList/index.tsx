"use client";

import React from "react";
import { useState } from "react";
import { CarSelect } from "@/types/CarSelect";
import FeeTable from "./_components/FeeTable";
import { FeeData } from "@/types/FeeData";
import FeeListSearch from "@/components/features/fee/FeeListSearch";

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
