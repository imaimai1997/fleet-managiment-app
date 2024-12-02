"use client";
import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { UserData } from "../../type/UserData";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";

type Props = {
  data?: UserData;
};

const UserDetail = ({ data }: Props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const changeUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };
  const changeUserRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value);
  };
  const changeUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  return (
    <div className="w-3/6 mx-auto text-right">
      <form className="p-6 flex flex-col border-2 border-black rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:flex [&_div]:justify-between [&_div]:items-center ">
        <div className="mx-4 my-2">
          <label>ユーザー名</label>
          <input
            type="text"
            value={data?.user_name || userName}
            required
            onChange={changeUserName}
          />
        </div>
        <div className="mx-4 my-2">
          <label>メールアドレス</label>
          <input
            type="email"
            value={data?.email || userEmail}
            required
            onChange={changeUserEmail}
          />
        </div>
        {!data && (
          <div className="mx-4 my-2">
            <label>パスワード</label>
            <input
              type="password"
              value={userPassword}
              required
              onChange={changeUserPassword}
            />
          </div>
        )}

        <div className="mx-4 my-2">
          <label>権限</label>
          <select
            defaultValue={data?.role.name || userRole}
            required
            onChange={changeUserRole}
            className="w-80 border-2 border-primary-700 p-2"
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="true">管理者</option>
            <option value="false">一般ユーザー</option>
          </select>
        </div>
      </form>
      {data ? (
        <div className="flex justify-between m-6">
          <Link href="/userlist">
            <button className="flex items-center py-2 text-slate-500">
              削除
              <FaRegTrashAlt />
            </button>
          </Link>
          <Link href="/userlist">
            <PrimaryButton name={"保存"} />
          </Link>
        </div>
      ) : (
        <div className="m-6 ">
          <Link href="/userlist">
            <PrimaryButton name={"追加"} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
