import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button = ({
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={className} // デフォルトのクラスを付ける
      {...props}
    >
      {children}
    </button>
  );
};
