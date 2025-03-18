import React from "react";

type Props = {
  name: string;
  // onClick?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
};

const ImportButton = ({ name, onClick, type }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-primary-700 p-2 mr-4 border-2 border-black text-white text-sm font-semibold"
    >
      {name}
    </button>
  );
};

export default ImportButton;
