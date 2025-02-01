"use client";

import React from "react";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { CarSelect } from "../../type/CarSelect";
import { FeeData } from "../../type/FeeData";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  carData: CarSelect[];
  parentData: (data: FeeData[]) => void;
};

const fetchFeeList = async (yearMonth: string, carNumber?: string) => {
  const query = new URLSearchParams();
  query.set("yearMonth", yearMonth);
  if (carNumber) query.set("carNumber", encodeURIComponent(carNumber)); // 日本語をエンコード

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fee/list?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.status}`);
  }

  const data = await res.json();
  console.log(data.res);
  return data.res;
};

const SearchBox = ({ carData, parentData }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });

  const allCarObject = {
    id: "0",
    label: "全車",
  };

  const options = [allCarObject, ...carData];
  const [selectedValue, setSelectedValue] = useState<CarSelect | null>(
    options[0]
  );

  const handlePreviousMonth = () => {
    const [year, month] = currentMonth.split("-").map(Number);
    const date = new Date(year, month - 1, 1);
    date.setMonth(date.getMonth() - 1);
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    setCurrentMonth(`${newYear}-${newMonth}`);
  };

  const handleNextMonth = () => {
    const [year, month] = currentMonth.split("-").map(Number);
    const date = new Date(year, month + 1, 1);
    date.setMonth(date.getMonth() - 1);
    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    setCurrentMonth(`${newYear}-${newMonth}`);
  };
  const handleSelectChange = (selected: SingleValue<CarSelect>) => {
    setSelectedValue(selected || null);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = e.target.value;
    setCurrentMonth(selectedMonth);
  };
  const handleClearSearch = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    setCurrentMonth(`${year}-${month}`);
    setSelectedValue(options[0]);
  };

  const handleSerchFee = async () => {
    try {
      if (selectedValue) {
        const data = await fetchFeeList(currentMonth, selectedValue.label);
        parentData(data);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("検索がうまくいきませんでした。", { id: "1" });
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-11/12 bg-gray-200 m-4 mx-auto border-2 border-black">
        <p className="border-b-2 border-black p-4">検索条件</p>

        <div className="p-4 flex items-center">
          <label className="mx-6">車両番号</label>
          <Select
            instanceId="search-select-box"
            value={selectedValue}
            options={options}
            getOptionValue={(option) => option["id"]}
            onChange={handleSelectChange}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#C6F6D5", // オプションホバー時の背景色
                primary: "#38A169", // 選択時のボーダー色やアクティブなハイライト
                primary50: "#68D391", // 部分的なハイライト色
              },
            })}
            className="w-48 border-2 border-primary-700"
          />

          <label className="ml-12">年月</label>
          <input
            type="month"
            value={currentMonth}
            onChange={handleMonthChange}
            className="w-48 border-2 border-primary-700 mx-6 p-2"
          />
        </div>
        <div className="flex justify-end p-4 [&>button]:border [&>button]:border-2 [&>button]:border-black [&>button]:px-2 [&>button]:mx-4 [&>button]:rounded">
          <button onClick={handlePreviousMonth}>前月</button>
          <button onClick={handleNextMonth}>翌月</button>
          <button onClick={handleSerchFee}>検索</button>
          <button onClick={handleClearSearch}>クリア</button>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
