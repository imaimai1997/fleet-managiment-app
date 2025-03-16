import React from "react";
import UserList from "../../../../components/UserList";
import Link from "next/link";
import { UserData } from "../../../../type/UserData";
import SearchBar from "../../../../components/SearchBar";
import { Button } from "@/components/Button";

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

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
      <div className="mx-8 mt-8 mb-16">
        <SearchBar />
        <UserList data={users} />
      </div>
      <div className="w-[calc(100vw-96px)] fixed bottom-0 text-end  pr-16 py-2 bg-white shadow-inner">
        <Link href="userlist/create">
          <Button
            className={"bg-primary-700 w-32 py-2 rounded-3xl text-white hover:bg-primary-600"}
          >
            新規追加
          </Button>
        </Link>
      </div>
    </>
  );
};

export default UserListPage;
