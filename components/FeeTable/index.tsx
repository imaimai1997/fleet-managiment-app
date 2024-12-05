"use client";
import React from "react";
import { FeeData } from "../../type/FeeData";

type Props = {
  feeData: FeeData[];
};
const formatDateToYearMonth = (fee_date: Date) => {
  const date = new Date(fee_date); // "Dateを年月で表示"
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
};

const FeeTable = ({ feeData }: Props) => {
  const totalFee = feeData.reduce(
    (sum, data) => ({
      leaseFee: sum.leaseFee + (data.leasefee?.lease_fee || 0),
      refuelingFee: sum.refuelingFee + (data.refuelingfee?.refueling_fee || 0),
      etcFee: sum.etcFee + (data.etcfee?.etc_fee || 0),
    }),
    { leaseFee: 0, refuelingFee: 0, etcFee: 0 }
  );

  return (
    <div className="w-11/12 mx-auto m-4 mb-24">
      <table className="w-full text-left mt-8">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky top-0 bg-gray-400 px-6 py-3 w-1/5"
            >
              年月
            </th>
            <th
              scope="col"
              className="sticky top-0 bg-gray-400 px-6 py-3 w-1/5"
            >
              車両番号
            </th>
            <th
              scope="col"
              className="sticky top-0 bg-gray-400 px-6 py-3 w-1/5"
            >
              リース料金
            </th>
            <th
              scope="col"
              className="sticky top-0 bg-gray-400 px-6 py-3 w-1/5"
            >
              ETC料金
            </th>
            <th
              scope="col"
              className="sticky top-0 bg-gray-400 px-6 py-3 w-1/5"
            >
              給油料金
            </th>
          </tr>
        </thead>
        <tbody>
          {feeData.map((data) => (
            <tr key={data.id} className="border-b-2 hover:bg-primary-100">
              <th scope="row" className="px-6 py-2">
                {formatDateToYearMonth(data.fee_date)}
              </th>
              <td className="px-6 py-2">{data.car.label}</td>
              <td className="px-6 py-2">
                {data.leasefee.lease_fee.toLocaleString()}円
              </td>
              <td className="px-6 py-2">
                {data.refuelingfee.refueling_fee.toLocaleString()}円
              </td>
              <td className="px-6 py-2">
                {data.etcfee.etc_fee.toLocaleString()}円
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-5/6 h-12 mx-auto fixed bottom-12 bg-white shadow-inner">
        <div className="w-11/12">
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="px-6 py-2 w-2/5 text-right text-primary-700 font-bold">
                  合計
                </td>
                <td className="px-6 py-2 w-1/5 font-bold">
                  {totalFee ? `${totalFee.leaseFee.toLocaleString()}円` : "0円"}
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
      </div>
    </div>
  );
};

export default FeeTable;
