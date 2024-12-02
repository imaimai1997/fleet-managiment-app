import React from "react";
import UserDetail from "../../../../../../components/UserDetail";

const UserDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  console.log(id);
  const res = await fetch("http://localhost:3000/testdata/userdata.json");
  const data = await res.json();
  const userData = data[0];
  return (
    <>
      <h2 className="m-16 text-xl">ユーザー編集</h2>

      <UserDetail data={userData} />
    </>
  );
};

export default UserDetailPage;
