import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { UserData } from "../../type/UserData";
import Link from "next/link";

type Props = {
  data: UserData[];
};

const UserList = ({ data }: Props) => {
  return (
    <>
      <div>
        <table className="w-full text-left mt-8">
          <thead>
            <tr>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                ユーザー名
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                権限
              </th>
              <th scope="col" className="sticky top-0 bg-gray-400 px-6 py-3">
                登録日時
              </th>

              <th
                scope="col"
                className="sticky top-0 bg-gray-400 px-6 py-3"
              ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b-2 hover:bg-primary-100">
                <th scope="row" className="px-6 py-2">
                  {user.name}
                </th>
                <td className="px-6 py-2">{user.role.name}</td>
                <td className="px-6 py-2">
                  {new Date(user.created_at).toLocaleDateString()}
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
