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
    <div className="bg-gray-300 w-24 h-full ">
      <nav>
        <ul className="pt-32 mx-auto text-xs text-center font-semibold ">
          <Link href="/">
            <li className="py-2 mb-4  hover:text-primary-700 ">
              <FaCarSide
                size="2rem"
                className={`mx-auto ${pathname === "/" ? "text-primary-700" : ""}`}
              />
              車両一覧
            </li>
          </Link>
          <Link href="/feelist">
            <li className="py-2 mb-4  hover:text-primary-700">
              <RiMoneyCnyCircleFill
                size="2rem"
                className={`mx-auto ${pathname === "/feelist" ? "text-primary-700" : ""}`}
              />
              月額料金
            </li>
          </Link>
          <Link href="/gasmileage">
            <li className="py-2 mb-4  hover:text-primary-700">
              <FaFireAlt
                size="2rem"
                className={`mx-auto ${pathname === "/gasmileage" ? "text-primary-700" : ""}`}
              />
              燃費
            </li>
          </Link>
          {userRole == "管理者" && (
            <>
              <Link href="/userlist">
                <li className="py-2 mb-4  hover:text-primary-700">
                  <FaUserFriends
                    size="2rem"
                    className={`mx-auto ${pathname === "/userlist" ? "text-primary-700" : ""}`}
                  />
                  ユーザー
                </li>
              </Link>
              <Link href="/import">
                <li className="py-2 mb-4  hover:text-primary-700">
                  <IoSettings
                    size="2rem"
                    className={`mx-auto ${pathname === "/import" ? "text-primary-700" : ""}`}
                  />
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
