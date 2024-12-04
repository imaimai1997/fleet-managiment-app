import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-300 min-w-40 h-full">
      <nav>
        <ul className="ml-8 pt-32">
          <Link href="/">
            <li className="mb-4 hover:before:inline-block hover:before:bg-primary-700 hover:before:w-2 hover:before:h-4 hover:before:mr-2 hover:before:align-middle">
              車両一覧
            </li>
          </Link>
          <Link href="/feelist">
            <li className="mb-4 hover:before:inline-block hover:before:bg-primary-700 hover:before:w-2 hover:before:h-4 hover:before:mr-2 hover:before:align-middle">
              月額料金一覧
            </li>
          </Link>
          <Link href="/userlist">
            <li className="hover:before:inline-block hover:before:bg-primary-700 hover:before:w-2 hover:before:h-4 hover:before:mr-2 hover:before:align-middle">
              ユーザー
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
