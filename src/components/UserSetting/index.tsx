"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import { UserData } from "@/type/UserData";
import { Button } from "../Button";

const UserSetting = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const authContext = useAuthContext();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNotice, setUserNotice] = useState<boolean>(false);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };
  const changeNotice = () => {
    setUserNotice((prev) => !prev);
  };
  const handleUpdateUser = async () => {
    try {
      toast.loading("waiting...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${currentUser?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: currentUser?.id,
            roleName: currentUser?.role.name,
            name: userName,
            email: userEmail,
            notice: userNotice,
          }),
        },
      );
      await authContext.refreshCurrentUser();
      toast.success("ユーザー情報を編集しました", { id: "1" });
      setIsModalOpen(false);
      return res.json();
    } catch (error) {
      console.error(error);
      toast.error("ユーザー情報を編集できませんでした", { id: "1" });
    }
  };

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

  useEffect(() => {
    if (authContext) {
      setCurrentUser(authContext.currentUser);
    }
  }, [authContext]);
  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
      setUserEmail(currentUser.email);
      setUserNotice(currentUser.notice);
    }
  }, [currentUser]);

  return (
    <>
      <div className=" mx-auto text-right">
        <div className="text-left p-2  border-2 border-gray-200 rounded *:text-lg [&_input]:w-auto [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:grid [&_div]:grid-cols-2 [&_div]:items-center ">
          <form>
            <div className="mx-4 my-2">
              <label>ユーザー名</label>
              <input
                type="text"
                value={userName}
                required
                onChange={changeName}
              />
            </div>
            <div className="mx-4 my-2">
              <label>メールアドレス</label>
              <input
                type="email"
                value={userEmail}
                required
                onChange={changeEmail}
              />
            </div>
            <div className="mx-4 my-2 text-left">
              <p>通知設定</p>
              <div className="w-80">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userNotice}
                    onChange={changeNotice}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-700"></div>
                </label>
              </div>
            </div>
          </form>
          <div className="mx-4 my-2">
            <label>パスワード変更</label>
            <Button
              onClick={handlSendPasswordResetMail}
              variant="secondary"
              size="auto"
              rounded="md"
            >
              変更メールを送る
            </Button>
          </div>
        </div>
        <div className="m-6">
          <Button rounded="full" onClick={handleUpdateUser}>
            保存
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
