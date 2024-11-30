import React from "react";
import UserList from "../../../../components/UserList";
import Link from "next/link";
import PrimaryButton from "../../../../components/PrimaryButton";

const Page = async () => {
  const res = await fetch("http://localhost:3000/testdata/userdata.json");
  const data = await res.json();
  return (
    <>
      <h2 className="m-16 text-xl">ユーザー一覧</h2>
      <div className="mx-8 mt-8 mb-16">
        <UserList data={data} />
      </div>
      <div className="w-5/6 fixed bottom-0 text-end px-16 py-2 bg-white shadow-inner">
        <Link href="userlist/create">
          <PrimaryButton name="新規追加" />
        </Link>
      </div>
    </>
  );
};

export default Page;