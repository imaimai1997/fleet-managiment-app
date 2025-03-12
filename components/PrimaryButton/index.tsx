type Props = {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
};

const PrimaryButton = ({ name, onClick, type }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-primary-700 w-32 py-2 rounded-3xl text-white hover:bg-primary-600"
    >
      {name}
    </button>
  );
};

export default PrimaryButton;
