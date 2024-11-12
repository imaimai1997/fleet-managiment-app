import React from "react";

type Props = {
  name: string;
};

const PrimaryButton = ({ name }: Props) => {
  return (
    <button className="bg-primary-700 w-32 py-2 rounded-3xl text-white hover:bg-primary-600">
      {name}
    </button>
  );
};

export default PrimaryButton;
