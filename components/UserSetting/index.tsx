"use client";
import React from "react";
// import PrimaryButton from "../PrimaryButton";
// import Link from "next/link";
import { useAuthContext } from "@/context/authContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import toast, { Toaster } from "react-hot-toast";

const UserSetting = () => {
  const authContext = useAuthContext();
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { currentUser } = authContext;

  const handlSendPasswordResetMail = async () => {
    try {
      if (currentUser) {
        await sendPasswordResetEmail(auth, currentUser?.email);
        toast.success("パスワード変更メールを送りました", { id: "1" });
      }
    } catch (error) {
      console.error(error);
      toast.error("パスワード変更メールが送れませんでした", { id: "1" });
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-3/6 mx-auto text-right">
        <div className="p-6 flex flex-col border-2 border-black rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:flex [&_div]:justify-between [&_div]:items-center ">
          <form>
            <div className="mx-4 my-2">
              <label>ユーザー名</label>
              <input
                type="text"
                value={currentUser?.name || ""}
                required
                onChange={() => {}}
              />
            </div>
            <div className="mx-4 my-2">
              <label>メールアドレス</label>
              <input
                type="email"
                value={currentUser?.email || ""}
                required
                onChange={() => {}}
              />
            </div>
            {/* <div className="mx-4 my-2 text-left">
          <p>通知設定</p>
          <div className="w-80">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>*/}
          </form>
          <div className="mx-4 my-2">
            <label>パスワード変更</label>
            <button
              onClick={handlSendPasswordResetMail}
              className="w-80 bg-black text-white p-2 rounded-full"
            >
              変更メールを送る
            </button>
          </div>
          {/* <div className="m-6">
        <Link href="/userlist">
          <PrimaryButton name={"保存"} />
        </Link>
      </div> */}
        </div>
      </div>
    </>
  );
};

export default UserSetting;
