"use client";

import React from "react";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { CarSelect } from "@/type/CarSelect";
import { GasMileageData } from "@/type/GasMileageData";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  carData: CarSelect[];
  parentData: (data: GasMileageData[]) => void;
};

const fetchGasMileageList = async (yearMonth: string, carNumber?: string) => {
  const query = new URLSearchParams();
  query.set("yearMonth", yearMonth);
  if (carNumber) query.set("carNumber", encodeURIComponent(carNumber)); // 日本語をエンコード

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fee/gasmileage?${query.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.status}`);
  }

  const data = await res.json();
  return data.res;
};

const GasMileageSearch = ({ carData, parentData }: Props) => {
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
    options[0],
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
        const data = await fetchGasMileageList(
          currentMonth,
          selectedValue.label,
        );
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
      <p className="px-8 py-4">検索条件</p>
      <div className="border-2 border-gray-200 bg-white rounded-md p-8 mx-8 mt-2 flex gap-8">
        <div>
          <p>車両番号</p>
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
            classNames={{
              container: () => "border-2 border-gray-200 rounded ",
              control: () => "w-60 px-2 pt-1 pb-1 border-none",
            }}
          />
        </div>
        <div>
          <p>年月</p>
          <input
            type="month"
            value={currentMonth}
            onChange={handleMonthChange}
            className="w-60 border-2 border-gray-200 p-2"
          />
        </div>
        <div className="flex items-end justify-end gap-4 [&>button]:border-2 [&>button]:border-gray-200 [&>button]:px-4 [&>button]:py-1 [&>button]:rounded">
          <button
            onClick={handlePreviousMonth}
            className="flex items-center gap-2"
          >
            <IoIosArrowBack />
            前月
          </button>
          <button onClick={handleNextMonth} className="flex items-center gap-2">
            翌月
            <IoIosArrowForward />
          </button>
          <button
            onClick={handleSerchFee}
            className="bg-primary-700 text-white font-bold"
          >
            検索
          </button>
          <button onClick={handleClearSearch}>クリア</button>
        </div>
      </div>
    </>
  );
};

export default GasMileageSearch;
