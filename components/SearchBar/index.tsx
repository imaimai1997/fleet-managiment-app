import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <>
      <form>
        <div className="bg-gray-200 w-80 rounded-3xl relative group">
          <input
            type="search"
            placeholder="Search"
            className="bg-gray-200 w-80 p-4 pr-14 rounded-3xl focus:ring-4 focus:outline-none focus:ring-primary-700 "
          />
          <button
            type="submit"
            className="absolute top-1/2 right-0 h-full px-4 rounded-r-3xl transform -translate-y-1/2 group-focus-within:bg-primary-700"
            aria-label="Search"
          >
            <IoIosSearch />
          </button>
        </div>
      </form>
    </>
  );
};
export default SearchBar;
