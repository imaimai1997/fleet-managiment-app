"use client";
import React from "react";
import { GasMileageData } from "@/type/GasMileageData";

type Props = {
  gasMileageData: GasMileageData[];
};
const formatDateToYearMonth = (fee_date: string) => {
  if (!fee_date) {
    return "-";
  }
  const date = new Date(fee_date); // "Dateを年月で表示"
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long" });
};

const GasMileageTable = ({ gasMileageData }: Props) => {
  const totalGasMileage = gasMileageData.reduce(
    (sum, data) => ({
      refuelingAmount:
        sum.refuelingAmount + (Number(data.refueling_total_amount) || 0),
      mileage: sum.mileage + (Number(data.mileage_total_mileage) || 0),
    }),
    { refuelingAmount: 0, mileage: 0 }
  );

  return (
    <>
      <div className="bg-white first-letter:px-8 py-4 mx-8 mt-4 mb-16 rounded-md border-2 border-gray-200">
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
                走行距離
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                給油量
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                燃費
              </th>
            </tr>
          </thead>
          <tbody>
            {gasMileageData.map((data) => (
              <tr
                key={data.car_number}
                className="border-b-2 hover:bg-primary-100"
              >
                <th scope="row" className="px-6 py-4">
                  {formatDateToYearMonth(data.year_month)}
                </th>
                <td className="px-6 py-4">{data.car_number}</td>

                <td className="px-6 py-4">{data.mileage_total_mileage}km</td>
                <td className="px-6 py-4">{data.refueling_total_amount}L</td>

                <td className="px-6 py-4">
                  {(
                    data.mileage_total_mileage / data.refueling_total_amount
                  ).toFixed(2)}
                  km/L
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
                平均燃費
              </td>

              <td className="px-6 py-2 w-1/5 font-bold">
                {totalGasMileage
                  ? `${totalGasMileage.mileage.toLocaleString()}km`
                  : "0km"}
              </td>
              <td className="px-6 py-2 w-1/5 font-bold">
                {totalGasMileage
                  ? `${totalGasMileage.refuelingAmount.toLocaleString()}L`
                  : "0L"}
              </td>
              <td className="px-6 py-2 w-1/5 font-bold">
                {totalGasMileage
                  ? `${(totalGasMileage.mileage / totalGasMileage.refuelingAmount).toFixed(2)}km/L`
                  : "0km/L"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GasMileageTable;
