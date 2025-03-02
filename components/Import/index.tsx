"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import RefuelImport from "./_components/RefuelImport";
import EtcImport from "./_components/EtcImport";
import MileageImport from "./_components/MileageImport";

const Import = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <>
      <Toaster />

      <div className="mt-8 mx-auto">
        <form>
          <div className="flex flex-col [&_input]:mr-2 [&_input]:mb-2">
            <label>設定データ</label>
            <select
              className="w-48 p-2 border-2 "
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled>
                選択してください
              </option>
              <option value="refuel">給油料金</option>
              <option value="etc">ETC料金</option>
              <option value="mileage">走行距離</option>
            </select>
          </div>
        </form>
        {selectedOption === "etc" && <EtcImport />}
        {selectedOption === "refuel" && <RefuelImport />}
        {selectedOption === "mileage" && <MileageImport />}
      </div>
    </>
  );
};

export default Import;
