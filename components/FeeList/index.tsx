"use client";

import React from "react";
import { useState, useEffect } from "react";
import { CarSelect } from "../../type/CarSelect";
import FeeTable from "./_components/FeeTable";
import SearchBox from "../SearchBox";
import { FeeData } from "../../type/FeeData";

type Props = {
  carData: CarSelect[];
};

const FeeSearch = ({ carData }: Props) => {
  const [feeData, setFeeData] = useState<FeeData[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const childData = (data: FeeData[]) => {
    setFeeData(data);
    setIsUpdated(true);
    console.log(feeData);
  };

  useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false);
    }
  }, [isUpdated]);

  return (
    <>
      <SearchBox carData={carData} parentData={childData} />
      <FeeTable feeData={feeData} />
    </>
  );
};

export default FeeSearch;
