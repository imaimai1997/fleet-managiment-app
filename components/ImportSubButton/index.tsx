import React from "react";

type Props = {
  name: string;
  // onClick?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
};

const ImportSubButton = ({ name, onClick, type }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-gray-200 p-2 border-2 border-gray-400 text-gray-400 text-sm font-semibold"
    >
      {name}
    </button>
  );
};

export default ImportSubButton;
