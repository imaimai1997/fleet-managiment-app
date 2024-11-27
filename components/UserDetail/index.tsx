"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";

const UserDetail = () => {
  return (
    <div>
      <form className="w-3/6 mx-auto p-6 flex flex-col border-2 border-black rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:flex [&_div]:justify-between [&_div]:items-center ">
        <div className="mx-4 my-2">
          <label>ユーザー名</label>
          <input type="text" required onChange={() => {}} />
        </div>
        <div className="mx-4 my-2">
          <label>メールアドレス</label>
          <input type="email" required onChange={() => {}} />
        </div>
        <div className="mx-4 my-2">
          <label>権限</label>
          <select
            defaultValue=""
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
        <div className="mx-4 ml-auto my-2">
          <PrimaryButton name={"追加"} />
        </div>
      </form>
    </div>
  );
};

export default UserDetail;
