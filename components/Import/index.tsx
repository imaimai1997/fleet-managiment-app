"use client";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import RefuelImport from "./_components/RefuelImport";
import EtcImport from "./_components/EtcImport";
import MileageImport from "./_components/MileageImport";
import CarTypeImport from "./_components/CarTypeImport";
import EmployeeImport from "./_components/EmployeeImport";
import PlaceImport from "./_components/PlaceImport";
import CompanyImport from "./_components/CompanyImport";
import EtcCardImport from "./_components/EtcCardImport";
import RefuelingCardImport from "./_components/RefuelingCardImport";

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
              <option value="carType">車種</option>
              <option value="employee">車両管理者</option>
              <option value="place">使用場所</option>
              <option value="leasing">リース会社</option>
              <option value="etc_card">ETCカード</option>
              <option value="refueling_card">給油カード</option>
            </select>
          </div>
        </form>
        {selectedOption === "etc" && <EtcImport />}
        {selectedOption === "refuel" && <RefuelImport />}
        {selectedOption === "mileage" && <MileageImport />}
        {selectedOption === "carType" && <CarTypeImport />}
        {selectedOption === "employee" && <EmployeeImport />}
        {selectedOption === "place" && <PlaceImport />}
        {selectedOption === "leasing" && <CompanyImport />}
        {selectedOption === "etc_card" && <EtcCardImport />}
        {selectedOption === "refueling_card" && <RefuelingCardImport />}
      </div>
    </>
  );
};

export default Import;
