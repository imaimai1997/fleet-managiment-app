import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import React from "react";
import { FaCarSide } from "react-icons/fa";
import { RiMoneyCnyCircleFill } from "react-icons/ri";
import { FaFireAlt } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { currentUser } = useAuthContext();
  const userRole = currentUser?.roleName;

  const pathname = usePathname();
  return (
    <div className="bg-primary-700 w-60 h-full pt-8 ">
      <nav>
        <ul className="text-white font-bold">
          <Link href="/">
            <li
              className={`flex items-center p-2 mx-4 mb-2 hover:bg-primary-800 rounded-md ${pathname === "/" ? "bg-primary-800 rounded-md" : ""}`}
            >
              <FaCarSide size={16} className="mr-2" />
              車両一覧
            </li>
          </Link>
          <Link href="/feelist">
            <li
              className={`flex items-center p-2 mx-4 mb-2 hover:bg-primary-800 rounded-md ${pathname === "/feelist" ? "bg-primary-800 rounded-md" : ""}`}
            >
              <RiMoneyCnyCircleFill size={16} className="mr-2" />
              月額料金
            </li>
          </Link>
          <Link href="/gasmileage">
            <li
              className={`flex items-center p-2 mx-4 mb-2 hover:bg-primary-800 rounded-md ${pathname === "gasmileage" ? "bg-primary-800 rounded-md" : ""}`}
            >
              <FaFireAlt size={16} className="mr-2" />
              燃費
            </li>
          </Link>
          {userRole == "管理者" && (
            <>
              <Link href="/userlist">
                <li
                  className={`flex items-center p-2 mx-4 mb-2 hover:bg-primary-800 rounded-md ${pathname === "/userlist" ? "bg-primary-800 rounded-md" : ""}`}
                >
                  <FaUserFriends size={16} className="mr-2" />
                  ユーザー
                </li>
              </Link>
              <Link href="/import">
                <li
                  className={`flex items-center p-2 mx-4 mb-2 hover:bg-primary-800 rounded-md ${pathname === "/import" ? "bg-primary-800 rounded-md" : ""}`}
                >
                  <IoSettings size={16} className="mr-2" />
                  データ設定
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
