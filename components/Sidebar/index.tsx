import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-300 min-w-40 h-full">
      <nav>
        <ul className="ml-8 pt-32">
          <li className="mb-4 hover:before:inline-block hover:before:bg-primary-700 hover:before:w-2 hover:before:h-4 hover:before:mr-2 hover:before:align-middle">
            車両一覧
          </li>
          <li className="mb-4 hover:before:inline-block hover:before:bg-primary-700 hover:before:w-2 hover:before:h-4 hover:before:mr-2 hover:before:align-middle">
            月額料金一覧
          </li>
          <li className="hover:before:inline-block hover:before:bg-primary-700 hover:before:w-2 hover:before:h-4 hover:before:mr-2 hover:before:align-middle">
            ユーザー
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
