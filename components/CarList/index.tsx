import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import dayjs from "dayjs";
import { CarListData } from "../../type/CarListData";

type Props = {
  data: CarListData[];
};
const CarList = ({ data }: Props) => {
  return (
    <>
      <div>
        <table className="w-full text-left mt-8">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                車両No
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                管理者
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                リース会社
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                リース終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                半年点検日
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                車検終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              >
                保険終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3 border-2 border-white"
              ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((car) => (
              <tr key={car.id} className="border-b-2 hover:bg-primary-100">
                <th scope="row" className="px-6 py-2">
                  {car.label}
                </th>
                <td className="px-6 py-2">{car.employeeName}</td>
                <td className="px-6 py-2">{car.leasingName}</td>
                <td className="px-6 py-2">
                  {dayjs(car.leasing_finish_date).format("YYYY/MM/DD")}
                </td>
                <td className="px-6 py-2">{car.harf_year_inspection}</td>
                <td className="px-6 py-2">
                  {dayjs(car.inspection_expires_date).format("YYYY/MM/DD")}
                </td>
                <td className="px-6 py-2">
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
