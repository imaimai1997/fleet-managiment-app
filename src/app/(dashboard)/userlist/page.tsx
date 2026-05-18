import React from "react";
import UserList from "@/components/features/user/UserList";
import { UserData } from "@/types/UserData";
import SearchBar from "@/components/ui/SearchBar";
import UserModal from "@/components/features/user/UserModal";
import { prisma, prismaExecute } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { searchParams?: Promise<{ query?: string; page?: string }> };

const fetchFilteredUser = async (query: string): Promise<UserData[]> => {
  try {
    return await prismaExecute(async () => {
      const users = await prisma.user.findMany({
        omit: { password: true },
        include: { role: true },
        where: query
          ? { name: { contains: query, mode: "insensitive" } }
          : undefined,
      });
      return users as unknown as UserData[];
    });
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
