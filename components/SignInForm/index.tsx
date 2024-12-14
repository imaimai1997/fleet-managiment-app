"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/utils/firebase";
import { FirebaseError } from "firebase/app";

type LoginForm = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleSignin = async (data: LoginForm) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      setErrorMessage("");

      console.log("ログイン成功:", user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error Code:", error.code);
        console.error("Firebase Error Message:", error.message);
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("メールアドレスが登録されていません。");
            break;
          case "auth/missing-password":
            setErrorMessage("パスワードが間違っています。");
            break;
          case "auth/invalid-email":
            setErrorMessage("無効なメールアドレスです。");
            break;
          case "auth/invalid-credential":
            setErrorMessage("パスワードがメールが間違えています");
            break;
          default:
            setErrorMessage("ログイン中にエラーが発生しました。");
            console.error(error);
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-112px)] w-screen">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form
          onSubmit={handleSubmit(handleSignin)}
          className="flex flex-col w-80 text-left"
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
        <p className="text-red-500">{errors.email?.message}</p>
        <p className="text-red-500">{errors.password?.message}</p>

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </>
  );
};

export default SignInForm;
