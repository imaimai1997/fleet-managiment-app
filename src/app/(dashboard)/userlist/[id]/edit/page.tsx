import React from "react";
import UserDetail from "@/components/UserDetail";

const fetchUserById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.user;
};

const UserDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const userData = await fetchUserById(id);
  return (
    <>
      <h2 className="m-16 text-xl">ユーザー編集</h2>

      <UserDetail data={userData} id={id} />
    </>
  );
};

export default UserDetailPage;
