"use client";
import React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { FirebaseError } from "firebase/app";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginForm>();

  const handleSignin = async (data: LoginForm) => {
    toast.loading("waiting...", { id: "1" });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;
      console.log("userCredential:", user);

      toast.success("ログインしました", { id: "1" });
      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error Code:", error.code);
        console.error("Firebase Error Message:", error.message);
        switch (error.code) {
          case "auth/user-not-found":
            toast.error("メールアドレスが登録されていません。", { id: "1" });
            break;
          case "auth/missing-password":
            toast.error("パスワードが間違っています。", { id: "1" });
            break;
          case "auth/invalid-email":
            toast.error("無効なメールアドレスです。", { id: "1" });
            break;
          case "auth/invalid-credential":
            toast.error("パスワードがメールが間違えています", { id: "1" });
            break;
          default:
            toast.error("ログイン中にエラーが発生しました。", { id: "1" });
            console.error(error);
        }
      }
    }
  };
  const onError = (errors: FieldErrors<LoginForm>) => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-emerald-900">
        <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
        <form
          onSubmit={handleSubmit(handleSignin, onError)}
          className="flex flex-col w-80 text-left p-8 border-4 rounded bg-white"
        >
          <label>Email</label>
          <input
            {...register("email", {
              required: "メールアドレスを入力してください。",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "無効なメールアドレス形式です。",
              },
            })}
            type="email"
            placeholder="Enter your Email"
            required
            className="bg-gray-200 px-4 py-2 mt-2 mb-4 border-solid border border-black rounded-xl"
          />
          <label>Password</label>
          <input
            {...register("password", {
              required: "passwordを入力してください",
              minLength: {
                value: 6,
                message: "パスワードは6文字以上入力してください",
              },
            })}
            type="password"
            placeholder="Enter your Password"
            className="bg-gray-200 px-4 py-2 my-2 border-solid border border-black rounded-xl"
          />
          <div className="mx-auto">
            <button
              type="submit"
              className="bg-primary-700 w-28 px-2 py-2 mt-6 rounded-3xl text-white"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
