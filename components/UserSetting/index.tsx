"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { UserData } from "../../type/UserData";
import Link from "next/link";

type Props = {
  data?: UserData;
};

const UserSetting = ({ data }: Props) => {
  return (
    <div>
      <form className="w-3/6 mx-auto p-6 flex flex-col border-2 border-black rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&>div]:flex [&>div]:justify-between [&>div]:items-center ">
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
          <p>通知設定</p>
          <div className="w-80">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="mx-4 my-2">
          <label>パスワード変更</label>
          <button className="w-80 bg-black text-white p-2 rounded-full">
            変更メールを送る
          </button>
        </div>
        <div className="mx-4 ml-auto my-2">
          <Link href="/userlist">
            <PrimaryButton name={"保存"} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserSetting;
