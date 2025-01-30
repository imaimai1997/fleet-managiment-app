"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import RefuelImport from "./_components/RefuelImport";
import EtcImport from "./_components/EtcImport";
import MileageImport from "./_components/MileageImport";

const Import = () => {
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
                value="refuel"
                checked={checkedValue === "refuel"}
                onChange={(e) => setCheckedValue(e.target.value)}
              />
              給油料金
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
                value="mileage"
                checked={checkedValue === "mileage"}
                onChange={(e) => setCheckedValue(e.target.value)}
              />
              走行距離
            </label>
          </div>
        </form>
        {checkedValue === "etc" && <EtcImport />}
        {checkedValue === "refuel" && <RefuelImport />}
        {checkedValue === "mileage" && <MileageImport />}
      </div>
    </>
  );
};

export default Import;
