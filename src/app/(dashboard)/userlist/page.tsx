import React from "react";
import UserList from "@/components/UserList";
import { UserData } from "@/type/UserData";
import SearchBar from "@/components/SearchBar";
import UserModal from "@/components/Modal/UserModal";

type Props = { searchParams?: Promise<{ query?: string; page?: string }> };

export const dynamic = "force-dynamic";

const fetchFilteredUser = async (query: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);
    if (!res.ok) return [];
    const data = await res.json();
    const users: UserData[] = data.users ?? [];
    return users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    );
  } catch {
    return [];
  }
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

          <UserModal />
        </div>
        <UserList data={users} />
      </div>
    </>
  );
};

export default UserListPage;
