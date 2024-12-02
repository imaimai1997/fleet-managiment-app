"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { TbDoorExit } from "react-icons/tb";

const Header = () => {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const handleUserMenu = () => {
    setIsUserMenu(!isUserMenu);
  };

  return (
    <>
      <div className="bg-primary-700 flex justify-between items-center h-14 px-16">
        <h2 className="text-white text-4xl">Logo</h2>
        <div className="relative h-10 text-white ">
          <button onClick={handleUserMenu}>
            <IoPersonCircle size={40} />
          </button>
          {isUserMenu && (
            <div className="bg-gray-300 absolute right-1/2 translate-x-2/4 w-40 flex flex-col items-center px-4 py-4 rounded-3xl text-black font-bold">
              <p>USER NAME</p>
              <Link href="/setting">
                <button
                  onClick={handleUserMenu}
                  className="bg-primary-700 flex items-center px-4 py-2 my-2 rounded-3xl hover:bg-primary-500"
                >
                  SETTING
                  <IoSettingsSharp className="ml-2" />
                </button>
              </Link>
              <button className="bg-primary-700 flex items-center px-4 py-2 rounded-3xl hover:bg-primary-500">
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
