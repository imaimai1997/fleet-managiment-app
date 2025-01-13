"use client";
import { useAuthContext } from "@/context/authContext";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoPersonCircle } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { TbDoorExit } from "react-icons/tb";

const Header = () => {
  const router = useRouter();

  const [isUserMenu, setIsUserMenu] = useState(false);
  const handleUserMenu = () => {
    setIsUserMenu(!isUserMenu);
  };
  const authContext = useAuthContext();
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { currentUser } = authContext;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("ログアウトしました", { id: "1" });
      router.push("/signin");
      router.refresh();
    } catch (err) {
      console.error("Error:", err);

      toast.error("ログアウトがうまくいきませんでした。", { id: "1" });
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-primary-700 flex justify-between items-center h-14 px-16">
        <h2 className="text-white text-2xl italic">FLEET-MANAGIMENT</h2>
        <div className="relative h-10 text-white ">
          <button onClick={handleUserMenu}>
            <IoPersonCircle size={40} />
          </button>
          {isUserMenu && (
            <div className="bg-gray-300 absolute right-1/2 translate-x-2/4 w-40 flex flex-col items-center px-4 py-4 rounded-3xl text-black font-bold z-10">
              <p>{currentUser?.name}</p>
              <Link href="/setting">
                <button
                  onClick={handleUserMenu}
                  className="bg-primary-700 flex items-center px-4 py-2 my-2 rounded-3xl hover:bg-primary-500"
                >
                  SETTING
                  <IoSettingsSharp className="ml-2" />
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primary-700 flex items-center px-4 py-2 rounded-3xl hover:bg-primary-500"
              >
                LOGOUT
                <TbDoorExit className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
