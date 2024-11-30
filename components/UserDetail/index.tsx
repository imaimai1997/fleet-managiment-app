"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { UserData } from "../../type/UserData";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";

type Props = {
  data?: UserData;
};

const UserDetail = ({ data }: Props) => {
  return (
    <div>
      <form className="w-3/6 mx-auto p-6 flex flex-col border-2 border-black rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:flex [&_div]:justify-between [&_div]:items-center ">
        <div className="mx-4 my-2">
          <label>ユーザー名</label>
          <input
            type="text"
            value={data?.user_name || ""}
            required
            onChange={() => {}}
          />
        </div>
        <div className="mx-4 my-2">
          <label>メールアドレス</label>
          <input
            type="email"
            value={data?.email || ""}
            required
            onChange={() => {}}
          />
        </div>
        <div className="mx-4 my-2">
          <label>権限</label>
          <select
            defaultValue={data?.role.name || ""}
            required
            onChange={() => {}}
            className="w-80 border-2 border-primary-700 p-2"
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="true">管理者</option>
            <option value="false">一般ユーザー</option>
          </select>
        </div>
        {data ? (
          <>
            <div className="mx-4 my-2">
              <label>パスワード変更</label>
              <button className="w-80 bg-black text-white p-2 rounded-full">
                変更メールを送る
              </button>
            </div>
            <div className="mx-6 my-6">
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
          </>
        ) : (
          <div className="mx-4 ml-auto my-2">
            <Link href="/userlist">
              <PrimaryButton name={"追加"} />
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserDetail;