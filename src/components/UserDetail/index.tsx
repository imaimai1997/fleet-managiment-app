"use client";
import React from "react";
import { UserData } from "@/type/UserData";
import { FaRegTrashAlt } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { FieldErrors, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { Button } from "../Button";

type Props = { userData?: UserData };

type UserCreateForm = {
  userName: string;
  userRole: string;
  email: string;
  password: string;
};

const UserDetail = ({ userData }: Props) => {
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<UserCreateForm>({
    defaultValues: {
      userName: userData?.name || "",
      userRole: userData?.role.name || "",
      email: userData?.email || "",
      password: "",
    },
  });

  const handleCreateUser = async () => {
    toast.loading("作成中です", { id: "1" });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleName: watch("userRole"),
          name: watch("userName"),
          password: watch("password"),
          email: watch("email"),
        }),
      });

      if (!res.ok) {
        toast.error("既にこのメールアドレスは登録されています。", {
          id: "1",
        });
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
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
      toast.loading("waiting...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userData?.id}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } },
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
      toast.loading("waiting...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userData?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userData?.id,
            roleName: watch("userRole"),
            name: watch("userName"),
            email: watch("email"),
          }),
        },
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
  const handlSendPasswordResetMail = async () => {
    try {
      await sendPasswordResetEmail(auth, watch("email"));
      toast.success("パスワード変更メールを送りました", { id: "1" });
    } catch (error) {
      console.error(error);
      toast.error("パスワード変更メールが送れませんでした", { id: "1" });
    }
  };

  return (
    <>
      <div className=" mx-auto text-right ">
        <div className="text-left p-2  border-2 border-gray-200 rounded *:text-lg [&_input]:w-auto [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2 [&_div]:grid [&_div]:grid-cols-2 [&_div]:items-center ">
          <form onSubmit={handleSubmit(handleCreateUser, onError)}>
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
            {!userData && (
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
                className="border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value="管理者">管理者</option>
                <option value="一般">一般</option>
              </select>
            </div>

            {!userData && (
              <Button rounded="full" className="mx-4 my-2">
                追加
              </Button>
            )}
          </form>
          {userData && (
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
          )}
        </div>

        {userData && (
          <div className="flex justify-between m-6">
            <Button
              onClick={handleDeleteUser}
              variant="secondary"
              rounded="full"
              className="flex items-center justify-center gap-2"
            >
              削除
              <FaRegTrashAlt />
            </Button>
            <Button onClick={handleUpdateUser} rounded="full">
              保存
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
