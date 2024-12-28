"use client";
import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { UserData } from "../../type/UserData";
import { FaRegTrashAlt } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { FieldErrors, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

type Props = {
  data?: UserData;
  id?: string;
};

type UserCreateForm = {
  userName: string;
  userRole: string;
  email: string;
  password: string;
};

const UserDetail = ({ data, id }: Props) => {
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateForm>();

  const handleCreateUser = async (userId: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          roleName: userRole,
          name: userName,
          password: userPassword,
          email: userEmail,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // レスポンスをログに表示
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSignUp = async () => {
    if (errors.userName) {
      toast.error(errors.userName.message || "ユーザー名エラーがあります。");
      return;
    }
    if (errors.email) {
      toast.error(errors.email.message || "メールアドレスエラーがあります。");
      return;
    }
    if (errors.password) {
      toast.error(errors.password.message || "パスワードエラーがあります。");
      return;
    }

    toast.loading("作成中です", { id: "1" });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;
      await handleCreateUser(user.uid);
      toast.success("ユーザーが作成されました", { id: "1" });

      router.push("/userlist");
      router.refresh();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error Code:", error.code);
        console.error("Firebase Error Message:", error.message);
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("既にこのメールアドレスは登録されています。", {
              id: "1",
            });
            break;
          default:
            toast.error("ユーザー登録がうまくいきませんでした。", { id: "1" });
            console.error(error);
        }
      }
    }
  };
  const onError = (errors: FieldErrors<UserCreateForm>) => {
    if (errors.userName?.message) {
      toast.error(errors.userName?.message);
    }
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
    if (errors.userRole?.message) {
      toast.error(errors.userRole.message);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("ユーザーを削除しました", { id: "1" });
      router.push("/userlist");
      router.refresh();
      return res.json();
    } catch (error) {
      console.error(error);
      toast.error("ユーザーを削除できませんでした", { id: "1" });
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-3/6 mx-auto text-right">
        <form
          onSubmit={handleSubmit(handleSignUp, onError)}
          className="p-6 flex flex-col border-2 border-black rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:flex [&_div]:justify-between [&_div]:items-center "
        >
          <div className="mx-4 my-2">
            <label>ユーザー名</label>
            <input
              {...register("userName", {
                required: "ユーザー名を入力してください。",
              })}
              type="text"
              value={data?.name || userName}
              required
              onChange={changeUserName}
            />
          </div>
          <div className="mx-4 my-2">
            <label>メールアドレス</label>
            <input
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "無効なメールアドレス形式です。",
                },
              })}
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
                {...register("password", {
                  required: "passwordを入力してください",
                  minLength: {
                    value: 6,
                    message: "パスワードは6文字以上入力してください",
                  },
                })}
                type="password"
                value={userPassword}
                onChange={changeUserPassword}
              />
            </div>
          )}

          <div className="mx-4 my-2">
            <label>権限</label>
            <select
              {...register("userRole", {
                required: "権限を選択してください。",
              })}
              defaultValue={data?.role.name || userRole}
              onChange={changeUserRole}
              className="w-80 border-2 border-primary-700 p-2"
            >
              <option value="" disabled>
                選択してください
              </option>
              <option value="管理者">管理者</option>
              <option value="一般">一般</option>
            </select>
          </div>
          {!data && (
            <div className="m-6 ">
              <PrimaryButton name={"追加"} type="submit" />
            </div>
          )}
        </form>
        {data && (
          <div className="flex justify-between m-6">
            <button
              onClick={() => {
                if (id) {
                  handleDeleteUser(id);
                } else {
                  toast.error("削除対象のユーザーが指定されていません。");
                }
              }}
              className="flex items-center py-2 text-slate-500"
            >
              削除
              <FaRegTrashAlt />
            </button>
            <PrimaryButton name={"保存"} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
