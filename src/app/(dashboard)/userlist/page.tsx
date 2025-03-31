import React from "react";
import UserList from "@/components/UserList";
import Link from "next/link";
import { UserData } from "@/type/UserData";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/Button";
import { FaPlus } from "react-icons/fa";

type Props = { searchParams?: Promise<{ query?: string; page?: string }> };

const fetchFilteredUser = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    cache: "no-store",
  });

  const data = await res.json();
  const users = await data.users;
  const filteredUser = await users.filter((user: UserData) =>
    user.name.toLowerCase().includes(query.toLowerCase()),
  );
  return filteredUser;
};

const UserListPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = params?.query || "";
  const users = await fetchFilteredUser(query);
  return (
    <>
      <div className="bg-white p-4 mx-4 mt-4 mb-16 rounded-md border-2 border-gray-200">
        <div className="flex justify-between">
          <SearchBar placeholder="ユーザー名を検索..." />
          <Link href="userlist/create">
            <Button
              rounded="md"
              className="flex gap-2 items-center justify-center"
            >
              <FaPlus />
              新規追加
            </Button>
          </Link>
        </div>
        <UserList data={users} />
      </div>
    </>
  );
};

export default UserListPage;
