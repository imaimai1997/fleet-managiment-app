import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { UserData } from "@/type/UserData";
import Link from "next/link";
import dayjs from "dayjs";

type Props = {
  data: UserData[];
};

const UserList = ({ data }: Props) => {
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
                ユーザー名
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                権限
              </th>
              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              >
                登録日時
              </th>

              <th
                scope="col"
                className="sticky top-0 px-6 py-3 border-b border-gray-200 bg-white font-light text-gray-500"
              ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b hover:bg-primary-100">
                <th scope="row" className="px-6 py-4">
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.role.name}</td>
                <td className="px-6 py-4">
                  {dayjs(user.created_at).format("YYYY/MM/DD")}
                </td>

                <td className="px-4 hover:text-primary-700">
                  <Link href={`userlist/${user.id}/edit`}>
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

export default UserList;
