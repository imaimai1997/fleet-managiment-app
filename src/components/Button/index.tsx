import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gray";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "auto";
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
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
