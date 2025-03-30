"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {
  placeholder: string;
};

const SearchBar = (props: Props) => {
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
        <div className="border-2 border-gray-300 w-80 rounded-md relative group">
          <input
            type="search"
            placeholder={props.placeholder}
            onChange={(e) => setTerm(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
            className="w-full p-2 rounded-md focus:ring-4 focus:outline-none focus:ring-primary-700"
          />
          <button
            onClick={handleSearch}
            className="absolute top-1/2 right-0 h-full p-2 rounded-r-md transform -translate-y-1/2 group-focus-within:bg-primary-700"
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
