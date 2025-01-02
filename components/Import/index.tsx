"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import RefuelImport from "./_components/RefuelImport";
import EtcImport from "./_components/EtcImport";
import LeaseImport from "./_components/LeaseImport";
import { CarSelect } from "../../type/CarSelect";

type Props = {
  carData: CarSelect[];
};

const Import = ({ carData }: Props) => {
  const [checkedValue, setCheckedValue] = useState<string>("");

  return (
    <>
      <Toaster />

      <div className="w-5/6 mx-auto">
        <form>
          <div className="flex flex-col [&_input]:mr-2 [&_input]:mb-2">
            <label>
              <input
                type="radio"
                name="format"
                value="lease"
                checked={checkedValue === "lease"}
                onChange={(e) => setCheckedValue(e.target.value)}
              />
              リース料金
            </label>
            <label>
              <input
                type="radio"
                name="format"
                value="etc"
                checked={checkedValue === "etc"}
                onChange={(e) => setCheckedValue(e.target.value)}
              />
              ETC料金
            </label>
            <label>
              <input
                type="radio"
                name="format"
                value="refuel"
                checked={checkedValue === "refuel"}
                onChange={(e) => setCheckedValue(e.target.value)}
              />
              給油料金
            </label>
          </div>
        </form>
        {checkedValue === "lease" && <LeaseImport carData={carData} />}
        {checkedValue === "etc" && <EtcImport />}
        {checkedValue === "refuel" && <RefuelImport />}
      </div>
    </>
  );
};

export default Import;
