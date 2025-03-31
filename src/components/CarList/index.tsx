import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import dayjs from "dayjs";
import { CarListData } from "@/type/CarListData";

type Props = {
  data: CarListData[];
};
const CarList = ({ data }: Props) => {
  return (
    <>
      <div>
        <table className="w-full text-left mt-2">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                車両No
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                管理者
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                リース会社
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                リース終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                半年点検日
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                車検終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                保険終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((car) => (
              <tr key={car.id} className="border-b hover:bg-primary-100">
                <th scope="row" className="px-6 py-4">
                  {car.label}
                </th>
                <td className="px-6 py-4">{car.employeeName}</td>
                <td className="px-6 py-4">{car.leasingName}</td>
                <td className="px-6 py-4">
                  {dayjs(car.leasing_finish_date).format("YYYY/MM/DD")}
                </td>
                <td className="px-6 py-4">{car.harf_year_inspection}</td>
                <td className="px-6 py-4">
                  {dayjs(car.inspection_expires_date).format("YYYY/MM/DD")}
                </td>
                <td className="px-6 py-4">
                  {dayjs(car.insuarance_expires_date).format("YYYY/MM/DD")}
                </td>
                <td className="px-4 hover:text-primary-700">
                  <Link href={`carlist/${car.id}`}>
                    <MdOutlineEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CarList;
