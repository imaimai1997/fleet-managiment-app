"use client";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { UserData } from "@/type/UserData";
import dayjs from "dayjs";
import Modal from "../Modal";
import UserDetail from "../UserDetail";

type Props = {
  data: UserData[];
};

const UserList = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>();
  const fetchUserById = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
      {
        cache: "no-store",
      },
    );

    return res.json();
  };

  const handleUserModal = async (id: string) => {
    const data = await fetchUserById(id);
    setUserData(data.user);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        name="ユーザー編集"
        onCancel={() => setIsModalOpen(false)}
      >
        {userData && <UserDetail userData={userData} />}
      </Modal>

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
                {/* <Link href={`userlist/${user.id}/edit`}> */}
                <button onClick={() => handleUserModal(user.id)}>
                  <MdOutlineEdit />
                </button>
                {/* </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
