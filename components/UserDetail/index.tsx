"use client";
import React from "react";
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
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<UserCreateForm>({
    defaultValues: {
      userName: data?.name || "",
      userRole: data?.role.name || "",
      email: data?.email || "",
      password: "",
    },
  });

  const handleCreateUser = async (userId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          roleName: watch("userRole"),
          name: watch("userName"),
          password: watch("password"),
          email: watch("email"),
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSignUp = async () => {
    toast.loading("作成中です", { id: "1" });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        watch("email"),
        watch("password")
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

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("ユーザーを削除しました", { id: "1" });
      router.push("/userlist");
      router.refresh();
      return res.json();
    } catch (error) {
      console.error(error);
      toast.error("ユーザーを削除できませんでした", { id: "1" });
    }
  };

  const handleUpdateUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            roleName: watch("userRole"),
            name: watch("userName"),
            email: watch("email"),
          }),
        }
      );
      toast.success("ユーザー情報を編集しました", { id: "1" });
      router.push("/userlist");
      router.refresh();
      return res.json();
    } catch (error) {
      console.error(error);
      toast.error("ユーザー情報を編集できませんでした", { id: "1" });
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-3/6 mx-auto text-right ">
        <form onSubmit={handleSubmit(handleSignUp, onError)}>
          <div className="p-6 flex flex-col rounded *:text-lg [&_input]:w-80 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:flex [&_div]:justify-between [&_div]:items-center border-2 border-black">
            <div className="mx-4 my-2">
              <label>ユーザー名</label>
              <input
                {...register("userName", {
                  required: "ユーザー名を入力してください。",
                })}
                type="text"
                required
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
                required
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
                />
              </div>
            )}

            <div className="mx-4 my-2">
              <label>権限</label>
              <select
                {...register("userRole", {
                  required: "権限を選択してください。",
                })}
                className="w-80 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value="管理者">管理者</option>
                <option value="一般">一般</option>
              </select>
            </div>
          </div>
          {!data && (
            <div className="m-6 bg-orange">
              <PrimaryButton name={"追加"} type="submit" />
            </div>
          )}
        </form>
        {data && (
          <div className="flex justify-between m-6">
            <button
              onClick={handleDeleteUser}
              className="flex items-center py-2 text-slate-500"
            >
              削除
              <FaRegTrashAlt />
            </button>
            <PrimaryButton name={"保存"} onClick={handleUpdateUser} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
