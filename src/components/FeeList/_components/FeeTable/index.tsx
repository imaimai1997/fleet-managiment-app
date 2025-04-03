"use client";
import React from "react";
import { FeeData } from "@/type/FeeData";

type Props = {
  feeData: FeeData[];
};
const formatDateToYearMonth = (fee_date: string) => {
  if (!fee_date) {
    return "-";
  }
  const date = new Date(fee_date); // "Dateを年月で表示"
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
};

const formatNumber = (num: string): string => {
  return new Intl.NumberFormat("ja-JP").format(Number(num));
};

const FeeTable = ({ feeData }: Props) => {
  const totalFee = feeData.reduce(
    (sum, data) => ({
      refuelingFee: sum.refuelingFee + (Number(data.refueling_total_fee) || 0),
      etcFee: sum.etcFee + (Number(data.etc_total_fee) || 0),
    }),
    { refuelingFee: 0, etcFee: 0 },
  );

  return (
    <>
      <div className="bg-white px-8 py-4 mx-8 mt-4 mb-16 rounded-md border-2 border-gray-200">
        <table className="w-full text-left mt-2">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                年月
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                車両番号
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                給油料金
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                ETC料金
              </th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((data) => (
              <tr
                key={data.car_number}
                className="border-b-2 hover:bg-primary-100"
              >
                <th scope="row" className="px-6 py-4">
                  {formatDateToYearMonth(data.year_month)}
                </th>
                <td className="px-6 py-4">{data.car_number}</td>

                <td className="px-6 py-4">
                  {formatNumber(data.refueling_total_fee)}円
                </td>
                <td className="px-6 py-4">
                  {formatNumber(data.etc_total_fee)}円
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[calc(100vw-240px)] h-12 fixed bottom-0 bg-white border-t-2 border-gray-200">
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td className="px-6 py-2 w-2/5 text-right text-primary-700 font-bold">
                合計
              </td>
              <td className="px-6 py-2 w-1/5 font-bold">
                {totalFee
                  ? `${totalFee.refuelingFee.toLocaleString()}円`
                  : "0円"}
              </td>
              <td className="px-6 py-2 w-1/5 font-bold">
                {totalFee ? `${totalFee.etcFee.toLocaleString()}円` : "0円"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FeeTable;
