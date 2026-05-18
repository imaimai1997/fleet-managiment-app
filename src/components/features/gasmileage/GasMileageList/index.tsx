"use client";

import React from "react";
import { useState } from "react";
import { CarSelect } from "@/types/CarSelect";
import { GasMileageData } from "@/types/GasMileageData";
import GasMileageTable from "./_components/GasMileageTable";
import GasMileageSearch from "@/components/features/gasmileage/GasMileageSearch";

type Props = {
  carData: CarSelect[];
};

const GasMileageList = ({ carData }: Props) => {
  const [gasMileageData, setGasMileageData] = useState<GasMileageData[]>([]);
  const childData = (data: GasMileageData[]) => {
    setGasMileageData(data);
  };

  return (
    <>
      <GasMileageSearch carData={carData} parentData={childData} />
      <GasMileageTable gasMileageData={gasMileageData} />
    </>
  );
};

export default GasMileageList;
