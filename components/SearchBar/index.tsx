"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const [term, setTerm] = useState<string>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <form>
        <div className="bg-gray-200 w-80 rounded-3xl relative group">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setTerm(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
            className="bg-gray-200 w-80 p-4 pr-14 rounded-3xl focus:ring-4 focus:outline-hidden focus:ring-primary-700 "
          />
          <button
            onClick={handleSearch}
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
