import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { CarData } from "../../type/carData";

type Props = {
  data: CarData[];
};
const CarList = ({ data }: Props) => {
  return (
    <>
      <div>
        <table className="w-full text-left mt-8">
          <thead>
            <tr>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                車両No
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                管理者
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                リース会社
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                リース終了日
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                半年点検日
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                車検終了日
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                保険終了日
              </th>
              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3"
              ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((car) => (
              <tr key={car.id} className="border-b-2 hover:bg-primary-100">
                <th scope="row" className="px-6 py-2">
                  {car.id}
                </th>
                <td className="px-6 py-2">{car.employee.name}</td>
                <td className="px-6 py-2">{car.leasing.name}</td>
                <td className="px-6 py-2">
                  {new Date(car.leasing_finish_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-2">{car.harf_year_inspection}</td>
                <td className="px-6 py-2">
                  {new Date(car.inspection_expires_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-2">
                  {new Date(car.insuarance_expires_date).toLocaleDateString()}
                </td>
                <td className="px-4 hover:text-primary-700">
                  <MdOutlineEdit />
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
