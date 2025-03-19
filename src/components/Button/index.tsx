import { ButtonHTMLAttributes } from "react";
import  styles from "./styles.module.css";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

export const Button = ({
  variant = "primary",
  size = "md",
  rounded = "none",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles["button"],
        styles[variant],
        styles[`size_${size}`],
        styles[`rounded_${rounded}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
